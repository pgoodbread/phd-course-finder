import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { createCourseValidation } from "../../../lib/validation";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return response.status(400).json("Method not allowed.");
  }

  const body = JSON.parse(request.body);

  const bodyIsValid = await createCourseValidation.isValid(body);
  if (!bodyIsValid) {
    return response.status(422).json("Form input not valid.");
  }

  const session = await getSession({ req: request });

  await prisma.course.create({
    data: {
      ...body,
      date: new Date(body.date),
      creator: { connect: { id: session?.user.id } },
    },
  });

  return response.status(200).json(body);
}
