import { createRouter, defineEventHandler, createError, sendError, useBase } from 'h3'
import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'
import * as bcrypt from 'bcrypt'

const router = createRouter()
const prisma = new PrismaClient()

const userFields = Object.keys(prisma.user.fields)

const userSelectSchema = yup.object().shape({
  skip: yup.number().integer(),
  take: yup.number().integer(),
  sortKey: yup.string().oneOf(userFields),
  sortOrder: yup.string().oneOf(['asc', 'desc'])
})

const userCreateSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  birthdate: yup.date().required(),
  gender: yup.string().oneOf(['1', '2'])
})

const saltRounds = 10

router.get(
  '/',
  defineEventHandler(async (event) => {
    const query = getQuery(event)

    userSelectSchema.validate(query).catch((e) => {
      sendError(event, createError({ statusCode: 400, statusMessage: e.message }))
    })

    const skip: number = Number(query.skip) || 0
    const take: number = Number(query.take) || 100
    const sortKey: any = query.sortKey || 'id'
    const sortOrder: any = query.sortOrder || 'asc'

    const users = await prisma.user.findMany({
      orderBy: { [sortKey]: sortOrder },
      skip,
      take
    })
    const totalLength = await prisma.user.count()

    return { users, totalLength }
  })
)

router.get(
  '/:id',
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const user = await prisma.user.findUnique({ where: { id: id } })
    return user
  })
)

router.post(
  '/',
  defineEventHandler(async (event) => {
    const body = await readBody(event)

    userCreateSchema.validate(body).catch((e) => {
      sendError(event, createError({ statusCode: 400, statusMessage: e.message }))
    })

    const hashedPassword = await bcrypt.hash(String(body.password), saltRounds)

    const createdUser = await prisma.user.create({
      data: {
        email: String(body.email),
        hashedPassword: hashedPassword,
        firstName: String(body.firstName),
        lastName: String(body.lastName),
        birthdate: new Date(body.birthdate),
        gender: String(body.gender)
      }
    })

    return createdUser
  })
)

router.put(
  '/:id',
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const body = await readBody(event)

    userCreateSchema.validate(body).catch((e) => {
      sendError(event, createError({ statusCode: 400, statusMessage: e.message }))
    })

    const hashedPassword = await bcrypt.hash(String(body.password), saltRounds)

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: String(body.email),
        hashedPassword: hashedPassword,
        firstName: String(body.firstName),
        lastName: String(body.lastName),
        birthdate: new Date(body.birthdate),
        gender: String(body.gender)
      }
    })

    return updatedUser
  })
)

router.delete(
  '/:id',
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const deletedUser = await prisma.user.delete({
      where: { id }
    })
    return deletedUser
  })
)

export default useBase('/api/users', router.handler)
