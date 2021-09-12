import { InferGetStaticPropsType } from "next";
import { CourseTable } from "../components";
import prisma from "../lib/prisma";

export default function Home({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col pt-12">
      <CourseTable courses={courses} className="mt-4 mx-8" />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      courses: await prisma.course.findMany({
        orderBy: { start: "asc" },
        where: { start: { gte: new Date() }, deletedAt: null },
      }),
    },
    revalidate: 5,
  };
}