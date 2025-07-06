import { prisma } from '../connectdb.js'

const addAssignment = async (data) => {
    try {
        return await prisma.assignment.create({
            data: data,
            include: { goal: true, tags: { include: { tag: true } } }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const updateAssignment = async (assignmentID, data) => {
    try {
        return await prisma.assignment.update({
            where: { id: Number(assignmentID) },
            data: data,
            include: { goal: true, tags: { include: { tag: true } } }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const deleteAssignment = async (assignmentID) => {
    try {
        return await prisma.assignment.delete({
            where: { id: Number(assignmentID) }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getAssignment = async (assignmentID) => {
    try {
        if (assignmentID !== undefined && !isNaN(assignmentID)) {
            return await prisma.assignment.findUnique({
                where: { id: Number(assignmentID) },
                include: { goal: true, tags: true }
            })
        } else {
            return await prisma.assignment.findMany({
                include: { goal: true, tags: true }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getAssignmentOnGoal = async (goalID) => {
    try {
        const isTrue = goalID === true || goalID === 'true'
        const isNumber = !isNaN(goalID) && goalID !== '' && goalID !== null && goalID !== undefined

        if (!isTrue && !isNumber) return

        if (isTrue) {
            return await prisma.assignment.findMany({
                where: {
                    goalID: { not: null }
                },
                include: { goal: true, tags: true }
            })
        } else if (isNumber) {
            return await prisma.assignment.findMany({
                where: {
                    goalID: Number(goalID)
                },
                include: { goal: true, tags: true }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getAssignmentOnTag = async (tagID) => {
    try {
        const isTrue = tagID === true || tagID === 'true'
        const isNumber = !isNaN(tagID) && tagID !== '' && tagID !== null && tagID !== undefined

        if (!isTrue && !isNumber) return

        if (isTrue) {
            return await prisma.assignment.findMany({
                where: { tags: { some: {} } },
                include: { goal: true, tags: true }
            })
        } else if (isNumber) {
            return await prisma.assignment.findMany({
                where: { tags: { id: Number(tagID) } },
                include: { goal: true, tags: true }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getAssignmentWithoutGoal = async () => {
    try {
        return await prisma.assignment.findMany({
            where: {
                goalID: null
            },
            include: { tags: true }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const updateTagOnAssignment = async (assignmentID, tags) => {
    try {
        await prisma.tagOnAssignment.deleteMany({
            where: { assignmentID: Number(assignmentID) }
        })

        await prisma.tagOnAssignment.createMany({
            data: tags?.map(tag => ({
                assignmentID: Number(assignmentID),
                tagID: Number(tag.tagID)
            })),
            skipDuplicates: true
        })

        return true

    } catch (error) {
        return false
    }
}

const handleUpdateTagOnAssignment = async (assignmentID, tags) => {
    if (!assignmentID || !tags) return

    const assignment = await updateTagOnAssignment(assignmentID, tags)
    if (!assignment) {
        console.error("Failed to update this assignment's tag relation")
    }
}

export {
    addAssignment, updateAssignment, deleteAssignment, getAssignment, getAssignmentOnGoal, getAssignmentOnTag,
    getAssignmentWithoutGoal, updateTagOnAssignment, handleUpdateTagOnAssignment
}