import { PrismaClient } from '@prisma/client'
import userSeed from '@/prisma/seeds/users'

const prisma = new PrismaClient()

async function main() {
  console.log('Start Seeding...')
  await userSeed(prisma, 100)
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
