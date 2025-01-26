const prisma = require('../connectdb')

const addAssingment = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description } = req.body
        if (!name) { return res.status(400).json({ error: 'Name is required.'}) }
  
        try {
            const assignment = await prisma.assignment.create({
                data: { 
                    name,
                    description
                },
            })
    
            return res.status(201).json(assignment)
        
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create assignment'})
        }
    }
}

const updateAssingment = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, description } = req.body

        try {
            const assignment = await prisma.assignment.update({
                where: { id: Number(id) },
                data: {
                    name: name || null,
                    description: description || null
                }
            })

            return res.status(200).json(assignment)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating assignments'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const deleteAssingment = async (req, res) => {
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

const getAssingment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let assignment = undefined
            const { id } = req.params
            
            if (id !== undefined) {
                assignment = await prisma.assignment.findUnique({
                    where: { id: Number(id) }
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

module.exports = { addAssingment, updateAssingment, deleteAssingment, getAssingment }