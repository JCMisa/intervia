ALTER TABLE "users" RENAME COLUMN "image_url" TO "imageUrl";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isPro" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripeConnectId" varchar;