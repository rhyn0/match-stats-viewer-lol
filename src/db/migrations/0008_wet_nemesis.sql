ALTER TABLE `player_matches` ADD `kill_participation` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `player_matches` ADD `on_blue_team` integer DEFAULT false NOT NULL;