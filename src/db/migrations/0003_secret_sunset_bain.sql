DROP INDEX "player_name_uniq_idx";--> statement-breakpoint
DROP INDEX "user_email_idx";--> statement-breakpoint
ALTER TABLE `matches_played` ALTER COLUMN "game_time_seconds" TO "game_time_seconds" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `player_name_uniq_idx` ON `players` (`player_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `users` (`user_email`);--> statement-breakpoint
ALTER TABLE `matches_played` ALTER COLUMN "match_date" TO "match_date" integer DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `matches_played` ALTER COLUMN "is_playoffs" TO "is_playoffs" integer;