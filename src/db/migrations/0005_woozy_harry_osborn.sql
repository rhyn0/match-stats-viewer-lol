CREATE TABLE `bans_for_match` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`match_id` integer,
	`blue_bans` text,
	`red_bans` text,
	FOREIGN KEY (`match_id`) REFERENCES `matches_played`(`id`) ON UPDATE no action ON DELETE no action
);
