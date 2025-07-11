import { PrismaClient } from "@prisma/client"

let prisma = undefined
if (process.env.REACHGOALS_URL === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export { prisma }
