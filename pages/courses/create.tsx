import { User } from ".prisma/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
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
          credits: null,
          fee: null,
          link: "",
          start: "",
          end: "",
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
        {({ isSubmitting, handleChange, handleBlur, values }) => (
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

            <label htmlFor="">Start Date</label>
            <Field className="border-black border" type="date" name="start" />
            <ErrorMessage
              className="text-red-800"
              name="start"
              component="div"
            />

            <label htmlFor="">End Date</label>
            <Field className="border-black border" type="date" name="end" />
            <ErrorMessage className="text-red-800" name="end" component="div" />

            <label htmlFor="">Link</label>
            <Field className="border-black border" type="text" name="link" />
            <ErrorMessage
              className="text-red-800"
              name="link"
              component="div"
            />

            <label htmlFor="">Course fee</label>
            <input
              id="fee"
              className="border-black border"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                values.fee === null ? "" : (values.fee as unknown as number)
              }
            />
            <ErrorMessage className="text-red-800" name="fee" component="div" />

            <label htmlFor="">Credits</label>
            <input
              id="credits"
              className="border-black border"
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                values.credits === null
                  ? ""
                  : (values.credits as unknown as number)
              }
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
