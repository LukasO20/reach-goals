const prisma = require('../connectdb')

const addGoal = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, start, end } = req.body

        if (!name) {
            return res.status(400).json({ error: 'Name is required.'})
        }

        const startDate = start ? new Date(start).toISOString() : start
        const endDate = end ? new Date(end).toISOString() : end

        try {
            const goal = await prisma.goal.create({
                data: { 
                    name,
                    description,
                    status,
                    start: startDate,
                    end: endDate
                },
            })
    
            return res.status(201).json(goal)
        
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create goal'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const updateGoal = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, description, status, start, end } = req.body

        const startDate = new Date(start).toISOString()
        const endDate = new Date(end).toISOString()

        try {
            const goal = await prisma.goal.update({
                where: { id: Number(id) },
                data: {
                    name: name || null,
                    description: description || null,
                    status: status || null,
                    start: startDate || null,
                    end: endDate || null
                }
            })

            return res.status(200).json(goal)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating goals'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
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
            return res.status(500).json({ error: 'Failed to delete this goal'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const getGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            let goal = undefined
            const { id } = req.params
            
            if (id !== undefined) {
                goal = await prisma.goal.findUnique({
                    where: { id: Number(id) }
                })
            } else {
                goal = await prisma.goal.findMany()
            }

            return res.status(200).json(goal)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch goals'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

module.exports = { addGoal, updateGoal, deleteGoal, getGoal }