import { Course, User } from ".prisma/client";
import { getSession, signIn, signOut } from "next-auth/client";
import { NextPageContext } from "next/dist/next-server/lib/utils";
import Link from "next/link";
import CourseTable from "../../components/CourseTable";
import prisma from "../../lib/prisma";

export default function Courses({
  courses,
  user,
}: {
  courses: Course[];
  user: User;
}) {
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
        orderBy: { date: "asc" },
        where: { creatorId: session.user.id },
      }),
      user: session.user,
    },
  };
}
