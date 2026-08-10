import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    deleteTag,
    getTag,
    updateTag,
} from '../../server/services/tag.service.js'
import { formatObject } from '../../server/utils/utils.js'

const ALLOWED_METHODS = ['GET', 'PUT', 'DELETE']

const handler = async (req, res) => {
    const { tagID } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            const tag = await getTag(tagID)

            return res.status(200).json(Array.isArray(tag) ? tag : [tag])
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
            const tag = await updateTag(tagID, formattedData)

            return res.status(201).json(tag)
        }

        if (req.method === 'DELETE') {
            await deleteTag(tagID)
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
