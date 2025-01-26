ALTER TABLE "answers" RENAME COLUMN "interviewId" TO "interviewAnswerId";--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT "answers_interviewId_interviews_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_interviewAnswerId_interviews_interviewId_fk" FOREIGN KEY ("interviewAnswerId") REFERENCES "public"."interviews"("interviewId") ON DELETE no action ON UPDATE no action;