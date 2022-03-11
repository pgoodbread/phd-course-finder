import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { EmailValidation } from "../../../lib/validation";

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
  const body: { email: string } = JSON.parse(request.body);

  const bodyIsValid = await EmailValidation.isValid(body);
  if (!bodyIsValid) {
    return response.status(422).json("Form input not valid.");
  }
  console.log(body);

  await prisma.newsletterSignups.create({
    data: {
      email: body.email,
    },
  });

  return response.status(200).json(body);
}
