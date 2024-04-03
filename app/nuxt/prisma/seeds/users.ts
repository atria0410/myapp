import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'

async function seed(prisma: PrismaClient, dataCount: number) {
  for (let i = 0; i < dataCount; i++) {
    const userData: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      hashedPassword: 'password',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthdate: faker.date.birthdate()
    }
    await prisma.user.create({ data: userData })
  }

  console.log('User data has been created.')
}

export default seed
