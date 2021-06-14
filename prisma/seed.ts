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
              start: new Date("05/08/2022"),
              end: new Date("05/10/2022"),
              institution: "HAW",
              link: "https://www.google.de",
              fee: 1000,
              credits: 5,
            },
            {
              name: "Operations Research",
              start: new Date("05/08/2022"),
              end: new Date("05/10/2022"),
              institution: "KLU",
              link: "https://www.google.de",
            },
          ],
        },
      },
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
