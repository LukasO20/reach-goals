import { getGoalOnTag } from '../service.js'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { tagID } = req.query
        const goal = await getGoalOnTag(tagID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to fetch goals with this tag' })
        }

    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler