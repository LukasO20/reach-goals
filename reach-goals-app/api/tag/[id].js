import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    deleteTag,
    getTag,
    getTagNotAssignment,
    getTagNotGoal,
    getTagOnAssignment,
    getTagOnGoal,
    unlinkAllTagOnAssignment,
    unlinkAllTagOnGoal,
    updateTag,
} from '../../server/services/tag.service.js'
import { formatObject } from '../../server/utils/utils.js'

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
            let tag

            if (action === 'tag-get') {
                tag = await getTag({ tagID: id, authContext })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-goal') {
                tag = await getTagOnGoal({ goalID: id, authContext })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-assignment') {
                tag = await getTagOnAssignment({
                    assignmentID: id,
                    authContext,
                })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-not-goal') {
                tag = await getTagNotGoal({ goalID: id, authContext })
                return res.status(200).json(tag)
            }

            if (action === 'tag-not-assignment') {
                tag = await getTagNotAssignment({
                    assignmentID: id,
                    authContext,
                })
                return res.status(200).json(tag)
            }
        }

        if (req.method === 'PUT') {
            const { name, color } = req.body

            if (!name || !color) {
                return res
                    .status(400)
                    .json({ error: 'Name/Color is required.' })
            }

            const rawObject = { name, color }

            const formattedData = formatObject(rawObject)
            const tag = await updateTag({ tagID: id, data: formattedData })

            return res.status(201).json(tag)
        }

        if (req.method === 'DELETE') {
            let tag

            if (action === 'tag-unlink-all-goal') {
                tag = await unlinkAllTagOnGoal({ goalID: id })
                return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-all-assignment') {
                tag = await unlinkAllTagOnAssignment({ assignmentID: id })
                return res.status(200).json(tag)
            }

            await deleteTag({ tagID: id })
            return res.status(200).json({ message: 'Tag deleted successfully' })
        }
    } catch (error) {
        return res.status(500).json({
            service: `Tag - ${req.method}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
