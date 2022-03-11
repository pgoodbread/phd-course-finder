import { Form, Formik, FormikHelpers } from "formik";
import { FormInput } from "../components";
import { EmailValidation } from "../lib/validation";
import ButtonStyle from "./ButtonStyle";

export default function NewsletterForm({
  initialValues = {
    email: "",
  },
}: {
  initialValues?: { email: string };
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmailValidation}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col justify-center mt-4 md:mt-12 mx-4 md:w-1/2 md:mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Join the Newsletter Waitlist
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Join the Waitlist to receive weekly updates about new courses
                  as soon as our Newsletter is released.
                </p>
              </div>
              <FormInput
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <ButtonStyle>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </ButtonStyle>
          </div>
        </Form>
      )}
    </Formik>
  );
}

const submitHandler = async (
  values: { email: string },
  { setSubmitting }: FormikHelpers<{ email: string }>
) => {
  await fetch("/api/newsletter/signup", {
    method: "POST",
    body: JSON.stringify(values),
  });

  setSubmitting(false);
};
