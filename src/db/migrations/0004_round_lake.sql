DROP INDEX `player_name_uniq_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `player_summoner_name_uniq_idx` ON `players` (`summoner_name`);