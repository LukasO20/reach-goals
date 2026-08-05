import {
    addGoal,
    getGoal,
    getGoalOnAssignment,
    getGoalOnTag,
    getGoalWithoutAssignment,
} from '../../server/services/goal.service.js'
import { formatObject } from '../utils/utils.js'

const ALLOWED_METHODS = ['GET', 'POST']

const handler = async (req, res) => {
    const { action, assignmentID, goalID, tagID } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'POST') {
            const { name, description, status, start, end, assignments, tags } =
                req.body

            if (!name) {
                return res.status(400).json({ error: 'Name is required.' })
            }

            const startDate = start ? start : new Date().toISOString()
            const endDate = end ? end : null

            const rawObject = {
                name,
                description,
                status: status ?? 'progress',
                start: startDate,
                end: endDate,
                assignments: assignments?.length
                    ? {
                          connect: assignments.map((assignment) => ({
                              id: Number(assignment.id),
                          })),
                      }
                    : undefined,
                tags: tags?.length
                    ? {
                          create: tags.map((tag) => ({
                              tag: { connect: { id: Number(tag.tagID) } },
                          })),
                      }
                    : undefined,
            }

            const formattedData = formatObject(rawObject)
            const goal = await addGoal(formattedData)

            return res.status(201).json(goal)
        }

        if (req.method === 'GET') {
            let goal = undefined

            if (action === 'goal-get') {
                goal = await getGoal(goalID)

                return res.status(200).json(Array.isArray(goal) ? goal : [goal])
            }

            if (action === 'goal-on-assignment') {
                goal = await getGoalOnAssignment(assignmentID)

                return res.status(200).json(goal)
            }

            if (action === 'goal-on-tag') {
                goal = await getGoalOnTag(tagID)

                return res.status(200).json(goal)
            }

            if (action === 'goal-not-assignment') {
                goal = await getGoalWithoutAssignment(assignmentID)

                return res.status(200).json(goal)
            }
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

export default handler
