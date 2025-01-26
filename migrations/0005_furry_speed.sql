CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answerId" varchar NOT NULL,
	"interviewId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"createdBy" varchar,
	"question" varchar,
	"correctAnswer" text,
	"answer" text,
	"feedback" text,
	"rating" varchar,
	"createdAt" varchar,
	CONSTRAINT "answers_id_unique" UNIQUE("id"),
	CONSTRAINT "answers_answerId_unique" UNIQUE("answerId")
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_interviewId_interviews_interviewId_fk" FOREIGN KEY ("interviewId") REFERENCES "public"."interviews"("interviewId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;