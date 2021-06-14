import { Course } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { CourseValidation } from "../../../lib/validation";

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
  const body: Omit<Course, "creatorId"> = JSON.parse(request.body);

  const bodyIsValid = await CourseValidation.isValid(body);
  if (!bodyIsValid) {
    return response.status(422).json("Form input not valid.");
  }

  const session = await getSession({ req: request });
  if (!session) {
    return response.status(401).json("You have to log in to see this page");
  }

  await prisma.course.create({
    data: {
      ...body,
      start: new Date(body.start),
      end: new Date(body.end),
      creator: { connect: { id: session.user.id } },
    },
  });

  return response.status(200).json(body);
}
