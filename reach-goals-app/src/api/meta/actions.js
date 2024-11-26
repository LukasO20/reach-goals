const prisma = require('../connectdb')

const addMeta = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ error: 'Name is required.'})
        }
        try {
            const meta = await prisma.meta.create({
                data: { 
                    name,
                    description
                },
            })
    
            return res.status(201).json(meta)
        
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create meta'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const updateMeta = async (req, res) => {
    if (req.method === 'PUT') {

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const deleteMeta = async (req, res) => {
    if (req.method === 'DELETE') {

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

const getMeta = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const meta = await prisma.meta.findMany()
            return res.status(200).json(meta)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch metas'})
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'}) }
}

module.exports = { addMeta, updateMeta, deleteMeta, getMeta }