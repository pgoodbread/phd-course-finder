import { Course } from "@prisma/client";

export type RawCourse = Omit<
  Course,
  "creatorId" | "start" | "end" | "id" | "deletedAt"
> & {
  start: string;
  end: string;
};
