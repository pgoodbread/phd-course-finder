import { Course, User } from ".prisma/client";
import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import { FormInput } from "../../../components";
import CourseForm from "../../../components/CourseForm";
import prisma from "../../../lib/prisma";
import { CourseValidation } from "../../../lib/validation";

export default function EditCourse({
  course,
  user,
}: {
  course: Course;
  user: User;
}) {
  const router = useRouter();

  return (
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
      validationSchema={CourseValidation}
      onSubmit={async (values, { setSubmitting }) => {
        await fetch(`/api/courses/${router.query.id}`, {
          method: "PUT",
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
              optional
            ></FormInput>
            <FormInput
              name="credits"
              type="number"
              className="md:w-1/2"
              optional
            ></FormInput>
          </div>
        </CourseForm>
      )}
    </Formik>
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
