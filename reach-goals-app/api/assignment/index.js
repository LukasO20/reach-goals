import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    addAssignment,
    getAssignment,
    getAssignmentOnGoal,
    getAssignmentOnTag,
    getAssignmentWithoutGoal,
} from '../../server/services/assignment.service.js'
import { formatObject } from '../../server/utils/utils.js'

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
            const {
                name,
                description,
                status,
                duration,
                start,
                end,
                goalID,
                tags,
            } = req.body

            if (!name) {
                return res.status(400).json({ error: 'Name is required.' })
            }

            const startDate = start ? start : new Date().toISOString()
            const endDate = end ? end : null
            const durationFormat = duration ? parseInt(duration) : null

            const rawObject = {
                name,
                description,
                status: status ?? 'progress',
                duration: durationFormat,
                start: startDate,
                end: endDate,
                goalID: goalID ? Number(goalID) : null,
                tags: tags?.length
                    ? {
                          create: tags.map((tag) => ({
                              tag: { connect: { id: Number(tag.tagID) } },
                          })),
                      }
                    : undefined,
            }

            const formattedData = formatObject(rawObject)
            const assignment = await addAssignment(formattedData)

            return res.status(201).json(assignment)
        }

        if (req.method === 'GET') {
            let assignment = undefined

            if (action === 'assignment-get') {
                assignment = await getAssignment(assignmentID)

                return res
                    .status(200)
                    .json(Array.isArray(assignment) ? assignment : [assignment])
            }

            if (action === 'assignment-on-goal') {
                assignment = await getAssignmentOnGoal(goalID)

                return res.status(200).json(assignment)
            }

            if (action === 'assignment-on-tag') {
                assignment = await getAssignmentOnTag(tagID)

                return res.status(200).json(assignment)
            }

            if (action === 'assignment-not-goal') {
                assignment = await getAssignmentWithoutGoal()

                return res.status(200).json(assignment)
            }
        }
    } catch (error) {
        return res.status(500).json({
            service: `Assignment - ${action}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
