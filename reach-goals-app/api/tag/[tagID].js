import { getTag, updateTag, deleteTag } from './service.js'
import { formatObject } from '../utils/utils.js'

const handler = async (req, res) => {

    if (req.method === 'GET') {
        const { tagID } = req.query
        const tag = await getTag(tagID)

        if (tag) {
            return res.status(200).json(Array.isArray(tag) ? tag : [tag])
        } else {
            return res.status(500).json({ error: 'Failed to get a tag' })
        }

    }

    if (req.method === 'PUT') {
        const { tagID } = req.query
        const { name, color } = req.body

        if (!name || !color) { return res.status(400).json({ error: 'Name/Color is required.' }) }

        const rawObject = { name, color }

        const formattedData = formatObject(rawObject)
        const tag = await updateTag(tagID, formattedData)

        try {
            if (tag) return res.status(201).json(tag)
        }
        catch (err) {
            console.error('Error update tag:', err)
            return res.status(500).json({ error: err.message || 'Failed updating tags' })
        }
    }

    if (req.method === 'DELETE') {
        const { tagID } = req.query
        const tag = await deleteTag(tagID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to delete this tag' })
        }

    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler