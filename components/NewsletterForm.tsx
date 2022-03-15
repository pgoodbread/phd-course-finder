import { CheckCircleIcon } from "@heroicons/react/solid";
import { Form, Formik, FormikHelpers } from "formik";
import { usePlausible } from "next-plausible";
import { useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (
    values: { email: string },
    { setSubmitting, resetForm }: FormikHelpers<{ email: string }>
  ) => {
    await fetch("/api/newsletter/signup", {
      method: "POST",
      body: JSON.stringify(values),
    });
    setSubmitted(true);
    resetForm();
    setSubmitting(false);
  };

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
                {submitted && (
                  <button
                    type="button"
                    className="w-full border border-gray-300 font-bold hover:bg-gray-50  text-gray-700 px-4 py-2 rounded mb-4 focus:outline-none text-center"
                  >
                    <span className="flex flex-row items-center">
                      Done!{" "}
                      <CheckCircleIcon
                        className="h-5 w-5 text-primary ml-2"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                )}
                {!submitted && (
                  <ButtonStyle>
                    <button
                      type="submit"
                      disabled={isSubmitting || submitted}
                      onSubmit={() => plausible("Newsletter")}
                      className="mt-0 font-bold tracking-wider"
                    >
                      Notify Me
                    </button>
                  </ButtonStyle>
                )}
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
