DROP INDEX "player_name_uniq_idx";--> statement-breakpoint
DROP INDEX "user_email_idx";--> statement-breakpoint
ALTER TABLE `matches_played` ALTER COLUMN "blue_win" TO "blue_win" integer;--> statement-breakpoint
CREATE UNIQUE INDEX `player_name_uniq_idx` ON `players` (`player_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `users` (`user_email`);