import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    addTag,
    getTag,
    getTagNotAssignment,
    getTagNotGoal,
    getTagOnAssignment,
    getTagOnGoal,
    unlinkAllTagOnAssignment,
    unlinkAllTagOnGoal,
    unlinkTagOnAssignment,
    unlinkTagOnGoal,
} from '../../server/services/tag.service.js'
import { formatObject } from '../utils/utils.js'

const ALLOWED_METHODS = ['GET', 'POST', 'DELETE']

const handler = async (req, res) => {
    const { action, assignmentID, goalID, tagID } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'POST') {
            const { name, color } = req.body

            if (!name || !color) {
                return res
                    .status(400)
                    .json({ error: 'Name/Color is required.' })
            }

            const rawObject = { name, color }

            const formattedData = formatObject(rawObject)
            const tag = await addTag(formattedData)

            return res.status(201).json(tag)
        }

        if (req.method === 'GET') {
            let tag = undefined

            if (action === 'tag-get') {
                tag = await getTag()
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-goal') {
                if (!goalID && isNaN(goalID))
                    return res
                        .status(400)
                        .json({ error: "Parameter 'goalID' invalid." })

                tag = await getTagOnGoal(goalID)

                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-assignment') {
                if (!assignmentID && isNaN(assignmentID))
                    return res.status(400).json({
                        error: "Parameter 'assignmentID' invalid.",
                    })

                tag = await getTagOnAssignment(assignmentID)

                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-not-goal') {
                if (!goalID || isNaN(goalID)) {
                    return res
                        .status(400)
                        .json({ error: "Parameter 'goalID' invalid." })
                }

                tag = await getTagNotGoal(goalID)

                return res.status(200).json(tag)
            }

            if (action === 'tag-not-assignment') {
                if (!assignmentID || isNaN(assignmentID)) {
                    return res.status(400).json({
                        error: "Parameter 'assignmentID' invalid.",
                    })
                }

                tag = await getTagNotAssignment(assignmentID)

                return res.status(200).json(tag)
            }
        }

        if (req.method === 'DELETE') {
            let tag = undefined
            if (action === 'tag-unlink-goal') {
                tag = await unlinkTagOnGoal(tagID, goalID)

                return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-all-goal') {
                tag = await unlinkAllTagOnGoal(goalID)

                return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-assignment') {
                tag = await unlinkTagOnAssignment(tagID, assignmentID)

                return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-all-assignment') {
                tag = await unlinkAllTagOnAssignment(assignmentID)

                return res.status(200).json(tag)
            }
        }
    } catch (error) {
        return res.status(500).json({
            error:
                `Failed to process request - ${action}: ${error.message}` ||
                'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
