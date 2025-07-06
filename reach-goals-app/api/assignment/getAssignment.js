import { getAssignment } from './service.js'

const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.query
        const assignment = await getAssignment(assignmentID)

        if (assignment) {
            return res.status(200).json(Array.isArray(assignment) ? assignment : [assignment])
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments' })
        }

    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler