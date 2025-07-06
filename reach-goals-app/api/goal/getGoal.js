import { getGoal } from './service.js'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const goal = await getGoal()

        if (goal) {
            return res.status(200).json(Array.isArray(goal) ? goal : [goal])
        } else {
            return res.status(500).json({ error: 'Failed to get a goal' })
        }

    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler