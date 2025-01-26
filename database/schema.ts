import {
  varchar,
  uuid,
  text,
  pgTable,
  pgEnum,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: varchar("userId").notNull().unique(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  imageUrl: varchar("imageUrl"),
  role: ROLE_ENUM("role").default("USER"),
  isPro: boolean("isPro").default(false),
  stripeConnectId: varchar("stripeConnectId"),
  credits: integer("credits").default(0),
  createdAt: varchar("createdAt"),
});

export const interviews = pgTable("interviews", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  interviewId: varchar("interviewId").notNull().unique(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  createdBy: varchar("createdBy"),
  jobTitle: varchar("jobTitle"),
  industry: varchar("industry"),
  jobDescription: text("jobDescription"),
  skills: text("skills"),
  experienceLevel: varchar("experienceLevel"),
  keyCompetencies: text("keyCompetencies"),
  education: varchar("education"),
  interviewData: jsonb("interviewData"),
  createdAt: varchar("createdAt"),
});

export const answers = pgTable("answers", {
  id: uuid("id").defaultRandom().primaryKey(),
  answerId: varchar("answerId").notNull().unique(),
  interviewId: varchar("interviewId")
    .references(() => interviews.interviewId)
    .notNull(),
  userId: uuid("userId")
    .references(() => users.id)
    .notNull(),
  createdBy: varchar("createdBy"),
  question: varchar("question"),
  correctAnswer: text("correctAnswer"),
  answer: text("answer"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  createdAt: varchar("createdAt"),
});
