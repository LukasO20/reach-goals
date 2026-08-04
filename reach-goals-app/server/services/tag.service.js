import prisma from '../config/connectdb.js'

export const addTag = async (data) => {
    if (!data) return

    try {
        return await prisma.tag.create({
            data: data,
        })
    } catch (error) {
        throw new Error(`Failed to create tag: ${error.message}`)
    }
}

export const updateTag = async (tagID, data) => {
    if (!tagID) return

    try {
        return await prisma.tag.update({
            where: { id: Number(tagID) },
            data: data,
        })
    } catch (error) {
        throw new Error(`Failed to update tag: ${error.message}`)
    }
}

export const deleteTag = async (tagID) => {
    if (!tagID) return

    try {
        return await prisma.tag.delete({
            where: { id: Number(tagID) },
        })
    } catch (error) {
        throw new Error(`Failed to delete tag: ${error.message}`)
    }
}

export const getTag = async (tagID) => {
    try {
        if (tagID !== undefined && !isNaN(tagID)) {
            return await prisma.tag.findUnique({
                where: { id: Number(tagID) },
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
        } else if (tagID === 'all') {
            return await prisma.tag.findMany({
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
        }
    } catch (error) {
        throw new Error(`Failed to get tag: ${error.message}`)
    }
}

export const getTagOnGoal = async (goalID) => {
    try {
        const isAll = goalID === 'all'
        const isNumber = !isNaN(goalID) && typeof goalID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.tag.findMany({
                where: {
                    goals: {
                        some: {},
                    },
                },
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
                },
            })
        } else if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    goals: {
                        some: { goalID: Number(goalID) },
                    },
                },
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
                },
            })
        }
    } catch (error) {
        throw new Error(`Failed to get tag-goal: ${error.message}`)
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    try {
        const isAll = assignmentID === 'all'
        const isNumber =
            !isNaN(assignmentID) && typeof assignmentID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.tag.findMany({
                where: {
                    assignments: {
                        some: {},
                    },
                },
                include: {
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
        } else if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    assignments: {
                        some: { assignmentID: Number(assignmentID) },
                    },
                },
                include: {
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
        }
    } catch (error) {
        throw new Error(`Failed to get tag-assignment: ${error.message}`)
    }
}

export const getTagNotGoal = async (goalID) => {
    try {
        const isNumber = !isNaN(goalID) && typeof goalID !== 'number'

        if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    NOT: {
                        goals: {
                            some: { goalID: Number(goalID) },
                        },
                    },
                },
                select: { id: true, name: true, color: true },
            })
        }
    } catch (error) {
        throw new Error(`Failed to get tag-not-goal: ${error.message}`)
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    if (!assignmentID) return

    try {
        return await prisma.tag.findMany({
            where: {
                NOT: {
                    assignments: {
                        some: { assignmentID: Number(assignmentID) },
                    },
                },
            },
            select: { id: true, name: true, color: true },
        })
    } catch (error) {
        throw new Error(`Failed to get tag-not-assignment: ${error.message}`)
    }
}

export const unlinkTagOnGoal = async (tagID, goalID) => {
    if (!tagID && !goalID) return

    try {
        return await prisma.tagOnGoal.delete({
            where: {
                goalID_tagID: {
                    goalID: Number(goalID),
                    tagID: Number(tagID),
                },
            },
        })
    } catch (error) {
        throw new Error(`Failed to unlink tag-goal: ${error.message}`)
    }
}

export const unlinkAllTagOnGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.tagOnGoal.deleteMany({
            where: {
                goalID: Number(goalID),
            },
        })
    } catch (error) {
        throw new Error(`Failed to unlink all tag-goal: ${error.message}`)
    }
}

export const unlinkTagOnAssignment = async (tagID, assignmentID) => {
    try {
        return await prisma.tagOnAssignment.delete({
            where: {
                assignmentID_tagID: {
                    assignmentID: Number(assignmentID),
                    tagID: Number(tagID),
                },
            },
        })
    } catch (error) {
        throw new Error(`Failed to unlink tag-assignment: ${error.message}`)
    }
}

export const unlinkAllTagOnAssignment = async (assignmentID) => {
    if (!assignmentID) return

    try {
        return await prisma.tagOnAssignment.deleteMany({
            where: {
                assignmentID: Number(assignmentID),
            },
        })
    } catch (error) {
        throw new Error(`Failed to unlink all tag-assignment: ${error.message}`)
    }
}
