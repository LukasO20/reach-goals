import prisma from '../config/connectdb.js'

export const searchResults = async (params = '', authContext) => {
    if (params) {
        const fieldsCommon = { name: { contains: params, mode: 'insensitive' } }

        const goals = await prisma.goal.findMany({
            where: { ...fieldsCommon, visitorId: authContext.visitorId },
        })

        const assignments = await prisma.assignment.findMany({
            where: { ...fieldsCommon, visitorId: authContext.visitorId },
        })

        const tags = await prisma.tag.findMany({
            where: { ...fieldsCommon, visitorId: authContext.visitorId },
            include: {
                goals: {
                    include: {
                        goal: {
                            select: {
                                name: true,
                                status: true,
                            },
                        },
                    },
                },
                assignments: {
                    include: {
                        assignment: {
                            select: {
                                name: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        })

        return { goals, assignments, tags }
    }

    return { goals: [], assignments: [], tags: [] }
}
