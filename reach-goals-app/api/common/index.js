import prisma from '../connectdb.js'

const handler = async (req, res) => {
    const { action, params } = req.query
    const { data, typeModel, status } = req.body
    let results = undefined

    if (req.method === 'GET') {

        try {

            if (action === 'search-model') {
                results = await searchResults(params)
                if (results) return res.status(200).json(results)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' })
        }
    }

    if (req.method === 'PUT') {

        try {

            if (action === 'update-dragdrop') {
                results = await updateModelDragDrop(data, typeModel)
                if (results) return res.status(200).json(results)
            }

            if (action === 'update-status') {
                results = await updateModelStatus(data, status)
                if (results) return res.status(200).json(results)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' })
        }
    }

    if (req.method === 'DELETE') {

        try {

            if (action === 'remove-models') {
                results = await removeModels(data)
                if (results) return res.status(200).json(results)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' })
        }
    }
}

const searchResults = async (params = '') => {

    if (!!params) {
        const fieldsCommon = { name: { contains: params, mode: 'insensitive' } }

        const goals = await prisma.goal.findMany({
            where: { ...fieldsCommon }
        })

        const assignments = await prisma.assignment.findMany({
            where: { ...fieldsCommon }
        })

        const tags = await prisma.tag.findMany({
            where: { ...fieldsCommon },
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

        return { goals, assignments, tags }
    }

    return { goals: [], assignments: [], tags: [] }
}

const updateModelDragDrop = async (data = [], typeModel = '') => {
    const allowTypesModel = ['goal', 'assignment']

    if (allowTypesModel.includes(typeModel)) {

        try {
            return await prisma.$transaction(
                data.map(item =>
                    prisma[typeModel].update({
                        where: { id: item.id },
                        data: { order: item.order, status: item.status }
                    })
                )
            )
        }
        catch (err) {
            return console.error('Error update status and order model:', err)
        }
    }

    return console.error(`Something went wrong during update drag drop model: type is ${typeModel}. Send 'goal' or 'assignment'`)
}

const removeModels = async (data = []) => {

    try {
        const removedGoal = await prisma.goal.deleteMany({
            where: { id: { in: data } }
        })

        const removedAssignment = await prisma.assignment.deleteMany({
            where: { id: { in: data } }
        })

        const removedTag = await prisma.tag.deleteMany({
            where: { id: { in: data } }
        })

        const isTrue = !!removedGoal || !!removedAssignment || !!removedTag
        return isTrue
    }
    catch (err) {
        return console.error('Error removing models:', err)
    }
}

const updateModelStatus = async (ids = [], status = '') => {
    const allowStatus = ['progress', 'conclude', 'cancel']

    if (allowStatus.includes(status)) {

        try {
            const statusGoal = await prisma.goal.updateMany({
                where: { id: { in: ids } },
                data: { status }
            })

            const statusAssignment = await prisma.assignment.updateMany({
                where: { id: { in: ids } },
                data: { status }
            })

            return { goal: statusGoal, assignment: statusAssignment }
        }
        catch (err) {
            return console.error('Error updating model status:', err)
        }
    }
}

export default handler