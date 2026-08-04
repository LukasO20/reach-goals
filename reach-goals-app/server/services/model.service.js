import prisma from '../config/connectdb.js'

export const updateModelDragDrop = async (data = [], typeModel = '') => {
    const allowTypesModel = ['goal', 'assignment']

    if (allowTypesModel.includes(typeModel)) {
        try {
            return await prisma.$transaction(
                data.map((item) =>
                    prisma[typeModel].update({
                        where: { id: item.id },
                        data: { order: item.order, status: item.status },
                    })
                )
            )
        } catch (error) {
            throw new Error(`Error updating drag-drop model: ${error.message}`)
        }
    }

    throw new Error(
        `Something went wrong during update drag drop model: type is ${typeModel}. Send 'goal' or 'assignment'`
    )
}

export const removeModels = async (data = []) => {
    try {
        const [
            removedTagOnGoal,
            removedTagOnAssignment,
            removedTags,
            removedGoals,
            removedAssignments,
        ] = await prisma.$transaction([
            prisma.tagOnGoal.deleteMany({
                where: {
                    goalID: { in: data },
                },
            }),
            prisma.tagOnAssignment.deleteMany({
                where: {
                    assignmentID: { in: data },
                },
            }),
            prisma.tag.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
            prisma.goal.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
            prisma.assignment.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
        ])

        const totalDeleted = [
            removedTagOnGoal,
            removedTagOnAssignment,
            removedTags,
            removedGoals,
            removedAssignments,
        ].reduce((sum, item) => sum + item.count, 0)

        return totalDeleted > 0
    } catch (error) {
        throw new Error(`Error removing models: ${error.message}`)
    }
}

export const updateModelStatus = async (ids = [], status = '') => {
    const allowStatus = ['progress', 'conclude', 'cancel']

    if (allowStatus.includes(status)) {
        try {
            const statusGoal = await prisma.goal.updateMany({
                where: { id: { in: ids } },
                data: { status },
            })

            const statusAssignment = await prisma.assignment.updateMany({
                where: { id: { in: ids } },
                data: { status },
            })

            return { goal: statusGoal, assignment: statusAssignment }
        } catch (error) {
            throw new Error(`Error updating model status: ${error.message}`)
        }
    }
}
