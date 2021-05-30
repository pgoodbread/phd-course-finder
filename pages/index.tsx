import { InferGetStaticPropsType } from "next";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import CourseTable from "../components/CourseTable";
import prisma from "../lib/prisma";

export default function Home({
  courses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [session] = useSession();

  return (
    <div className="flex flex-col">
      <div className="flex justify-end my-4 mr-4">
        {!session && (
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
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button
              className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2"
              onClick={() => signOut()}
            >
              Sign out
            </button>
            <Link href="/courses">
              <a className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2">
                My Courses
              </a>
            </Link>
          </>
        )}
      </div>

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
