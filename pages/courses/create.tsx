import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

export default function CreateCourse() {
  return (
    <div>
      <Formik
        initialValues={{
          coursename: "",
          institution: "",
          location: "",
          lecturer: "",
          credits: "",
          coursefee: "",
          link: "",
          date: "",
        }}
        /*           validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }} */
        onSubmit={(values, { setSubmitting }) => {
          fetch("/courses/create", {
            method: "POST",
            body: JSON.stringify(values),
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="">coursename</label>
            <Field type="text" name="coursename" />
            <ErrorMessage name="coursename" component="div" />

            <label htmlFor="">institution</label>
            <Field type="text" name="institution" />
            <ErrorMessage name="institution" component="div" />

            <label htmlFor="">location</label>
            <Field type="text" name="location" />
            <ErrorMessage name="location" component="div" />

            <label htmlFor="">lecturer</label>
            <Field type="text" name="lecturer" />
            <ErrorMessage name="lecturer" component="div" />

            <label htmlFor="">date</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" />

            <label htmlFor="">link</label>
            <Field type="text" name="link" />
            <ErrorMessage name="link" component="div" />

            <label htmlFor="">coursefee</label>
            <Field type="text" name="coursefee" />
            <ErrorMessage name="coursefee" component="div" />

            <label htmlFor="">credits</label>
            <Field type="number" name="credits" />
            <ErrorMessage name="credits" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
