import prisma from '../config/connectdb.js'

export const addGoal = async ({ data, authContext = {} }) => {
    if (!data) return

    try {
        return await prisma.goal.create({
            data: {
                ...data,
                visitorId: authContext.visitorId,
            },
            include: { assignments: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateGoal = async ({ goalID, data }) => {
    if (!data) return

    try {
        return await prisma.goal.update({
            where: { id: goalID },
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteGoal = async ({ goalID }) => {
    if (!goalID) return

    try {
        return await prisma.goal.delete({
            where: { id: goalID },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getGoal = async ({ goalID, authContext = {} }) => {
    try {
        const isUniqueGoal = typeof goalID === 'string'

        if (isUniqueGoal) {
            return await prisma.goal.findUnique({
                where: { id: goalID, visitorId: authContext.visitorId },
                include: {
                    assignments: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
                            status: true,
                            description: true,
                            duration: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: {
                                select: { id: true, name: true, color: true },
                            },
                        },
                    },
                },
            })
        }

        return await prisma.goal.findMany({
            where: { visitorId: authContext.visitorId },
            include: {
                assignments: {
                    select: {
                        id: true,
                        name: true,
                        start: true,
                        end: true,
                        status: true,
                        description: true,
                        duration: true,
                    },
                },
                tags: {
                    include: {
                        tag: {
                            select: { id: true, name: true, color: true },
                        },
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getGoalOnAssignment = async ({
    assignmentID,
    authContext = {},
}) => {
    try {
        const isUniqueGoalAssignment = typeof assignmentID === 'string'

        if (isUniqueGoalAssignment) {
            return await prisma.goal.findMany({
                where: {
                    assignments: { some: { id: assignmentID } },
                    visitorId: authContext.visitorId,
                },
                include: {
                    assignments: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
                            status: true,
                            description: true,
                            duration: true,
                        },
                    },
                },
            })
        }

        return await prisma.goal.findMany({
            where: {
                assignments: { some: {} },
                visitorId: authContext.visitorId,
            },
            include: {
                assignments: {
                    select: {
                        id: true,
                        name: true,
                        start: true,
                        end: true,
                        status: true,
                        description: true,
                        duration: true,
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getGoalOnTag = async ({ tagID, authContext = {} }) => {
    try {
        const isUniqueGoalTag = typeof tagID === 'string'

        if (isUniqueGoalTag) {
            return await prisma.goal.findMany({
                where: {
                    tags: { id: tagID },
                    visitorId: authContext.visitorId,
                },
                include: {
                    tags: {
                        include: {
                            tag: {
                                select: { id: true, name: true, color: true },
                            },
                        },
                    },
                },
            })
        }

        return await prisma.goal.findMany({
            where: { tags: { some: {} }, visitorId: authContext.visitorId },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: { id: true, name: true, color: true },
                        },
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getGoalWithoutAssignment = async ({
    assignmentID,
    authContext = {},
}) => {
    try {
        const isUniqueGoalNotAssignment = typeof assignmentID === 'string'

        if (isUniqueGoalNotAssignment) {
            return await prisma.goal.findMany({
                where: {
                    assignments: { none: { id: assignmentID } },
                    visitorId: authContext.visitorId,
                },
                include: {
                    assignments: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
                            status: true,
                            description: true,
                            duration: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: {
                                select: { id: true, name: true, color: true },
                            },
                        },
                    },
                },
            })
        }

        return await prisma.goal.findMany({
            where: {
                assignments: { none: {} },
                visitorId: authContext.visitorId,
            },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: { id: true, name: true, color: true },
                        },
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(
            `Failed to get goal-without-assignment: ${error.message}`
        )
    }
}

export const updateTagOnGoal = async ({ goalID, tags }) => {
    try {
        await prisma.tagOnGoal.deleteMany({
            where: { goalID: goalID },
        })

        return await prisma.tagOnGoal.createMany({
            data: tags?.map((tag) => ({
                goalID: goalID,
                tagID: tag.tagID,
            })),
            skipDuplicates: true,
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
