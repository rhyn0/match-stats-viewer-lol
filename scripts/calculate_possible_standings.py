# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "tqdm",
# ]
# ///
"""Generate the total number of possibilities each time has of placing at certain standing.

Notes:
    Format of initial standings JSON is:
        [
            {
                "teamName": "A",
                "wins": 0,
            },
            ...
        ]

    Format of matches to be played JSON is:
        [
            {
                "teamA": "A",
                "teamB": "B",
            },
            ...
        ]

"""
import argparse
from collections import defaultdict
import itertools
import json
import logging
import pathlib
from typing import TypedDict
import sys

from tqdm import tqdm

LOG = logging.getLogger("calc-script")
_fmt = logging.Formatter("[%(asctime)s] %(levelname)s -- %(msg)s")
_hdlr = logging.StreamHandler()
_hdlr.setFormatter(_fmt)
_hdlr.setLevel(logging.DEBUG)
LOG.addHandler(_hdlr)
LOG.setLevel(logging.WARNING)


class InitialStandingsData(TypedDict):
    teamName: str
    wins: int


class UpcomingMatchesData(TypedDict):
    teamA: str
    teamB: str


def generate_match_combinations(num_matches):
    """Generate all possible match result combinations (2^num_matches)."""
    yield from itertools.product([0, 1], repeat=num_matches)


def track_standings(
    initial_standings: list[InitialStandingsData],
    match_datas: list[UpcomingMatchesData],
):
    """Compute and store all possible tournament standings."""
    teams = {team["teamName"]: team["wins"] for team in initial_standings}
    position_counts: dict[str, defaultdict[int, int]] = {
        team: defaultdict(int) for team in teams
    }
    num_matches = len(match_datas)
    total_combinations = 0

    for combination in tqdm(generate_match_combinations(num_matches)):
        total_combinations += 1
        current_wins = teams.copy()  # Copy initial standings

        for match_index, result in enumerate(combination):
            match_data = match_datas[match_index]
            team_a = match_data["teamA"]
            team_b = match_data["teamB"]

            if result == 0:
                current_wins[team_a] = current_wins.get(team_a, 0) + 1
            else:
                current_wins[team_b] = current_wins.get(team_b, 0) + 1

        # Sort teams by wins in descending order
        sorted_standings = sorted(current_wins.items(), key=lambda x: -x[1])

        # Track position counts
        for rank, (team, _) in enumerate(sorted_standings, start=1):
            position_counts[team][rank] += 1

    # Convert counts to percentages
    standings_summary = {
        team: {
            rank: round((count / total_combinations) * 100, 2)
            for rank, count in positions.items()
        }
        for team, positions in position_counts.items()
    }

    return standings_summary


def main(args: argparse.Namespace) -> int:
    initial_json_file: pathlib.Path = args.standings_file
    matches_json_file: pathlib.Path = args.matches
    try:
        initial_standings = json.loads(initial_json_file.read_text())
    except json.JSONDecodeError:
        LOG.exception("Failed to read JSON content from %s", initial_json_file)
        return -1
    try:
        matches_data = json.loads(matches_json_file.read_text())
    except json.JSONDecodeError:
        LOG.exception("Failed to read JSON content from %s", matches_json_file)
        return -1
    LOG.info("Generating stats for %d remaining matches", len(matches_data))
    standings = track_standings(initial_standings, matches_data)
    LOG.info("Done with generating, saving file")
    # Save results to a JSON file
    with open("standings_results.json", "w") as f:
        json.dump(standings, f, indent=4)

    LOG.info("Generated %d standings scenarios.", len(standings))
    return 0


def parse_args(arglist: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="Possible Standings Calculator",
        description="Generate outcome possibilities distributions",
    )
    parser.add_argument(
        "-m", "--matches", type=pathlib.Path, dest="matches", required=True
    )
    parser.add_argument(
        "-s", "--standings", type=pathlib.Path, dest="standings_file", required=True
    )

    monitoring_group = parser.add_argument_group("Debug Items")
    monitoring_group.add_argument(
        "-v", "--verbose", action="count", dest="debug", default=0
    )

    return parser.parse_args(arglist)


if __name__ == "__main__":
    args = parse_args()
    if args.debug > 2:
        LOG.setLevel(logging.DEBUG)
    elif args.debug > 1:
        LOG.setLevel(logging.INFO)
    sys.exit(main(args))
