import { addGoal, getGoal, getGoalOnAssignment, getGoalOnTag, getGoalWithoutAssignment } from './service.js'
import { formatObject } from '../utils/utils.js'
import moment from 'moment'

const handler = async (req, res) => {
    const { action } = req.query

    if (req.method === 'POST') {
        const { name, description, status, start, end, assignments, tags } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignments.map(assignment =>
                ({
                    id: Number(assignment.id)
                }))
            },
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: Number(tag.tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal TO ADD - ', formattedData)
        const goal = await addGoal(formattedData)

        try {
            if (goal) return res.status(201).json(goal)
        }
        catch (err) {
            console.error('Error adding goal:', err)
            return res.status(500).json({ error: err.message || 'Failed to create goal' });
        }
    }

    if (req.method === 'GET') {
        let goal = undefined

        try {
            if (action === 'goal-get') {
                goal = await getGoal()

                if (goal) return res.status(200).json(Array.isArray(goal) ? goal : [goal])  
            }

            if (action === 'goal-on-assignment') {
                const { assignmentID } = req.query
                goal = await getGoalOnAssignment(assignmentID)

                if (goal) return res.status(200).json(goal)    
            }

            if (action === 'goal-on-tag') {
                const { tagID } = req.query
                goal = await getGoalOnTag(tagID)

                if (goal) return res.status(200).json(goal)
            }

            if (action === "goal-not-assignment") {
                const { assignmentID } = req.query
                goal = await getGoalWithoutAssignment(assignmentID)

                if (goal) return res.status(200).json(goal)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler