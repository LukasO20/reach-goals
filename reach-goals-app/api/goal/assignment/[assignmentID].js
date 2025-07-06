import { getGoalOnAssignment } from '../service.js'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.query
        const goal = await getGoalOnAssignment(assignmentID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to fetch goals on this assignment' })
        }

    }
    
    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler