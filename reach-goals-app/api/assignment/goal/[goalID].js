import { getAssignmentOnGoal } from '../service.js'

const handler = async (req, res) => {
    
    if (req.method === 'GET') {
        const { goalID } = req.query
        const assignment = await getAssignmentOnGoal(goalID)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments with goals' })
        }
    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler