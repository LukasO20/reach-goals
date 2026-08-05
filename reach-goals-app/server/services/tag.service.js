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
        const isUniqueTag = !isNaN(tagID) && String(tagID).trim() !== ''
        const isAllTag = tagID === 'all'

        if (!isUniqueTag && !isAllTag)
            throw new Error(`Invalid tagID: ${tagID}`)

        if (isUniqueTag) {
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
        }

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
    } catch (error) {
        throw new Error(`Failed to get tag: ${error.message}`)
    }
}

export const getTagOnGoal = async (goalID) => {
    try {
        const isUniqueTagGoal = !isNaN(goalID) && String(goalID).trim() !== ''
        const isAllTagGoal = goalID === 'all'

        if (!isUniqueTagGoal && !isAllTagGoal)
            throw new Error(`Invalid goalID: ${goalID}`)

        if (isUniqueTagGoal) {
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
    } catch (error) {
        throw new Error(`Failed to get tag-goal: ${error.message}`)
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    try {
        const isUniqueTagAssignment =
            !isNaN(assignmentID) && String(assignmentID).trim() !== ''
        const isAllTagAssignment = assignmentID === 'all'

        if (!isUniqueTagAssignment && !isAllTagAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueTagAssignment) {
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
    } catch (error) {
        throw new Error(`Failed to get tag-assignment: ${error.message}`)
    }
}

export const getTagNotGoal = async (goalID) => {
    try {
        const isValidGoalID = !isNaN(goalID) && String(goalID).trim() !== ''

        if (!isValidGoalID) throw new Error(`Invalid goalID: ${goalID}`)

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
    } catch (error) {
        throw new Error(`Failed to get tag-not-goal: ${error.message}`)
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    try {
        const isValidAssignmentID =
            !isNaN(assignmentID) && String(assignmentID).trim() !== ''

        if (!isValidAssignmentID)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

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
    try {
        const isInvalidIds = isNaN(goalID) || isNaN(tagID)

        if (isInvalidIds) {
            throw new Error(`Invalid Ids - goalID: ${goalID}, tagID: ${tagID}`)
        }

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
    try {
        const isInvalidGoalID = isNaN(goalID)

        if (isInvalidGoalID) {
            throw new Error(`Invalid goalID: ${goalID}`)
        }

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
        const isInvalidIds = isNaN(assignmentID) || isNaN(tagID)

        if (isInvalidIds) {
            throw new Error(
                `Invalid Ids - assignmentID: ${assignmentID}, tagID: ${tagID}`
            )
        }

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
    try {
        const isInvalidAssignmentID = isNaN(assignmentID)

        if (isInvalidAssignmentID) {
            throw new Error(`Invalid assignmentID: ${assignmentID}`)
        }

        return await prisma.tagOnAssignment.deleteMany({
            where: {
                assignmentID: Number(assignmentID),
            },
        })
    } catch (error) {
        throw new Error(`Failed to unlink all tag-assignment: ${error.message}`)
    }
}
