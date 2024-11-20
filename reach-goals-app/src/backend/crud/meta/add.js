import prisma from '../../connectdb'

export const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name } = req.body
    
        if (!name) {
            return res.status(400).json({ error: 'Name is required'})
        }

        try {
            const meta = await prisma.meta.create({
                data: { 
                    name,
                },
            })
    
            return res.status(201).json(meta)
        
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create meta'})
        }

    } else {
        return res.status(405).json({ error: 'Method not allowed. Check the type of method sended'})
    }
}