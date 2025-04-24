const prisma = require('../connectdb')
const moment = require('moment')

const formatObject = (objectData) => { //CREATE AN UNIQUE "formatObject" function and share it
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    )
}

const addAssignment = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, duration, start, end, goalID } = req.body
        if (!name) { return res.status(400).json({ error: 'Name is required.'}) }
  
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
            goal: goalID ? { connect: goalID } : null
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData)

        try {
            const assignment = await prisma.assignment.create({
                data: formattedData,
                include: { goal: true }
            })  

            return res.status(201).json(assignment)
        
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create assignment'})
        }
    }
}

const updateAssignment = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, description, status, duration, start, end, goalID } = req.body

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
            goal: goalID ? { connect: goalID } : null
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData)

        try {
            const assignment = await prisma.assignment.update({
                where: { id: Number(id) },
                data: formattedData,
                include: { goal: true }
            })

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating assignments'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
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
            return res.status(500).json({ error: 'Failed to delete this assignment'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const getAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let assignment = undefined
            const { id } = req.params
            
            if (id !== undefined) {
                assignment = await prisma.assignment.findUnique({
                    where: { id: Number(id) },
                    include: { goal: true }
                })
            } else {
                assignment = await prisma.assignment.findMany()
            }

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch assignments'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

module.exports = { addAssignment, updateAssignment, deleteAssignment, getAssignment }