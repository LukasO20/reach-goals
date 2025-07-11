import { addAssignment, getAssignment, getAssignmentOnGoal, getAssignmentOnTag, getAssignmentWithoutGoal } from './service.js'
import { formatObject } from '../utils/utils.js'
import moment from 'moment'

const handler = async (req, res) => {
    const { action } = req.query

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

    if (req.method === 'GET') {
        let assignment = undefined

        if (action === 'assignment-get') {
            assignment = await getAssignment()
            if (assignment) {
                return res.status(200).json(Array.isArray(assignment) ? assignment : [assignment])
            } else {
                return res.status(500).json({ error: 'Failed to fetch assignments' })
            }
        }

        if (action === 'assignment-on-goal') {
            const { goalID } = req.query
            assignment = await getAssignmentOnGoal(goalID)

            if (assignment) {
                return res.status(200).json(assignment)
            } else {
                return res.status(500).json({ error: 'Failed to fetch assignments with goals' })
            }
        }

        if (action === 'assignment-on-tag') {
            const { tagID } = req.query
            assignment = await getAssignmentOnTag(tagID)

            if (assignment) {
                return res.status(200).json(assignment)
            } else {
                return res.status(500).json({ error: 'Failed to fetch assignments with this tag' })
            }
        }

        if (action === 'assignment-not-goal') {
            assignment = await getAssignmentWithoutGoal()
            if (assignment) {
                return res.status(200).json(assignment)
            } else {
                return res.status(500).json({ error: 'Failed to fetch assignments without goals' })
            }
        }
    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler