CREATE TABLE `calls` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`state` text NOT NULL,
	`provider_id` text,
	`result` text,
	`review` text,
	`poll_after` integer DEFAULT 0 NOT NULL,
	`poll_token` text,
	`created` integer NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mutex` (
	`recipient_hash` text PRIMARY KEY NOT NULL,
	`call_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`venue` text NOT NULL,
	`payload` text NOT NULL,
	`recipient_hash` text NOT NULL,
	`expires` integer NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` text PRIMARY KEY NOT NULL,
	`recipient_hash` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `suppression` (
	`recipient_hash` text PRIMARY KEY NOT NULL,
	`reason` text NOT NULL,
	`created` integer NOT NULL
);
