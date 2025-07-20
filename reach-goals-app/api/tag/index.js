import { addTag, getTag, getTagOnGoal, getTagOnAssignment, getTagNotGoal, getTagNotAssignment, unlinkTagOnGoal, unlinkAllTagOnGoal, unlinkTagOnAssignment, unlinkAllTagOnAssignment } from './service.js'
import { formatObject } from '../utils/utils.js'

const handler = async (req, res) => {
    const { action } = req.query

    if (req.method === 'POST') {
        const { name, color } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }
        if (!color) { return res.status(400).json({ error: 'Name is required.' }) }

        const rawObject = { name, color }

        const formattedData = formatObject(rawObject)
        console.log('Tag TO ADD - ', formattedData)
        const tag = await addTag(formattedData)

        try {
            if (tag) return res.status(201).json(tag)
        }
        catch (err) {
            console.error('Error adding tag:', err)
            return res.status(500).json({ error: err.message || 'Failed to create tag' });
        }
    }

    if (req.method === 'GET') {
        let tag = undefined

        try {

            if (action === 'tag-get') {
                tag = await getTag()

                if (tag) return res.status(200).json(Array.isArray(tag) ? tag : [tag])
            }

            if (action === 'tag-on-goal') {
                const { goalID } = req.query
                if (!goalID || isNaN(goalID)) return res.status(400).json({ error: "Parameter 'goalID' invalid." });

                tag = await getTagOnGoal(goalID)

                if (tag) return res.status(200).json(tag.map(tagRelation => tagRelation.tag))
            }

            if (action === 'tag-on-assignment') {
                const { assignmentID } = req.query
                if (!assignmentID || isNaN(assignmentID)) return res.status(400).json({ error: "Parameter 'assignmentID' invalid." });


                tag = await getTagOnAssignment(assignmentID)

                if (tag) return res.status(200).json(tag.map(tagRelation => tagRelation.tag))
            }

            if (action === 'tag-not-goal') {
                const { goalID } = req.query
                if (!goalID || isNaN(goalID)) {
                    return res.status(400).json({ error: "Parameter 'goalID' invalid." })
                }

                tag = await getTagNotGoal(goalID)

                if (tag) return res.status(200).json(tag)
            }

            if (action === 'tag-not-assignment') {
                const { assignmentID } = req.query
                if (!assignmentID || isNaN(assignmentID)) {
                    return res.status(400).json({ error: "Parameter 'assignmentID' invalid." });
                }

                tag = await getTagNotAssignment(assignmentID)

                if (tag) return res.status(200).json(tag)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
    }

    if (req.method === 'DELETE') {
        let tag = undefined

        try {
            if (action === 'tag-unlink-goal') {
                const { tagID, goalID } = req.query
                tag = await unlinkTagOnGoal(tagID, goalID)

                if (tag) return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-all-goal') {
                const { goalID } = req.query
                tag = await unlinkAllTagOnGoal(goalID)

                if (tag) return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-assignment') {
                const { tagID, assignmentID } = req.query
                tag = await unlinkTagOnAssignment(tagID, assignmentID)

                if (tag) return res.status(200).json(tag)
            }

            if (action === 'tag-unlink-all-assignment') {
                const { assignmentID } = req.query
                tag = await unlinkAllTagOnAssignment(assignmentID)

                if (tag) return res.status(200).json(tag)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' })
}

export default handler