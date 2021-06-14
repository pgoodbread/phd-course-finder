import { Course } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import { CourseValidation } from "../../../lib/validation";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "PUT") {
    return handleEdit(request, response);
  }

  if (request.method === "DELETE") {
    return handleDelete(request, response);
  }

  return response.status(405).json("Method not allowed");
}

async function handleEdit(request: NextApiRequest, response: NextApiResponse) {
  if (typeof request.query.id !== "string") {
    return response.status(422).json("Url parameter not valid");
  }

  const body: Omit<Course, "creatorId"> = JSON.parse(request.body);

  const bodyIsValid = await CourseValidation.isValid(body);
  if (!bodyIsValid) {
    return response.status(422).json("Form input not valid.");
  }

  const session = await getSession({ req: request });
  if (!session) {
    return response.status(401).json("Not authenticated");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      courses: {
        update: {
          where: { id: request.query.id },
          data: {
            ...body,
            start: new Date(body.start),
            end: new Date(body.end),
          },
        },
      },
    },
  });

  return response.status(200).json(body);
}

async function handleDelete(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (typeof request.query.id !== "string") {
    return response.status(422).json("Url parameter not valid");
  }

  const session = await getSession({ req: request });
  if (!session) {
    return response.status(401).json("Not authenticated");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      courses: {
        delete: {
          id: request.query.id,
        },
      },
    },
  });

  return response.status(200).json("");
}
