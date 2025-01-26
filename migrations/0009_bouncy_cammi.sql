ALTER TABLE "answers" RENAME COLUMN "interviewAnswerId" TO "interviewId";--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT "answers_interviewAnswerId_interviews_interviewId_fk";
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_interviewId_interviews_id_fk" FOREIGN KEY ("interviewId") REFERENCES "public"."interviews"("id") ON DELETE no action ON UPDATE no action;