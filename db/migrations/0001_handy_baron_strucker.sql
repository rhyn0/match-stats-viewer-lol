DROP TABLE `player_matches`;--> statement-breakpoint
DROP TABLE `agents`;--> statement-breakpoint
CREATE TABLE `player_matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer,
	`match_id` integer,
	`raw_kda` text(10) NOT NULL,
	`position` text NOT NULL,
	`champion_name` text NOT NULL,
	`player_kills` integer NOT NULL,
	`player_deaths` integer NOT NULL,
	`player_assists` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`match_id`) REFERENCES `matches_played`(`id`) ON UPDATE no action ON DELETE no action
);