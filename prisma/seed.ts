import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()



const main = async <T>(seeds: Array<Promise<T>>) => {
    console.log('start seeding ...')
    
}

main<string>([Promise.resolve('')])

.then(()=> {})
.then(()=>Promise.resolve(prisma.$disconnect()))
.catch(err=> {
    console.log('\n\nError occured, terminating the process\n\n', err)
    prisma.$disconnect()
    process.exit(1)
})