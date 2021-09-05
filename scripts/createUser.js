const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

const name = "test2";
const password = "test2";
const email = "test2@test2.de";

async function createUser() {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  await prisma.user.create({ data: { name, email, password: hash } });
}

createUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
