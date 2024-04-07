import { createRouter, defineEventHandler, createError, sendError, useBase } from 'h3'
import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'

const router = createRouter()
const prisma = new PrismaClient()

const userFields = Object.keys(prisma.user.fields)

const schema = yup.object().shape({
  skip: yup.number().integer(),
  take: yup.number().integer(),
  sortKey: yup.string().oneOf(userFields),
  sortOrder: yup.string().oneOf(['asc', 'desc'])
})

router.get(
  '/',
  defineEventHandler(async (event) => {
    const query = getQuery(event)

    schema.validate(query).catch((e) => {
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
  defineEventHandler(async (event) => {})
)

router.put(
  '/:id',
  defineEventHandler(async (event) => {})
)

router.delete(
  '/:id',
  defineEventHandler(async (event) => {})
)

export default useBase('/api/users', router.handler)
