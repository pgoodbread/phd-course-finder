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
    <>
      <Link href="/">
        <a>To Home</a>
      </Link>
      <div className="flex flex-col">
        <div className="flex justify-end my-4 mr-4">
          {!user && (
            <>
              Not signed in <br />
              <button
                className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            </>
          )}
          {user && (
            <>
              Signed in as {user.email} <br />
              <button
                className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2"
                onClick={() => signOut()}
              >
                Sign out
              </button>
              <Link href="/courses/create">
                <a className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2">
                  Create a Course
                </a>
              </Link>
            </>
          )}
        </div>
        <CourseTable allowEdit={true} className="mt-4 mx-8" courses={courses} />
      </div>
    </>
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
