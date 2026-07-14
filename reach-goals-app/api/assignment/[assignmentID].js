import { getAssignment, updateAssignment, deleteAssignment, handleUpdateTagOnAssignment } from './service.js'
import { formatObject } from '../utils/utils.js'

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

    if (req.method === 'PUT') {
        const { assignmentID } = req.query
        const { name, description, status, duration, start, end, goalID, tags } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? start : new Date().toISOString()
        const endDate = end ? end : null
        const durationFormat = duration ? parseInt(duration) : null

        const rawObject = {
            name,
            description,
            status,
            duration: durationFormat,
            start: startDate,
            end: endDate,
            goalID: goalID ? Number(goalID) : null,
        }

        const formattedData = formatObject(rawObject)

        await handleUpdateTagOnAssignment(assignmentID, tags)
        const assignment = await updateAssignment(assignmentID, formattedData)

        try {
            if (assignment) return res.status(201).json(assignment)
        }
        catch (err) {
            console.error('Error update assignment:', err)
            return res.status(500).json({ error: err.message || 'Failed updating assignment' })
        }
    }

    if (req.method === 'DELETE') {

        const { assignmentID } = req.query
        const assignment = await deleteAssignment(assignmentID)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to delete this assignment' })
        }

    }
    
    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler