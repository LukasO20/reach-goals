import { addAssignment } from './service.js'
import { formatObject } from '../utils/utils.js'
import moment from 'moment'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, duration, start, end, goalID, tags } = req.body
        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

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
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: Number(tag.tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData)
        const assignment = await addAssignment(formattedData)

        if (assignment) {
            return res.status(201).json(assignment)
        }
        else {
            return res.status(500).json({ error: 'Failed to create assignment' })
        }
    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler