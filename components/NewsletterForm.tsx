import { Form, Formik, FormikHelpers } from "formik";
import { usePlausible } from "next-plausible";
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
  const plausible = usePlausible();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmailValidation}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col justify-center w-full">
          <div className="flex flex-col items-center md:flex-row md:space-x-8 md:justify-between">
            <div className="md:w-2/3">
              <h3 className="text-3xl font-semibold w-full">
                Join the Newsletter Waitlist
              </h3>
              <div className="mt-4 max-w-xl text-gray-500 md:w-full md:max-w-full">
                <p>
                  Join the Waitlist to receive weekly updates about new courses
                  as soon as our Newsletter is released.
                </p>
              </div>
            </div>
            <div className="w-full md:w-5/12 md:flex md:flex-row md:space-x-4 md:items-center">
              <FormInput
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-6 md:mt-0 w-full"
                suppressError
              />
              <div className="md:w-52">
                <ButtonStyle>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onSubmit={() => plausible("Newsletter")}
                    className="mt-0 font-bold tracking-wider"
                  >
                    Notify Me
                  </button>
                </ButtonStyle>
              </div>
            </div>
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
