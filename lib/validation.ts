import * as yup from "yup";

export const createCourseValidation = yup.object({
  name: yup.string().required().max(200, "Too long"),
  institution: yup.string().required(),
  location: yup.string(),
  lecturer: yup.string(),
  credits: yup.number().min(0, "Credits cannot be negative"),
  fee: yup.number().min(0, "Fee cannot be negative"),
  link: yup.string().required().url('Hint: the link must contain "http://" '),
  date: yup.date().required().min(new Date(), "Date cannot be in the past"),
});
