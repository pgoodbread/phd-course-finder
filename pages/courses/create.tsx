import { User } from ".prisma/client";
import { ErrorMessage, Form, Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { FormInput } from "../../components";
import { CourseValidation } from "../../lib/validation";

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
        validationSchema={CourseValidation}
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
          <Form className="flex flex-col justify-center mt-12 mx-4 md:w-1/2 md:mx-auto">
            <FormInput name="name" type="text"></FormInput>
            <FormInput name="institution" type="text"></FormInput>
            <FormInput name="location" type="text" optional></FormInput>
            <FormInput name="lecturer" type="text" optional></FormInput>
            <div className="flex flex-row">
              <FormInput
                className="w-1/2"
                name="start"
                label="Start Date"
                type="date"
              ></FormInput>
              <FormInput
                className="w-1/2"
                name="end"
                label="End Date"
                type="date"
              ></FormInput>
            </div>
            <FormInput name="link" type="text"></FormInput>
            <div className="md:flex md:flex-row">
              <FormInput
                name="fee"
                type="number"
                className="md:w-1/2"
                nullable
              ></FormInput>
              <FormInput
                name="credits"
                type="number"
                className="md:w-1/2"
                nullable
              ></FormInput>
            </div>
            {/* Wie handlen mit den formik callbacks und dem value? */}
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
