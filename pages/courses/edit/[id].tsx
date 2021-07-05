import { Course } from ".prisma/client";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import CourseForm, {
  replaceEmptyStringWithNull,
} from "../../../components/CourseForm";
import prisma from "../../../lib/prisma";

export default function EditCourse({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <CourseForm
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
      onSubmit={async (values, { setSubmitting }) => {
        const course = replaceEmptyStringWithNull(values);

        await fetch(`/api/courses/${router.query.id}`, {
          method: "PUT",
          body: JSON.stringify(course),
        });

        router.push("/courses");

        setSubmitting(false);
      }}
    />
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
    },
  };
}
