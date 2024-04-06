import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

async function seed(prisma: PrismaClient, dataCount: number) {
  const saltRounds = 10
  const password = 'password'
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  for (let i = 0; i < dataCount; i++) {
    const userData: Prisma.UserCreateInput = {
      email: faker.internet.email(),
      hashedPassword: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthdate: faker.date.birthdate()
    }
    await prisma.user.create({ data: userData })
  }

  console.log('User data has been created.')
}

export default seed
