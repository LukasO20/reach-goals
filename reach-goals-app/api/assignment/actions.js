const prisma = require('../connectdb')
const moment = require('moment')

const formatObject = (objectData) => { //CREATE AN UNIQUE "formatObject" function and share it
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    )
}

const addAssignment = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, duration, start, end, goalID, tags } = req.body
        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null
        const durationFormat = duration ? parseInt(duration) : null

        const rawObject = {
            name,
            description,
            status,
            duration: durationFormat,
            start: startDate,
            end: endDate,
            goalID: goalID ? Number(goalID) : null,
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: Number(tag.tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData)

        try {

            const assignment = await prisma.assignment.create({
                data: formattedData,
                include: { goal: true, tags: { include: { tag: true } } }
            })

            return res.status(201).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create assignment' })
        }
    }
}

const updateAssignment = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, description, status, duration, start, end, goalID, tags } = req.body

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null
        const durationFormat = duration ? parseInt(duration) : null

        const rawObject = {
            name,
            description,
            status,
            duration: durationFormat,
            start: startDate,
            end: endDate,
            goalID: goalID ? Number(goalID) : null,
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData, tags)

        try {
            handleUpdateTagOnAssignment(id, tags)

            const assignment = await prisma.assignment.update({
                where: { id: Number(id) },
                data: formattedData,
                include: { goal: true, tags: { include: { tag: true } } }
            })

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const deleteAssignment = async (req, res) => {
    if (req.method === 'DELETE') {

        const { id } = req.params

        try {
            const assignment = await prisma.assignment.delete({
                where: { id: Number(id) }
            })

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete this assignment' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let assignment = undefined
            const { id } = req.params

            if (id !== undefined && !isNaN(id)) {
                assignment = await prisma.assignment.findUnique({
                    where: { id: Number(id) },
                    include: { goal: true, tags: true }
                })
            } else {
                assignment = await prisma.assignment.findMany({
                    include: { goal: true, tags: true }
                })
            }

            return res.status(200).json(Array.isArray(assignment) ? assignment : [assignment])

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getAssignmentOnGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params
            let assignment = undefined

            const isTrue = relationID === true || relationID === 'true'
            const isNumber = !isNaN(relationID) && relationID !== '' && relationID !== null && relationID !== undefined

            if (!isTrue && !isNumber) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            if (isTrue) {
                assignment = await prisma.assignment.findMany({
                    where: {
                        goalID: { not: null }
                    },
                    include: { goal: true, tags: true }
                })
            } else if (isNumber) {
                assignment = await prisma.assignment.findMany({
                    where: {
                        goalID: Number(relationID)
                    },
                    include: { goal: true, tags: true }
                })
            }

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getAssignmentOnTag = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params
            let assignment = undefined

            const isTrue = relationID === true || relationID === 'true'
            const isNumber = !isNaN(relationID) && relationID !== '' && relationID !== null && relationID !== undefined

            if (!isTrue && !isNumber) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            if (isTrue) {
                assignment = await prisma.assignment.findMany({
                    where: { tags: { some: {} } },
                    include: { goal: true, tags: true }
                })
            } else if (isNumber) {
                assignment = await prisma.assignment.findMany({
                    where: { tags: { id: Number(relationID) } },
                    include: { goal: true, tags: true }
                })
            }

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch assignments with this tag' })
        }
    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getAssignmentWithoutGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let assignment = undefined

            assignment = await prisma.assignment.findMany({
                where: {
                    goalID: null
                },
                include: { tags: true }
            })

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUpdateTagOnAssignment = async (assignmentID, tags) => {
    if (!assignmentID || !tags) return

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

    } catch (error) {
        console.error('Failed to update tags on assignment:', error)
    }
}

module.exports = { addAssignment, updateAssignment, deleteAssignment, getAssignment, getAssignmentOnTag, getAssignmentOnGoal, getAssignmentWithoutGoal }