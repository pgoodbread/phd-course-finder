import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "POST") {
    return;
  }
  // Validation
  // Database input
  const session = await getSession({ req: request });
  console.log(request.body);
  await prisma.course.create({
    data: {
      ...request.body,
      date: new Date(request.body.date),
      //@ts-ignore
      creatorId: session.userId,
    },
  });

  // send succesfull response
  response.status(200).json(request.body);
}
