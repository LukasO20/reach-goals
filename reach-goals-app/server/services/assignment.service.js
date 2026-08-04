import prisma from '../config/connectdb.js'

export const addAssignment = async (data) => {
    try {
        return await prisma.assignment.create({
            data: data,
            include: { goal: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(`Failed to create assignment: ${error.message}`)
    }
}

export const updateAssignment = async (assignmentID, data) => {
    try {
        return await prisma.assignment.update({
            where: { id: Number(assignmentID) },
            data: data,
            include: { goal: true, tags: { include: { tag: true } } },
        })
    } catch (error) {
        throw new Error(`Failed to update assignment: ${error.message}`)
    }
}

export const deleteAssignment = async (assignmentID) => {
    try {
        return await prisma.assignment.delete({
            where: { id: Number(assignmentID) },
        })
    } catch (error) {
        throw new Error(`Failed to delete assignment: ${error.message}`)
    }
}

export const getAssignment = async (assignmentID) => {
    try {
        if (!isNaN(assignmentID) && typeof assignmentID !== 'number') {
            return await prisma.assignment.findUnique({
                where: { id: Number(assignmentID) },
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
        } else if (assignmentID === 'all') {
            return await prisma.assignment.findMany({
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
    } catch (error) {
        throw new Error(`Failed to get assignment: ${error.message}`)
    }
}

export const getAssignmentOnGoal = async (goalID) => {
    try {
        const isAll = goalID === 'all'
        const isNumber =
            !isNaN(goalID) &&
            goalID !== '' &&
            goalID !== null &&
            goalID !== undefined

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.assignment.findMany({
                where: { goalID: { not: null } },
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
        } else if (isNumber) {
            return await prisma.assignment.findMany({
                where: { goalID: Number(goalID) },
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
    } catch (error) {
        throw new Error(`Failed to get assignment-goal: ${error.message}`)
    }
}

export const getAssignmentOnTag = async (tagID) => {
    try {
        const isAll = 'all'
        const isNumber =
            !isNaN(tagID) &&
            tagID !== '' &&
            tagID !== null &&
            tagID !== undefined

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.assignment.findMany({
                where: { tags: { some: {} } },
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
        } else if (isNumber) {
            return await prisma.assignment.findMany({
                where: { tags: { id: Number(tagID) } },
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
    } catch (error) {
        throw new Error(`Failed to get assignment-tag: ${error.message}`)
    }
}

export const getAssignmentWithoutGoal = async () => {
    try {
        return await prisma.assignment.findMany({
            where: {
                goalID: null,
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
            where: { assignmentID: Number(assignmentID) },
        })

        return await prisma.tagOnAssignment.createMany({
            data: tags?.map((tag) => ({
                assignmentID: Number(assignmentID),
                tagID: Number(tag.tagID),
            })),
            skipDuplicates: true,
        })
    } catch (error) {
        throw new Error(`Failed to update tag on assignment: ${error.message}`)
    }
}
