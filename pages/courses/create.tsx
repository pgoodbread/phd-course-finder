import { User } from ".prisma/client";
import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { FormInput } from "../../components";
import CourseForm from "../../components/CourseForm";
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
        {({ isSubmitting, handleBlur, handleChange, values }) => (
          <CourseForm isSubmitting={isSubmitting}>
            <div className="md:flex md:flex-row">
              <FormInput
                name="fee"
                type="number"
                className="md:w-1/2 md:mr-8"
                nullable
                optional
                value={values.fee}
                handlers={{ handleBlur, handleChange }}
              ></FormInput>
              <FormInput
                name="credits"
                type="number"
                className="md:w-1/2"
                nullable
                optional
                value={values.credits}
                handlers={{ handleBlur, handleChange }}
              ></FormInput>
            </div>
          </CourseForm>
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
