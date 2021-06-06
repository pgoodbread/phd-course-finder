import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.upsert({
    where: { email: "test@test.de" },
    update: {},
    create: {
      name: "test",
      password: "$2b$10$ZU33yPDz1A.4VGcoZbjje..8qJ6RNVHyC6lpLXdQzTGJxyFB2swUq",
      email: "test@test.de",
      courses: {
        createMany: {
          data: [
            {
              name: "Mathe",
              date: new Date("05/08/2022"),
              institution: "HAW",
              link: "https://www.google.de",
            },
            {
              name: "Operations Research",
              date: new Date("09/02/2022"),
              institution: "KLU",
              link: "https://www.google.de",
            },
          ],
        },
      },
    },
  });
  console.log(user);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
