const prisma = require('../connectdb')
const moment = require('moment')

const formatObject = (objectData) => { //CREATE AN UNIQUE "formatObject" function and share it
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== "")
    )
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

        const startDate = start ? moment(start).toISOString() : new Date().toISOString()
        const endDate = end ? moment(end).toISOString() : null

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignments?.map(assignment => ({ id: Number(assignment?.id ?? assignment) }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal TO UPDATE - ', formattedData)

        try {

            await prisma.tagOnGoal.createMany({
                data: tags?.map(tagID => ({ goalID: Number(id), tagID: Number(tagID) })) || [],
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
            let goal = undefined
            const { id } = req.params

            console.log('ID GOAL - ', id)
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

            return res.status(200).json(goal)

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

            if (!relationID || isNaN(relationID)) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." });
            }

            if (relationID !== undefined) {
                goal = await prisma.goal.findMany({
                    where: { 
                        assignments: {
                            some: {
                                id: Number(relationID)
                            }
                        }
                    },
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

module.exports = { addGoal, updateGoal, deleteGoal, getGoal, getGoalOnAssignment }