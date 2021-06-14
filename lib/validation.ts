import * as yup from "yup";

export const CourseValidation = yup.object({
  name: yup.string().required().max(200, "Too long"),
  institution: yup.string().required(),
  location: yup.string().nullable(true),
  lecturer: yup.string().nullable(true),
  credits: yup.number().nullable(true).min(0, "Credits cannot be negative"),
  fee: yup.number().nullable(true).min(0, "Fee cannot be negative"),
  link: yup.string().required().url('Hint: the link must contain "http(s)://"'),
  start: yup.date().required().min(new Date(), "Date cannot be in the past"),
  end: yup
    .date()
    .required()
    .min(yup.ref("start"), "Date cannot be in the past"),
});
