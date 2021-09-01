import { Course } from ".prisma/client";
import { getSession } from "next-auth/client";
import { NextPageContext } from "next";
import CourseTable from "../../components/CourseTable";
import prisma from "../../lib/prisma";

export default function Courses({ courses }: { courses: Course[] }) {
  return (
    <div className="flex flex-col mt-12">
      <CourseTable allowEdit={true} className="mt-4 mx-8" courses={courses} />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      courses: await prisma.course.findMany({
        orderBy: { start: "asc" },
        where: { creatorId: session.user.id },
      }),
    },
  };
}
