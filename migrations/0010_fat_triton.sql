ALTER TABLE "answers" DROP CONSTRAINT "answers_interviewId_interviews_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "interviewId" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "interviewId" DROP NOT NULL;