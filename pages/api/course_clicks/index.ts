import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { CourseClickValidation } from "../../../lib/validation";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    return handleCreate(request, response);
  }

  return response.status(405).json("Method not allowed");
}

async function handleCreate(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const body: { courseId: string } = JSON.parse(request.body);

  const bodyIsValid = await CourseClickValidation.isValid(body);
  if (!bodyIsValid) {
    return response.status(422).json("Form input not valid.");
  }

  await prisma.courseClick.create({
    data: {
      course: { connect: { id: body.courseId } },
    },
  });

  return response.status(200).json(body);
}
