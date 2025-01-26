CREATE TABLE `agents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`agent_name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `agent_name_uniq_idx` ON `agents` (`agent_name`);--> statement-breakpoint
CREATE TABLE `matches_played` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blue_team_id` integer NOT NULL,
	`red_team_id` integer NOT NULL,
	`blue_win` integer NOT NULL,
	`game_time_seconds` integer NOT NULL,
	`match_date` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_playoffs` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`blue_team_id`) REFERENCES `participating_teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`red_team_id`) REFERENCES `participating_teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer,
	`match_id` integer,
	`raw_kda` text(10) NOT NULL,
	`position` text NOT NULL,
	`champion_id` integer,
	`player_kills` integer NOT NULL,
	`player_deaths` integer NOT NULL,
	`player_assists` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`match_id`) REFERENCES `matches_played`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`champion_id`) REFERENCES `agents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`team_id` integer,
	`player_name` text NOT NULL,
	`summoner_name` text NOT NULL,
	`position` text NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `participating_teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `player_name_uniq_idx` ON `players` (`player_name`);--> statement-breakpoint
CREATE TABLE `participating_teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`default_name` text NOT NULL,
	`team_name` text,
	`modified_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_email` text NOT NULL,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `users` (`user_email`);