import { getGoal, updateGoal, deleteGoal, handleUpdateTagOnGoal } from './service.js'
import { extractIds, formatObject } from '../utils/utils.js'

const handler = async (req, res) => {

    if (req.method === 'GET') {
        const { goalID } = req.query
        const goal = await getGoal(goalID)

        if (goal) {
            return res.status(200).json(Array.isArray(goal) ? goal : [goal])
        } else {
            return res.status(500).json({ error: 'Failed to get a goal' })
        }
    }

    if (req.method === 'PUT') {
        const { goalID } = req.query
        const { name, description, status, start, end, assignments, tags } = req.body

        const startDate = start ? start : new Date().toISOString()
        const endDate = end ? end : null

        const assignmentIds = extractIds(assignments, 'id')

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                set: assignmentIds?.map(id => ({ id }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal RECEVEID - ', rawObject)
        console.log('Goal TO UPDATE - ', formattedData)

        handleUpdateTagOnGoal(goalID, tags)
        const goal = await updateGoal(goalID, formattedData)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed updating goals' })
        }

    }

    if (req.method === 'DELETE') {
        const { goalID } = req.query
        const goal = await deleteGoal(goalID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to delete this goal' })
        }

    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler