import { InferGetStaticPropsType } from "next";
import { CourseTable, NavBar } from "../components";
import prisma from "../lib/prisma";

export default function Home({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col bg-gray-50">
      <NavBar />
      <CourseTable courses={courses} className="mt-4 mx-8" />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      courses: await prisma.course.findMany({
        orderBy: { date: "asc" },
        where: { date: { gte: new Date() } },
      }),
    },
    revalidate: 5,
  };
}
