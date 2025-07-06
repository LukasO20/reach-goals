import { getAssignment, updateAssignment, deleteAssignment, handleUpdateTagOnAssignment } from './service.js'
import { formatObject } from '../utils/utils.js'
import moment from 'moment'

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

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null
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
        console.log('Assignment RECEVEID - ', rawObject)
        console.log('Assignment TO UPDATE - ', formattedData)

        handleUpdateTagOnAssignment(assignmentID, tags)
        const assignment = await updateAssignment(assignmentID, formattedData)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed updating assignments' })
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