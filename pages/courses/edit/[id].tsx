import { Course, User } from ".prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import prisma from "../../../lib/prisma";
import { createCourseValidation } from "../../../lib/validation";

export default function EditCourse({
  course,
  user,
}: {
  course: Course;
  user: User;
}) {
  const router = useRouter();

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
              <Link href="/courses">
                <a className="border-2 border-black px-4 rounded hover:bg-black hover:text-white ml-2">
                  Your courses
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      <Formik
        initialValues={{
          name: course.name,
          institution: course.institution,
          location: course.location,
          lecturer: course.lecturer,
          start: new Date(course.start).toISOString().slice(0, 10),
          end: new Date(course.end).toISOString().slice(0, 10),
          link: course.link,
          fee: course.fee,
          credits: course.credits,
        }}
        validationSchema={createCourseValidation}
        onSubmit={async (values, { setSubmitting }) => {
          await fetch(`/api/courses/${router.query.id}`, {
            method: "PUT",
            body: JSON.stringify(values),
          });

          router.push("/courses");

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <label htmlFor="">Name</label>
            <Field className="border-black border" type="text" name="name" />
            <ErrorMessage
              className="text-red-800"
              name="name"
              component="div"
            />

            <label htmlFor="">Institution</label>
            <Field
              className="border-black border"
              type="text"
              name="institution"
            />
            <ErrorMessage
              className="text-red-800"
              name="institution"
              component="div"
            />

            <label htmlFor="">Location</label>
            <Field
              className="border-black border"
              type="text"
              name="location"
            />
            <ErrorMessage
              className="text-red-800"
              name="location"
              component="div"
            />

            <label htmlFor="">Lecturer</label>
            <Field
              className="border-black border"
              type="text"
              name="lecturer"
            />
            <ErrorMessage
              className="text-red-800"
              name="lecturer"
              component="div"
            />

            <label htmlFor="">Date</label>
            <Field className="border-black border" type="date" name="date" />
            <ErrorMessage
              className="text-red-800"
              name="date"
              component="div"
            />

            <label htmlFor="">Link</label>
            <Field className="border-black border" type="text" name="link" />
            <ErrorMessage
              className="text-red-800"
              name="link"
              component="div"
            />

            <label htmlFor="">Course fee</label>
            <Field className="border-black border" type="number" name="fee" />
            <ErrorMessage className="text-red-800" name="fee" component="div" />

            <label htmlFor="">Credits</label>
            <Field
              className="border-black border"
              type="number"
              name="credits"
            />
            <ErrorMessage
              className="text-red-800"
              name="credits"
              component="div"
            />

            <button
              className="bg-blue-500 mt-2 rounded-md text-white w-24"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session || typeof context.query.id !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const course = await prisma.course.findFirst({
    where: {
      AND: [{ creatorId: session.user.id }, { id: context.query.id }],
    },
  });

  if (!course) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      course,
      user: session.user,
    },
  };
}
