CREATE TABLE `placements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`team_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`standing` integer NOT NULL,
	`probability` real NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `participating_teams`(`id`) ON UPDATE no action ON DELETE no action
);
