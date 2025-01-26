ALTER TABLE "answers" DROP CONSTRAINT "answers_id_unique";--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "answerId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "interviewId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "createdBy" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "question" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "rating" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "createdAt" SET DATA TYPE varchar(255);