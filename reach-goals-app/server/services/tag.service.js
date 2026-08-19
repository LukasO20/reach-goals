import prisma from '../config/connectdb.js'

export const addTag = async (data) => {
    if (!data) return

    try {
        return await prisma.tag.create({
            data: data,
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateTag = async (tagID, data) => {
    if (!tagID) return

    try {
        return await prisma.tag.update({
            where: { id: tagID },
            data: data,
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteTag = async (tagID) => {
    if (!tagID) return

    try {
        return await prisma.tag.delete({
            where: { id: tagID },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTag = async (tagID) => {
    try {
        const isAllTag = tagID === 'all'
        const isUniqueTag = typeof tagID && tagID.trim() !== '' && !isAllTag

        if (!isUniqueTag && !isAllTag)
            throw new Error(`Invalid tagID: ${tagID}`)

        if (isUniqueTag) {
            return await prisma.tag.findUnique({
                where: { id: tagID },
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
        throw new Error(error.message)
    }
}

export const getTagOnGoal = async (goalID) => {
    try {
        const isAllTagGoal = goalID === 'all'
        const isUniqueTagGoal =
            typeof goalID && goalID.trim() !== '' && !isAllTagGoal

        if (!isUniqueTagGoal && !isAllTagGoal)
            throw new Error(`Invalid goalID: ${goalID}`)

        if (isUniqueTagGoal) {
            return await prisma.tag.findMany({
                where: {
                    goals: {
                        some: { goalID: goalID },
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
        throw new Error(error.message)
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    try {
        const isAllTagAssignment = assignmentID === 'all'
        const isUniqueTagAssignment =
            typeof assignmentID &&
            assignmentID.trim() !== '' &&
            !isAllTagAssignment

        if (!isUniqueTagAssignment && !isAllTagAssignment)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        if (isUniqueTagAssignment) {
            return await prisma.tag.findMany({
                where: {
                    assignments: {
                        some: { assignmentID: assignmentID },
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
        throw new Error(error.message)
    }
}

export const getTagNotGoal = async (goalID) => {
    try {
        const isValidGoalID = String(goalID).trim() !== ''

        if (!isValidGoalID) throw new Error(`Invalid goalID: ${goalID}`)

        return await prisma.tag.findMany({
            where: {
                NOT: {
                    goals: {
                        some: { goalID: goalID },
                    },
                },
            },
            select: { id: true, name: true, color: true },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    try {
        const isValidAssignmentID = String(assignmentID).trim() !== ''

        if (!isValidAssignmentID)
            throw new Error(`Invalid assignmentID: ${assignmentID}`)

        return await prisma.tag.findMany({
            where: {
                NOT: {
                    assignments: {
                        some: { assignmentID: assignmentID },
                    },
                },
            },
            select: { id: true, name: true, color: true },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const unlinkTagOnGoal = async (tagID, goalID) => {
    try {
        const isInvalidIds = !goalID || !tagID

        if (isInvalidIds) {
            throw new Error(`Invalid Ids - goalID: ${goalID}, tagID: ${tagID}`)
        }

        return await prisma.tagOnGoal.delete({
            where: {
                goalID_tagID: {
                    goalID: goalID,
                    tagID: tagID,
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const unlinkAllTagOnGoal = async (goalID) => {
    try {
        const isInvalidGoalID = !goalID

        if (isInvalidGoalID) {
            throw new Error(`Invalid goalID: ${goalID}`)
        }

        return await prisma.tagOnGoal.deleteMany({
            where: {
                goalID: goalID,
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const unlinkTagOnAssignment = async (tagID, assignmentID) => {
    try {
        const isInvalidIds = !assignmentID || !tagID

        if (isInvalidIds) {
            throw new Error(
                `Invalid Ids - assignmentID: ${assignmentID}, tagID: ${tagID}`
            )
        }

        return await prisma.tagOnAssignment.delete({
            where: {
                assignmentID_tagID: {
                    assignmentID: assignmentID,
                    tagID: tagID,
                },
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const unlinkAllTagOnAssignment = async (assignmentID) => {
    try {
        const isInvalidAssignmentID = !assignmentID

        if (isInvalidAssignmentID) {
            throw new Error(`Invalid assignmentID: ${assignmentID}`)
        }

        return await prisma.tagOnAssignment.deleteMany({
            where: {
                assignmentID: assignmentID,
            },
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
