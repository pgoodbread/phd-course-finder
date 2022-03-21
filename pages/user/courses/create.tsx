import { useState } from "react";
import CourseForm, {
  replaceEmptyStringWithNull,
} from "../../../components/CourseForm";
import Notification from "../../../components/CourseSavedNotification";

export default function CreateCourse() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <Notification
        showNotification={showNotification}
        dispatcher={setShowNotification}
      ></Notification>
      <CourseForm
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const course = replaceEmptyStringWithNull(values);

          await fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify(course),
          });

          setSubmitting(false);
          setShowNotification(true);
          resetForm();
          setTimeout(() => {
            setShowNotification(false);
          }, 5000);
        }}
      />
    </>
  );
}
