CREATE TABLE `playoff_predictions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`quarter_1` integer NOT NULL,
	`quarter_2` integer NOT NULL,
	`quarter_3` integer NOT NULL,
	`quarter_4` integer NOT NULL,
	`semi_1` integer NOT NULL,
	`semi_2` integer NOT NULL,
	`finals` integer NOT NULL,
	`match_date` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `playoff_predictions_email_unique` ON `playoff_predictions` (`email`);