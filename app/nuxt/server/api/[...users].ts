import { createRouter, defineEventHandler, useBase } from 'h3'
import { PrismaClient } from '@prisma/client'

const router = createRouter()
const prisma = new PrismaClient()

router.get(
  '/',
  defineEventHandler(async () => {
    const users = await prisma.user.findMany()
    return { users }
  })
)

router.get(
  '/:id',
  defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))
    const user = await prisma.user.findUnique({ where: { id: id } })
    return { user }
  })
)

export default useBase('/api/users', router.handler)
