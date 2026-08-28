import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    deleteGoal,
    getGoal,
    getGoalOnAssignment,
    getGoalOnTag,
    getGoalWithoutAssignment,
    updateGoal,
    updateTagOnGoal,
} from '../../server/services/goal.service.js'
import { extractIds, formatObject } from '../../server/utils/utils.js'

const handleUpdateTagOnGoal = async (goalID, tags) => {
    try {
        const hasInvalidTagRelation = !goalID || !tags || tags.length === 0
        if (hasInvalidTagRelation) return

        await updateTagOnGoal({ goalID, tags })
    } catch (error) {
        throw new Error("Failed to update goal's tag relation")
    }
}

const ALLOWED_METHODS = ['GET', 'PUT', 'DELETE']

const handler = async (req, res, authContext) => {
    const { action, id } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            let goal

            if (action === 'goal-get') {
                goal = await getGoal({ goalID: id, authContext })
                return res.status(200).json(Array.isArray(goal) ? goal : [goal])
            }

            if (action === 'goal-on-assignment') {
                goal = await getGoalOnAssignment({
                    assignmentID: id,
                    authContext,
                })
                return res.status(200).json(goal)
            }

            if (action === 'goal-on-tag') {
                goal = await getGoalOnTag({ tagID: id, authContext })
                return res.status(200).json(goal)
            }

            if (action === 'goal-not-assignment') {
                goal = await getGoalWithoutAssignment({
                    assignmentID: id,
                    authContext,
                })
                return res.status(200).json(goal)
            }
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

            await handleUpdateTagOnGoal(id, tags)
            const goal = await updateGoal({ goalID: id, data: formattedData })

            return res.status(201).json(goal)
        }

        if (req.method === 'DELETE') {
            await deleteGoal({ goalID: id })
            return res
                .status(200)
                .json({ message: 'Goal deleted successfully' })
        }
    } catch (error) {
        return res.status(500).json({
            service: `Goal - ${req.method}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
