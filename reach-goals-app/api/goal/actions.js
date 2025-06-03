const prisma = require('../connectdb')
const moment = require('moment')

const formatObject = (objectData) => { //CREATE AN UNIQUE "formatObject" function and share it
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== "")
    )
}

const extractIds = (arr, key = 'id') => {
    if (!Array.isArray(arr)) return []
    return arr.map(item => typeof item === 'object' ? Number(item[key]) : Number(item))
}

const addGoal = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, start, end, assignments, tags } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignments.map((id) => ({ id: Number(id) }))
            },
            tags: {
                create: tags.map(tagID => ({
                    tag: { connect: { id: Number(tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal TO ADD - ', formattedData)

        try {
            const goal = await prisma.goal.create({
                data: formattedData,
                include: { assignments: true, tags: { include: { tag: true } } }
            })

            return res.status(201).json(goal)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const updateGoal = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, description, status, start, end, assignments, tags } = req.body

        const typeDate = ['DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD']
        const startDate = start ? moment(start, typeDate).toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, typeDate).toISOString() : null

        const assignmentIds = extractIds(assignments, 'id')
        const tagIds = extractIds(tags, 'tagID')

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignmentIds?.map(id => ({ id }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal RECEVEID - ', rawObject)
        console.log('Goal TO UPDATE - ', formattedData)

        try {

            await prisma.tagOnGoal.createMany({
                data: tagIds?.map(tagID => ({ goalID: Number(id), tagID: Number(tagID) })) || [],
                skipDuplicates: true
            })

            const goal = await prisma.goal.update({
                where: { id: Number(id) },
                data: formattedData,
                include: { assignments: true, tags: { include: { tag: true } } }
            })

            return res.status(200).json(goal)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating goals' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const deleteGoal = async (req, res) => {
    if (req.method === 'DELETE') {

        const { id } = req.params

        try {

            const goal = await prisma.goal.delete({
                where: { id: Number(id) }
            })

            return res.status(200).json(goal)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete this goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { id } = req.params
            let goal = undefined

            if (id !== undefined && !isNaN(id)) {
                goal = await prisma.goal.findUnique({
                    where: { id: Number(id) },
                    include: { assignments: true, tags: true }
                })
            } else {
                goal = await prisma.goal.findMany({
                    include: { assignments: true, tags: true }
                })
            }

            return res.status(200).json(Array.isArray(goal) ? goal : [goal])

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch goals' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getGoalOnAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params
            let goal = undefined

            const isTrue = relationID === true || relationID === 'true'
            const isNumber = !isNaN(relationID) && relationID !== '' && relationID !== null && relationID !== undefined

            if (!isTrue && !isNumber) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            if (isTrue) {
                goal = await prisma.goal.findMany({
                    where: { assignments: { some: {} } },
                    include: { assignments: true, tags: true }
                })
            } else if (isNumber) {
                goal = await prisma.goal.findMany({
                    where: { assignments: { none: { id: Number(relationID) } } },
                    include: { assignments: true, tags: true }
                })
            }

            return res.status(200).json(goal)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch goals on this assignment' })
        }
    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getGoalOnTag = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params
            let goal = undefined

            const isTrue = relationID === true || relationID === 'true'
            const isNumber = !isNaN(relationID) && relationID !== '' && relationID !== null && relationID !== undefined

            if (!isTrue && !isNumber) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            if (isTrue) {
                goal = await prisma.goal.findMany({
                    where: { tags: { some: {} } },
                    include: { assignments: true, tags: true }
                })
            } else if (isNumber) {
                goal = await prisma.goal.findMany({
                    where: { tags: { id: Number(relationID) } },
                    include: { assignments: true, tags: true }
                })
            }

            return res.status(200).json(goal)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch goals with this tag' })
        }
    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getGoalWithoutAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params
            let goal = undefined

            const isTrue = relationID === true || relationID === 'true'
            const isNumber = !isNaN(relationID) && relationID !== '' && relationID !== null && relationID !== undefined

            if (!isTrue && !isNumber) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            if (isTrue) {
                goal = await prisma.goal.findMany({
                    where: { assignments: { none: {} } },
                    include: { assignments: true, tags: true }
                })
            } else if (isNumber) {
                goal = await prisma.goal.findMany({
                    where: { assignments: { none: { id: Number(relationID) } } },
                    include: { assignments: true, tags: true }
                })
            }

            return res.status(200).json(goal)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch goals on this assignment' })
        }
    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

module.exports = { addGoal, updateGoal, deleteGoal, getGoal, getGoalOnTag, getGoalOnAssignment, getGoalWithoutAssignment }