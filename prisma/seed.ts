import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const cleanup = () => Promise.all([prisma.user.deleteMany()])
const seed  =  ()  => Promise.all([])
const main = async () => {
  await cleanup()
  await seed()
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
