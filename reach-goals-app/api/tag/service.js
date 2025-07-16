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
                include: { goals: true, assignments: true }
            })
        } else {
            return await prisma.tag.findMany({
                include: { goals: true, assignments: true }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTagOnGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.tagOnGoal.findMany({
            where: { goalID: Number(goalID) },
            include: { tag: { select: { id: true, name: true, color: true } } }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getTagOnAssignment = async (assignmentID) => {
    if (!assignmentID) return

    try {
        return await prisma.tagOnAssignment.findMany({
            where: { assignmentID: Number(assignmentID) },
            include: { tag: { select: { id: true, name: true, color: true } } }
        })
    } catch (error) {
        console.error(error)
        return false
    }
}

const getTagNotGoal = async (goalID) => {
    if (!goalID) return

    try {
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
    if (!tagID && !relationID) return

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