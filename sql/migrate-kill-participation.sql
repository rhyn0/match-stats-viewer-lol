-- This was a helpful script for when kill participation was migrated into the DB.
-- Prior to this, kill participation would have to be calculated by finding total kills for a match
-- SUM(kills) per team for each match and then use players kills as the dividend
-- This migration made it easier to show player activeness in a game.
-- For other changes from this see commit ecce24df8b9c8021de58a5538fa04295d2394c62.

UPDATE player_matches
SET kill_participation = (
  SELECT 
    CASE 
      WHEN pm.on_blue_team = 1 
      THEN (pm.player_kills + pm.player_assists) / NULLIF(t.blue_kills, 0) 
      ELSE (pm.player_kills + pm.player_assists) / NULLIF(t.red_kills, 0) 
    END
  FROM player_matches pm
  JOIN (
    SELECT
      mp.id AS match_id,
      CAST(SUM(CASE WHEN pm.on_blue_team = 1 THEN pm.player_kills ELSE 0 END) AS REAL) AS blue_kills,
      CAST(SUM(CASE WHEN pm.on_blue_team = 0 THEN pm.player_kills ELSE 0 END) AS REAL) AS red_kills
    FROM matches_played mp
    JOIN player_matches pm ON mp.id = pm.match_id
    GROUP BY mp.id
  ) AS t ON t.match_id = pm.match_id
  WHERE pm.id = player_matches.id
)
WHERE EXISTS (
  SELECT 1 FROM player_matches pm WHERE pm.id = player_matches.id
);