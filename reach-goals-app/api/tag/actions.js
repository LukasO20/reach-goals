import {
    unlinkTagOnGoal, unlinkAllTagOnGoal, unlinkTagOnAssignment, unlinkAllTagOnAssignment,
    getTagNotAssignment, getTagNotGoal, getTagOnAssignment, getTagOnGoal, getTag, deleteTag, updateTag,
    addTag
} from './service.js'

import { formatObject } from '../utils/utils.js'

const handleAddTag = async (req, res) => {
    if (req.method === 'POST') {
        const { name, color } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }
        if (!color) { return res.status(400).json({ error: 'Name is required.' }) }

        const rawObject = { name, color }

        const formattedData = formatObject(rawObject)
        console.log('Tag TO ADD - ', formattedData)
        const tag = await addTag(formattedData)

        if (tag) {
            return res.status(201).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to create tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUpdateTag = async (req, res) => {
    if (req.method === 'PUT') {
        const { tagID } = req.params
        const { name, color } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }
        if (!color) { return res.status(400).json({ error: 'Name is required.' }) }

        const rawObject = { name, color }

        const formattedData = formatObject(rawObject)
        const tag = await updateTag(tagID, formattedData)
        console.log('Tag TO UPDATE - ', formattedData)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed updating tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleDeleteTag = async (req, res) => {
    if (req.method === 'DELETE') {
        const { tagID } = req.params
        const tag = await deleteTag(tagID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to delete this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetTag = async (req, res) => {
    if (req.method === 'GET') {
        const { tagID } = req.params
        const tag = await getTag(tagID)

        if (tag) {
            return res.status(200).json(Array.isArray(tag) ? tag : [tag])
        } else {
            return res.status(500).json({ error: 'Failed to get a tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetTagOnGoal = async (req, res) => {
    if (req.method === 'GET') {
        const { goalID } = req.params
        if (!goalID || isNaN(goalID)) {
            return res.status(400).json({ error: "Parameter 'goalID' invalid." });
        }

        const tag = await getTagOnGoal(goalID)

        if (tag) {
            return res.status(200).json(tag.map(tagRelation => tagRelation.tag))
        } else {
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetTagOnAssignment = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.params
        if (!assignmentID || isNaN(assignmentID)) {
            return res.status(400).json({ error: "Parameter 'assignmentID' invalid." });
        }

        const tag = await getTagOnAssignment(assignmentID)

        if (tag) {
            return res.status(200).json(tag.map(tagRelation => tagRelation.tag))
        } else {
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetTagNotGoal = async (req, res) => {
    if (req.method === 'GET') {
        const { goalID } = req.params
        if (!goalID || isNaN(goalID)) {
            return res.status(400).json({ error: "Parameter 'goalID' invalid." })
        }

        const tag = await getTagNotGoal(goalID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetTagNotAssignment = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.params
        if (!assignmentID || isNaN(assignmentID)) {
            return res.status(400).json({ error: "Parameter 'assignmentID' invalid." });
        }

        const tag = await getTagNotAssignment(assignmentID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUnlinkTagOnAssignment = async (req, res) => {
    if (req.method === 'DELETE') {
        const { tagID, assignmentID } = req.params
        const tag = await unlinkTagOnAssignment(tagID, assignmentID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to unlink this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUnlinkAllTagOnAssignment = async (req, res) => {
    if (req.method === 'DELETE') {
        const { assignmentID } = req.params
        const tag = await unlinkAllTagOnAssignment(assignmentID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to unlink this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUnlinkTagOnGoal = async (req, res) => {
    if (req.method === 'DELETE') {
        const { tagID, goalID } = req.params
        const tag = await unlinkTagOnGoal(tagID, goalID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to unlink this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUnlinkAllTagOnGoal = async (req, res) => {
    if (req.method === 'DELETE') {
        const { goalID } = req.params
        const tag = await unlinkAllTagOnGoal(goalID)

        if (tag) {
            return res.status(200).json(tag)
        } else {
            return res.status(500).json({ error: 'Failed to unlink these relations between tag and goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

export {
    handleUnlinkTagOnGoal, handleUnlinkAllTagOnGoal, handleUnlinkTagOnAssignment, handleUnlinkAllTagOnAssignment,
    handleGetTagNotAssignment, handleGetTagNotGoal, handleGetTagOnAssignment, handleGetTagOnGoal, handleGetTag, handleDeleteTag,
    handleUpdateTag, handleAddTag
}