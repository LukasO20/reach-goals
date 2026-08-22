import prisma from '../config/connectdb.js'

export const addAssignment = async (data, authContext = {}) => {
    try {
        return await prisma.assignment.create({
            data: {
                ...data,
                visitorId: authContext.visitorId,
            },
            include: { goal: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateAssignment = async (assignmentID, data) => {
    try {
        return await prisma.assignment.update({
            where: { id: assignmentID },
            data: data,
            include: { goal: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteAssignment = async (assignmentID) => {
    try {
        return await prisma.assignment.delete({
            where: { id: assignmentID },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAssignment = async (assignmentID, authContext = {}) => {
    try {
        const isUniqueAssignment = typeof assignmentID === 'string'

        if (isUniqueAssignment) {
            return await prisma.assignment.findUnique({
                where: { id: assignmentID, visitorId: authContext.visitorId },
                include: {
                    goal: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
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

        return await prisma.assignment.findMany({
            where: { visitorId: authContext.visitorId },
            include: {
                goal: {
                    select: {
                        id: true,
                        name: true,
                        start: true,
                        end: true,
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

export const getAssignmentOnGoal = async (goalID, authContext = {}) => {
    try {
        const isUniqueAssignmentGoal = typeof goalID === 'string'

        if (isUniqueAssignmentGoal) {
            return await prisma.assignment.findMany({
                where: { goalID: goalID, visitorId: authContext.visitorId },
                include: {
                    goal: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
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

        return await prisma.assignment.findMany({
            where: { goalID: { not: null }, visitorId: authContext.visitorId },
            include: {
                goal: {
                    select: {
                        id: true,
                        name: true,
                        start: true,
                        end: true,
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

export const getAssignmentOnTag = async (tagID, authContext = {}) => {
    try {
        const isUniqueAssignmentTag = typeof tagID === 'string'

        if (isUniqueAssignmentTag) {
            return await prisma.assignment.findMany({
                where: {
                    tags: { id: tagID },
                    visitorId: authContext.visitorId,
                },
                include: {
                    goal: {
                        select: {
                            id: true,
                            name: true,
                            start: true,
                            end: true,
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

        return await prisma.assignment.findMany({
            where: { tags: { some: {} }, visitorId: authContext.visitorId },
            include: {
                goal: {
                    select: {
                        id: true,
                        name: true,
                        start: true,
                        end: true,
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

export const getAssignmentWithoutGoal = async (authContext = {}) => {
    try {
        return await prisma.assignment.findMany({
            where: {
                goalID: null,
                visitorId: authContext.visitorId,
            },
            include: {
                tags: {
                    include: {
                        tag: { select: { id: true, name: true, color: true } },
                    },
                },
            },
        })
    } catch (error) {
        throw new Error(
            `Failed to get assignment-without-goal: ${error.message}`
        )
    }
}

export const updateTagOnAssignment = async (assignmentID, tags) => {
    try {
        await prisma.tagOnAssignment.deleteMany({
            where: { assignmentID: assignmentID },
        })

        return await prisma.tagOnAssignment.createMany({
            data: tags?.map((tag) => ({
                assignmentID: assignmentID,
                tagID: tag.tagID,
            })),
            skipDuplicates: true,
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
