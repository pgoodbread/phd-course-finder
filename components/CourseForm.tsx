import { Form } from "formik";
import { FormInput } from "../components";
export default function CourseForm({
  children,
  isSubmitting,
}: {
  children: React.ReactElement;
  isSubmitting: boolean;
}) {
  return (
    <Form className="flex flex-col justify-center mt-4 md:mt-12 mx-4 md:w-1/2 md:mx-auto">
      <FormInput name="name" type="text"></FormInput>
      <FormInput name="institution" type="text"></FormInput>
      <FormInput name="location" type="text" optional></FormInput>
      <FormInput name="lecturer" type="text" optional></FormInput>
      <div className="flex flex-row">
        <FormInput
          className="w-1/2 mr-4 md:mr-8"
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
      {children}

      <button
        className="bg-primary mt-4 hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </Form>
  );
}
