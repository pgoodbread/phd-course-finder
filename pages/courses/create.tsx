import { User } from ".prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession, signIn, signOut } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { createCourseValidation } from "../../lib/validation";

export default function CreateCourse({ user }: { user: User }) {
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          institution: "",
          location: "",
          lecturer: "",
          credits: 0,
          fee: 0,
          link: "",
          date: "",
        }}
        validationSchema={createCourseValidation}
        onSubmit={async (values, { setSubmitting }) => {
          await fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify(values),
          });

          router.push("/courses");

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col mt-12">
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

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { user: session.user } };
}
