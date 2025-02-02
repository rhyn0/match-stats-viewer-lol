DROP INDEX "player_summoner_name_uniq_idx";--> statement-breakpoint
DROP INDEX "user_email_idx";--> statement-breakpoint
ALTER TABLE `player_matches` ALTER COLUMN "kill_participation" TO "kill_participation" real NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `player_summoner_name_uniq_idx` ON `players` (`summoner_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `users` (`user_email`);--> statement-breakpoint
ALTER TABLE `player_matches` ALTER COLUMN "on_blue_team" TO "on_blue_team" integer NOT NULL;