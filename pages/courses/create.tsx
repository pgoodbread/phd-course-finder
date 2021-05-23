import { ErrorMessage, Field, Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { Router, useRouter } from "next/router";
import React from "react";
import { createCourseValidation } from "../../lib/validation";

export default function CreateCourse() {
  // const [session, loadSession] = useSession();
  const router = useRouter();
  // console.log(session);
  // if (!session && !loadSession) {
  //   router.replace("/");
  // }

  // if (loadSession) {
  //   return <div></div>;
  // }
  return (
    <div>
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
          await fetch("/api/courses/create", {
            method: "POST",
            body: JSON.stringify(values),
          });
          router.push("/courses");
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
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
