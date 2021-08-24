import { Form, Formik, FormikHelpers } from "formik";
import { FormInput } from "../components";
import { CourseValidation } from "../lib/validation";
import { RawCourse } from "../types";

export default function CourseForm({
  initialValues = {
    name: "",
    institution: "",
    location: "",
    lecturer: "",
    credits: null,
    fee: null,
    link: "",
    start: "",
    end: "",
  },
  onSubmit,
}: {
  onSubmit: (
    values: CourseForForm,
    formikHelpers: FormikHelpers<CourseForForm>
  ) => void | Promise<unknown>;
  initialValues?: CourseForForm;
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CourseValidation}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleBlur, handleChange, values }) => (
        <Form className="flex flex-col justify-center mt-4 md:mt-12 mx-4 md:w-1/2 md:mx-auto">
          <FormInput name="name" type="text" />
          <FormInput name="institution" type="text" />
          <FormInput name="location" type="text" optional />
          <FormInput name="lecturer" type="text" optional />
          <div className="flex flex-row">
            <FormInput
              className="w-1/2 mr-4 md:mr-8"
              name="start"
              label="Start Date"
              type="date"
            />
            <FormInput
              className="w-1/2"
              name="end"
              label="End Date"
              type="date"
            />
          </div>
          <FormInput name="link" type="text" />

          <div className="md:flex md:flex-row">
            <FormInput
              name="fee"
              type="number"
              className="md:w-1/2 md:mr-8"
              nullable
              optional
              value={values.fee}
              handlers={{ handleBlur, handleChange }}
            />
            <FormInput
              name="credits"
              type="number"
              className="md:w-1/2"
              nullable
              optional
              value={values.credits}
              handlers={{ handleBlur, handleChange }}
            />
          </div>

          <p className="text-sm font-medium text-gray-400 capitalize mt-4">
            <span className="text-primary font-bold">*</span> Required Fields
          </p>

          <button
            className="bg-primary mt-4 hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

type CourseForForm = Omit<RawCourse, "credits" | "fee"> & {
  credits: null | "" | number;
  fee: null | "" | number;
};

export function replaceEmptyStringWithNull(course: CourseForForm): RawCourse {
  return {
    ...course,
    credits: course.credits === "" ? null : course.credits,
    fee: course.fee === "" ? null : course.fee,
  };
}
