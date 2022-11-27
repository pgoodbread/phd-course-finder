import { InferGetStaticPropsType } from "next";
import { CourseTable } from "../components";
import prisma from "../lib/prisma";

export default function Home({
  activeCourses,
  previousCourses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col pt-4 md:pt-8">
      <h1 className="mt-4 mx-8 text-3xl text-gray-900 font-light">
        Future Courses
      </h1>
      <CourseTable courses={activeCourses} className="mt-4 mx-8" />
      <h1 className="mt-4 mx-8 text-3xl text-gray-900 font-light">
        Expired Courses
      </h1>
      <CourseTable courses={previousCourses} className="mt-4 mx-8" />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      activeCourses: await prisma.course.findMany({
        orderBy: { start: "asc" },
        where: { start: { gte: new Date() }, deletedAt: null },
      }),
      previousCourses: await prisma.course.findMany({
        orderBy: { start: "asc" },
        where: { start: { lte: new Date() }, deletedAt: null },
      }),
    },
    revalidate: 5,
  };
}
