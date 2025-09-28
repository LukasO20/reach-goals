import { prisma } from '../connectdb.js'

const addGoal = async (data) => {
    if (!data) return

    try {
        return await prisma.goal.create({
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const updateGoal = async (goalID, data) => {
    if (!data) return

    try {
        return await prisma.goal.update({
            where: { id: Number(goalID) },
            data: data,
            include: { assignments: true, tags: { include: { tag: true } } }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const deleteGoal = async (goalID) => {
    if (!goalID) return

    try {
        return await prisma.goal.delete({
            where: { id: Number(goalID) }
        })
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getGoal = async (goalID) => {
    try {
        if (!isNaN(goalID) && typeof goalID !== 'number') {
            return await prisma.goal.findUnique({
                where: { id: Number(goalID) },
                include: {
                    assignments: { select: { id: true, name: true, start: true, end: true, status: true, description: true, duration: true } },
                    tags: { include: { tag: { select: { id: true, name: true, color: true } } } }
                }
            })
        } else if (goalID === 'all') {
            return await prisma.goal.findMany({
                include: {
                    assignments: { select: { id: true, name: true, start: true, end: true, status: true, description: true, duration: true } },
                    tags: { include: { tag: { select: { id: true, name: true, color: true } } } }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getGoalOnAssignment = async (assignmentID) => {
    console.log('ASSIGN HERE - ', assignmentID)
    try {
        const isAll = assignmentID === 'all'
        const isNumber = !isNaN(assignmentID) && typeof assignmentID !== 'number'

        if (!isAll && !isNumber) return

        if (isAll) {
            return await prisma.goal.findMany({
                where: { assignments: { some: {} } },
                include: { assignments: { select: { id: true, name: true, start: true, end: true, status: true, description: true, duration: true } } }
            })
        } else if (isNumber) {
            return await prisma.goal.findMany({
                where: { assignments: { some: { id: Number(assignmentID) } } },
                include: { assignments: { select: { id: true, name: true, start: true, end: true, status: true, description: true, duration: true } } }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const getGoalOnTag = async (tagID) => {
    try {
        const isTrue = tagID === true || tagID === 'true'
        const isNumber = !isNaN(tagID) && tagID !== '' && tagID !== null && tagID !== undefined

        if (!isTrue && !isNumber) return

        if (isTrue) {
            return await prisma.goal.findMany({
                where: { tags: { some: {} } },
                include: {
                    tags: {
                        include: { tag: { select: { id: true, name: true, color: true } } }
                    }
                }
            })
        } else if (isNumber) {
            return await prisma.goal.findMany({
                where: { tags: { id: Number(tagID) } },
                include: {
                    tags: {
                        include: { tag: { select: { id: true, name: true, color: true } } }
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

const getGoalWithoutAssignment = async (assignmentID) => {
    try {
        const isTrue = assignmentID === true || assignmentID === 'true'
        const isNumeric = !isNaN(assignmentID) && typeof assignmentID !== 'boolean';

        if (!isTrue && !isNumeric) return res.status(400).json({ error: 'Invalid assignmentID' })

        if (isTrue) {
            return await prisma.goal.findMany({
                where: { assignments: { none: {} } },
                include: {
                    tags: { include: { tag: { select: { id: true, name: true, color: true } } } }
                }
            })
        } else if (isNumeric) {
            return await prisma.goal.findMany({
                where: { assignments: { none: { id: Number(assignmentID) } } },
                include: {
                    assignments: { select: { id: true, name: true, start: true, end: true, status: true, description: true, duration: true } },
                    tags: { include: { tag: { select: { id: true, name: true, color: true } } } }
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

const updateTagOnGoal = async (goalID, tags) => {
    try {
        await prisma.tagOnGoal.deleteMany({
            where: { goalID: Number(goalID) }
        })

        await prisma.tagOnGoal.createMany({
            data: tags?.map(tag => ({
                goalID: Number(goalID),
                tagID: Number(tag.tagID)
            })),
            skipDuplicates: true
        })

        return true

    } catch (error) {
        return false
    }
}

const handleUpdateTagOnGoal = async (goalID, tags) => {
    if (!goalID || !tags) return

    const assignment = await updateTagOnGoal(goalID, tags)
    if (!assignment) {
        console.error("Failed to update this goal's tag relation")
    }
}

export {
    addGoal, updateGoal, deleteGoal, getGoal, getGoalOnAssignment, getGoalOnTag,
    getGoalWithoutAssignment, updateTagOnGoal, handleUpdateTagOnGoal
}