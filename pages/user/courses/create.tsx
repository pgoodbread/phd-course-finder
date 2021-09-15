import { User } from ".prisma/client";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import CourseForm, {
  replaceEmptyStringWithNull,
} from "../../../components/CourseForm";

export default function CreateCourse({ user }: { user: User }) {
  const router = useRouter();

  return (
    <CourseForm
      onSubmit={async (values, { setSubmitting }) => {
        const course = replaceEmptyStringWithNull(values);

        await fetch("/api/courses", {
          method: "POST",
          body: JSON.stringify(course),
        });

        router.push("/user/courses");

        setSubmitting(false);
      }}
    />
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
