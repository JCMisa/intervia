import { varchar, uuid, text, pgTable, pgEnum } from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  imageUrl: varchar("image_url"),
  role: ROLE_ENUM("role").default("USER"),
  createdAt: varchar("created_at"),
});
