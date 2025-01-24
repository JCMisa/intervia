ALTER TABLE "users" ADD COLUMN "userId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_userId_unique" UNIQUE("userId");