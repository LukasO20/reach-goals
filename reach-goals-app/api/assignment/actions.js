import {
    addAssignment, updateAssignment, deleteAssignment, getAssignment, getAssignmentOnGoal, getAssignmentOnTag,
    getAssignmentWithoutGoal, updateTagOnAssignment
} from './service.js'

import { formatObject } from '../utils/utils.js'

import moment from 'moment'

const handleAddAssignment = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, duration, start, end, goalID, tags } = req.body
        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null
        const durationFormat = duration ? parseInt(duration) : null

        const rawObject = {
            name,
            description,
            status,
            duration: durationFormat,
            start: startDate,
            end: endDate,
            goalID: goalID ? Number(goalID) : null,
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: Number(tag.tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('ASSIGN TO ADD - ', formattedData)
        const assignment = await addAssignment(formattedData)

        if (assignment) {
            return res.status(201).json(assignment)
        }
        else {
            return res.status(500).json({ error: 'Failed to create assignment' })
        }
    }
}

const handleUpdateAssignment = async (req, res) => {
    if (req.method === 'PUT') {
        const { assignmentID } = req.params
        const { name, description, status, duration, start, end, goalID, tags } = req.body

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null
        const durationFormat = duration ? parseInt(duration) : null

        const rawObject = {
            name,
            description,
            status,
            duration: durationFormat,
            start: startDate,
            end: endDate,
            goalID: goalID ? Number(goalID) : null,
        }

        const formattedData = formatObject(rawObject)
        console.log('Assignment RECEVEID - ', rawObject)
        console.log('Assignment TO UPDATE - ', formattedData)

        handleUpdateTagOnAssignment(assignmentID, tags)
        const assignment = await updateAssignment(assignmentID, formattedData)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed updating assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleDeleteAssignment = async (req, res) => {
    if (req.method === 'DELETE') {

        const { assignmentID } = req.params
        const assignment = await deleteAssignment(assignmentID)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to delete this assignment' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetAssignment = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.params
        const assignment = await getAssignment(assignmentID)

        if (assignment) {
            return res.status(200).json(Array.isArray(assignment) ? assignment : [assignment])
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetAssignmentOnGoal = async (req, res) => {
    if (req.method === 'GET') {
        const { goalID } = req.params
        const assignment = await getAssignmentOnGoal(goalID)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments with goals' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetAssignmentOnTag = async (req, res) => {
    if (req.method === 'GET') {
        const { tagID } = req.params
        const assignment = await getAssignmentOnTag(tagID)

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments with this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetAssignmentWithoutGoal = async (req, res) => {
    if (req.method === 'GET') {
        const assignment = await getAssignmentWithoutGoal()

        if (assignment) {
            return res.status(200).json(assignment)
        } else {
            return res.status(500).json({ error: 'Failed to fetch assignments without goals' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUpdateTagOnAssignment = async (assignmentID, tags) => {
    if (!assignmentID || !tags) return

    const assignment = await updateTagOnAssignment(assignmentID, tags)
    if (!assignment) {
        console.error("Failed to update this assignment's tag relation")
    }
}

export {
    handleAddAssignment, handleUpdateAssignment, handleDeleteAssignment, handleGetAssignment,
    handleGetAssignmentOnGoal, handleGetAssignmentOnTag, handleGetAssignmentWithoutGoal, handleUpdateTagOnAssignment
}