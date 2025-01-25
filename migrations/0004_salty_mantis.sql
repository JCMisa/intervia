CREATE TABLE "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interviewId" varchar NOT NULL,
	"userId" uuid NOT NULL,
	"createdBy" varchar,
	"jobTitle" varchar,
	"industry" varchar,
	"jobDescription" text,
	"skills" text,
	"experienceLevel" varchar,
	"keyCompetencies" text,
	"education" varchar,
	"interviewData" jsonb,
	"createdAt" varchar,
	CONSTRAINT "interviews_id_unique" UNIQUE("id"),
	CONSTRAINT "interviews_interviewId_unique" UNIQUE("interviewId")
);
--> statement-breakpoint
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;