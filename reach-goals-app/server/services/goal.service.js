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
        if (!isNaN(goalID) && typeof goalID !== 'number') {
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
        } else if (goalID === 'all') {
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
        }
    } catch (error) {
        throw new Error(`Failed to get goal: ${error.message}`)
    }
}

export const getGoalOnAssignment = async (assignmentID) => {
    try {
        const isAll = assignmentID === 'all'
        const isNumber =
            !isNaN(assignmentID) && typeof assignmentID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
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
        } else if (isNumber) {
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
    } catch (error) {
        throw new Error(`Failed to get goal-assignment: ${error.message}`)
    }
}

export const getGoalOnTag = async (tagID) => {
    try {
        const isAll = tagID === 'all'
        const isNumber =
            !isNaN(tagID) &&
            tagID !== '' &&
            tagID !== null &&
            tagID !== undefined

        if (!isAll && !isNumber) return

        if (isAll) {
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
        } else if (isNumber) {
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
    } catch (error) {
        throw new Error(`Failed to get goal-tag: ${error.message}`)
    }
}

export const getGoalWithoutAssignment = async (assignmentID) => {
    try {
        const isAll = assignmentID === 'all'
        const isNumeric =
            !isNaN(assignmentID) && typeof assignmentID !== 'boolean'

        if (!isAll && !isNumeric) return

        if (isAll) {
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
        } else if (isNumeric) {
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
