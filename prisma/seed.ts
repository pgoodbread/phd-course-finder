import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.upsert({
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
              name: "Statistical Analysis",
              start: new Date("2032-07-17"),
              end: new Date("2032-07-19"),
              institution: "HAW",
              lecturer: "Jane Doe",
              location: "Hamburg",
              link: "https://www.google.de",
              fee: 1000,
              credits: 5,
            },
            {
              name: "Operations Research",
              start: new Date("2032-03-01"),
              end: new Date("2032-03-05"),
              institution: "KLU",
              link: "https://www.google.de",
            },
            {
              name: "Distributed Systems",
              start: new Date("2020-01-30"),
              end: new Date("2032-02-02"),
              institution: "HAW",
              lecturer: "James Rautman",
              location: "Sydney",
              link: "https://www.google.de",
              fee: 375,
              credits: 3,
            },
          ],
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { email: "test2@test.de" },
    update: {},
    create: {
      name: "test2",
      password: "$2b$10$ZU33yPDz1A.4VGcoZbjje..8qJ6RNVHyC6lpLXdQzTGJxyFB2swUq",
      email: "test2@test.de",
      courses: {
        createMany: {
          data: [
            {
              name: "Application of Artificial Intelligence",
              start: new Date("2032-06-02"),
              end: new Date("2032-06-04"),
              institution: "HAW",
              lecturer: "John Doe",
              link: "https://www.google.de",
              location: "New York City",
              fee: 2500,
              credits: 10,
            },
            {
              name: "Human Resources Management",
              start: new Date("2025-03-01"),
              end: new Date("2025-03-05"),
              institution: "RWTH",
              link: "https://www.google.de",
            },
            {
              name: "Data Analytics",
              start: new Date("2018-04-30"),
              end: new Date("2018-05-02"),
              institution: "HAW",
              lecturer: "Richard Smith",
              link: "https://www.google.de",
              location: "Shanghai",
              fee: 0,
              credits: 0,
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
