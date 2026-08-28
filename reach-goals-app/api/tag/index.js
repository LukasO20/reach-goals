import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    addTag,
    getTag,
    getTagOnAssignment,
    getTagOnGoal,
} from '../../server/services/tag.service.js'
import { formatObject } from '../../server/utils/utils.js'

const ALLOWED_METHODS = ['GET', 'POST', 'DELETE']

const handler = async (req, res, authContext) => {
    const { action } = req.query

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
            const tag = await addTag({ data: formattedData, authContext })

            return res.status(201).json(tag)
        }

        if (req.method === 'GET') {
            let tag

            if (action === 'tag-get') {
                tag = await getTag({ authContext })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-goal') {
                tag = await getTagOnGoal({ authContext })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-assignment') {
                tag = await getTagOnAssignment({ authContext })
                return res.status(200).json(Array.isArray(tag) ? tag : [tag])
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
