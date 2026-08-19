import prisma from '../config/connectdb.js'

export const addGoal = async (data) => {
    if (!data) return

    try {
        return await prisma.goal.create({
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateGoal = async (goalID, data) => {
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

export const deleteGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.goal.delete({
            where: { id: goalID },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getGoal = async (goalID) => {
    try {
        const isAllGoal = goalID === 'all'
        const isUniqueGoal = typeof goalID && goalID.trim() !== '' && !isAllGoal

        if (!isUniqueGoal && !isAllGoal)
            throw new Error(`Invalid goalID: ${goalID}`)

        if (isUniqueGoal) {
            return await prisma.goal.findUnique({
                where: { id: goalID },
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

export const getGoalOnAssignment = async (assignmentID) => {
    try {
        const isAllGoalAssignment = assignmentID === 'all'
        const isUniqueGoalAssignment =
            typeof assignmentID &&
            assignmentID.trim() !== '' &&
            !isAllGoalAssignment

        if (!isUniqueGoalAssignment && !isAllGoalAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueGoalAssignment) {
            return await prisma.goal.findMany({
                where: { assignments: { some: { id: assignmentID } } },
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
            where: { assignments: { some: {} } },
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

export const getGoalOnTag = async (tagID) => {
    try {
        const isAllGoalTag = tagID === 'all'
        const isUniqueGoalTag =
            typeof tagID && tagID.trim() !== '' && !isAllGoalTag

        if (!isUniqueGoalTag && !isAllGoalTag)
            throw new Error(`Invalid tagID: ${tagID}`)

        if (isUniqueGoalTag) {
            return await prisma.goal.findMany({
                where: { tags: { id: tagID } },
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
            where: { tags: { some: {} } },
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

export const getGoalWithoutAssignment = async (assignmentID) => {
    try {
        const isAllGoalNotAssignment = assignmentID === 'all'
        const isUniqueGoalNotAssignment =
            typeof assignmentID &&
            assignmentID.trim() !== '' &&
            !isAllGoalNotAssignment

        if (!isUniqueGoalNotAssignment && !isAllGoalNotAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueGoalNotAssignment) {
            return await prisma.goal.findMany({
                where: { assignments: { none: { id: assignmentID } } },
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
            where: { assignments: { none: {} } },
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

export const updateTagOnGoal = async (goalID, tags) => {
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
