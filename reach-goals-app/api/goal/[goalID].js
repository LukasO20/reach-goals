import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    deleteGoal,
    getGoal,
    updateGoal,
    updateTagOnGoal,
} from '../../server/services/goal.service.js'
import { extractIds, formatObject } from '../utils/utils.js'

const handleUpdateTagOnGoal = async (goalID, tags) => {
    try {
        const hasInvalidTagRelation = !goalID || !tags || tags.length === 0
        if (hasInvalidTagRelation) return

        await updateTagOnGoal(goalID, tags)
    } catch (error) {
        throw new Error("Failed to update goal's tag relation")
    }
}

const ALLOWED_METHODS = ['GET', 'PUT', 'DELETE']

const handler = async (req, res) => {
    const { goalID } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            const goal = await getGoal(goalID)
            return res.status(200).json(Array.isArray(goal) ? goal : [goal])
        }

        if (req.method === 'PUT') {
            const { name, description, status, start, end, assignments, tags } =
                req.body

            if (!name) {
                return res.status(400).json({ error: 'Name is required.' })
            }

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
                    set: assignmentIds?.map((id) => ({ id })),
                },
            }

            const formattedData = formatObject(rawObject)

            await handleUpdateTagOnGoal(goalID, tags)
            const goal = await updateGoal(goalID, formattedData)

            return res.status(201).json(goal)
        }

        if (req.method === 'DELETE') {
            await deleteGoal(goalID)
            return res
                .status(200)
                .json({ message: 'Goal deleted successfully' })
        }
    } catch (error) {
        const responseStatus = res.status

        if (responseStatus === '401') {
            return res.status(401).json({
                restartDemo: true,
                message: 'Unauthorized. Demo session expired. Try a new login',
                error,
            })
        }

        return res.status(500).json({
            error:
                `Failed to process request - ${action}: ${error.message}` ||
                'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
