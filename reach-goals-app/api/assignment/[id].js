import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    deleteAssignment,
    getAssignment,
    getAssignmentOnGoal,
    getAssignmentOnTag,
    updateAssignment,
    updateTagOnAssignment,
} from '../../server/services/assignment.service.js'
import { formatObject } from '../../server/utils/utils.js'

const ALLOWED_METHODS = ['GET', 'PUT', 'DELETE']

const handleUpdateTagOnAssignment = async (assignmentID, tags) => {
    try {
        const hasInvalidTagRelation =
            !assignmentID || !tags || tags.length === 0
        if (hasInvalidTagRelation) return

        await updateTagOnAssignment({ assignmentID, tags })
    } catch (error) {
        throw new Error(
            `Failed to update assignment's tag relation: ${error.message}`
        )
    }
}

const handler = async (req, res, authContext) => {
    const { action, id } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            let assignment

            if (action === 'assignment-get') {
                assignment = await getAssignment({
                    assignmentID: id,
                    authContext,
                })
                return res
                    .status(200)
                    .json(Array.isArray(assignment) ? assignment : [assignment])
            }

            if (action === 'assignment-on-goal') {
                assignment = await getAssignmentOnGoal({
                    goalID: id,
                    authContext,
                })
                return res.status(200).json(assignment)
            }

            if (action === 'assignment-on-tag') {
                assignment = await getAssignmentOnTag({
                    tagID: id,
                    authContext,
                })
                return res.status(200).json(assignment)
            }
        }

        if (req.method === 'PUT') {
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
                status,
                duration: durationFormat,
                start: startDate,
                end: endDate,
                goalID: goalID ? goalID : null,
            }

            const formattedData = formatObject(rawObject)

            await handleUpdateTagOnAssignment(id, tags)
            const assignment = await updateAssignment({
                assignmentID: id,
                data: formattedData,
            })

            return res.status(201).json(assignment)
        }

        if (req.method === 'DELETE') {
            await deleteAssignment({ assignmentID: id })
            return res
                .status(200)
                .json({ message: 'Assignment deleted successfully' })
        }
    } catch (error) {
        return res.status(500).json({
            service: `Assignment - ${req.method}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
