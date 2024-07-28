const { PrismaClient, Prisma } =require('@prisma/client')
const prisma = new PrismaClient()



const seed = async () => {
    console.log('start seeding ...')
    const {seedEnvironment }= await import('@/models/environment')
    return await Promise.all([seedEnvironment(prisma)])
}


process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
  });
  
  process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
  });
seed()
.then(async () => {
    await prisma.$disconnect()
    process.exit()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
