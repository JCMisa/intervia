CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"answerId" varchar(255) NOT NULL,
	"interviewId" varchar(255) NOT NULL,
	"userId" uuid NOT NULL,
	"createdBy" varchar(255),
	"question" varchar(255),
	"correctAnswer" text,
	"answer" text,
	"feedback" text,
	"rating" varchar(255),
	"createdAt" varchar(255),
	CONSTRAINT "answers_answerId_unique" UNIQUE("answerId")
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_interviewId_interviews_interviewId_fk" FOREIGN KEY ("interviewId") REFERENCES "public"."interviews"("interviewId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;