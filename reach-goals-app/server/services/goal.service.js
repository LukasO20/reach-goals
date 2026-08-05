import prisma from '../config/connectdb.js'

export const addGoal = async (data) => {
    if (!data) return

    try {
        return await prisma.goal.create({
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(`Failed to create goal: ${error.message}`)
    }
}

export const updateGoal = async (goalID, data) => {
    if (!data) return

    try {
        return await prisma.goal.update({
            where: { id: Number(goalID) },
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(`Failed to update goal: ${error.message}`)
    }
}

export const deleteGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.goal.delete({
            where: { id: Number(goalID) },
        })
    } catch (error) {
        throw new Error(`Failed to delete goal: ${error.message}`)
    }
}

export const getGoal = async (goalID) => {
    try {
        const isUniqueGoal = !isNaN(goalID) && String(goalID).trim() !== ''
        const isAllGoal = goalID === 'all'

        if (!isUniqueGoal && !isAllGoal)
            throw new Error(`Invalid goalID: ${goalID}`)

        if (isUniqueGoal) {
            return await prisma.goal.findUnique({
                where: { id: Number(goalID) },
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
        throw new Error(`Failed to get goal: ${error.message}`)
    }
}

export const getGoalOnAssignment = async (assignmentID) => {
    try {
        const isUniqueGoalAssignment =
            !isNaN(assignmentID) && String(assignmentID).trim() !== ''
        const isAllGoalAssignment = assignmentID === 'all'

        if (!isUniqueGoalAssignment && !isAllGoalAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueGoalAssignment) {
            return await prisma.goal.findMany({
                where: { assignments: { some: { id: Number(assignmentID) } } },
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
        throw new Error(`Failed to get goal-assignment: ${error.message}`)
    }
}

export const getGoalOnTag = async (tagID) => {
    try {
        const isUniqueGoalTag = !isNaN(tagID) && String(tagID).trim() !== ''
        const isAllGoalTag = tagID === 'all'

        if (!isUniqueGoalTag && !isAllGoalTag)
            throw new Error(`Invalid tagID: ${tagID}`)

        if (isUniqueGoalTag) {
            return await prisma.goal.findMany({
                where: { tags: { id: Number(tagID) } },
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
        throw new Error(`Failed to get goal-tag: ${error.message}`)
    }
}

export const getGoalWithoutAssignment = async (assignmentID) => {
    try {
        const isUniqueGoalNotAssignment =
            !isNaN(assignmentID) && String(assignmentID).trim() !== ''
        const isAllGoalNotAssignment = assignmentID === 'all'

        if (!isUniqueGoalNotAssignment && !isAllGoalNotAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueGoalNotAssignment) {
            return await prisma.goal.findMany({
                where: { assignments: { none: { id: Number(assignmentID) } } },
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
            where: { goalID: Number(goalID) },
        })

        return await prisma.tagOnGoal.createMany({
            data: tags?.map((tag) => ({
                goalID: Number(goalID),
                tagID: Number(tag.tagID),
            })),
            skipDuplicates: true,
        })
    } catch (error) {
        throw new Error(`Failed to update tag on goal: ${error.message}`)
    }
}
