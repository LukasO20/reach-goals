import { prisma } from '../connectdb.js'

const addTag = async (data) => {
    if (!data) return

    try {
        return await prisma.tag.create({
            data: data
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const updateTag = async (tagID, data) => {
    if (!tagID) return

    try {
        return await prisma.tag.update({
            where: { id: Number(tagID) },
            data: data,
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const deleteTag = async (tagID) => {
    if (!tagID) return

    try {
        return await prisma.tag.delete({
            where: { id: Number(tagID) }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTag = async (tagID) => {
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
                                }
                            }
                        }
                    },
                    assignments: {
                        include: {
                            assignment: {
                                select: {
                                    name: true,
                                    status: true,
                                }
                            }
                        }
                    }
                }
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
                                }
                            }
                        }
                    },
                    assignments: {
                        include: {
                            assignment: {
                                select: {
                                    name: true,
                                    status: true,
                                }
                            }
                        }
                    }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTagOnGoal = async (goalID) => {
    try {
        const isAll = goalID === 'all'
        const isNumber = !isNaN(goalID) && typeof goalID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.tag.findMany({
                where: {
                    goals: {
                        some: {}
                    }
                },
                include: {
                    goals: {
                        include: {
                            goal: {
                                select: {
                                    name: true,
                                    status: true,
                                }
                            }
                        }
                    }
                }
            })
        } else if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    goals: {
                        some: { goalID: Number(goalID) }
                    }
                },
                include: {
                    goals: {
                        include: {
                            goal: {
                                select: {
                                    name: true,
                                    status: true,
                                }
                            }
                        }
                    }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTagOnAssignment = async (assignmentID) => {
    try {
        const isAll = assignmentID === 'all'
        const isNumber = !isNaN(assignmentID) && typeof assignmentID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.tag.findMany({
                where: {
                    assignments: {
                        some: {}
                    }
                },
                include: {
                    assignments: {
                        include: {
                            assignment: {
                                select: {
                                    name: true,
                                    status: true
                                }
                            }
                        }
                    }
                }
            })
        } else if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    assignments: {
                        some: { assignmentID: Number(assignmentID) }
                    }
                },
                include: {
                    assignments: {
                        include: {
                            assignment: {
                                select: {
                                    name: true,
                                    status: true,
                                }
                            }
                        }
                    }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTagNotGoal = async (goalID) => {
    try {
        const isNumber = !isNaN(goalID) && typeof goalID !== 'number'

        if (isNumber) {
            return await prisma.tag.findMany({
                where: {
                    NOT: {
                        goals: {
                            some: { goalID: Number(goalID) }
                        }
                    }
                },
                select: { id: true, name: true, color: true }
            })
        }
    } catch (error) {
        console.error(error)
        return false
    }
}

const getTagNotAssignment = async (assignmentID) => {
    if (!assignmentID) return

    try {
        return await prisma.tag.findMany({
            where: {
                NOT: {
                    assignments: {
                        some: { assignmentID: Number(assignmentID) }
                    }
                }
            },
            select: { id: true, name: true, color: true }
        })

    } catch (error) {
        console.error(error)
        return false
    }
}

const unlinkTagOnGoal = async (tagID, goalID) => {
    if (!tagID && !goalID) return

    try {
        return await prisma.tagOnGoal.delete({
            where: {
                goalID_tagID: {
                    goalID: Number(goalID),
                    tagID: Number(tagID)
                }
            }
        })

    } catch (error) {
        console.error(error)
        return false
    }
}

const unlinkAllTagOnGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.tagOnGoal.deleteMany({
            where: {
                goalID: Number(goalID),
            }
        })

    } catch (error) {
        console.error(error)
        return false
    }
}

const unlinkTagOnAssignment = async (tagID, assignmentID) => {
    try {
        return await prisma.tagOnAssignment.delete({
            where: {
                assignmentID_tagID: {
                    assignmentID: Number(assignmentID),
                    tagID: Number(tagID)
                }
            }
        })

    } catch (error) {
        console.error(error)
        return false
    }
}

const unlinkAllTagOnAssignment = async (assignmentID) => {
    if (!assignmentID) return

    try {
        return await prisma.tagOnAssignment.deleteMany({
            where: {
                assignmentID: Number(assignmentID),
            }
        })

    } catch (error) {
        console.error(error)
        return false
    }
}

export {
    unlinkTagOnGoal, unlinkAllTagOnGoal, unlinkTagOnAssignment, unlinkAllTagOnAssignment, getTagNotAssignment, getTagNotGoal,
    getTagOnAssignment, getTagOnGoal, getTag, deleteTag, updateTag, addTag
}