import {
    addGoal, updateGoal, deleteGoal, getGoal, getGoalOnAssignment,
    getGoalOnTag, getGoalWithoutAssignment
} from './service.js'

import { formatObject } from '../utils/utils.js'

import moment from 'moment'

const extractIds = (arr, key = 'id') => {
    if (!Array.isArray(arr)) return []
    return arr.map(item => typeof item === 'object' ? Number(item[key]) : Number(item))
}

const handleAddGoal = async (req, res) => {
    if (req.method === 'POST') {
        const { name, description, status, start, end, assignments, tags } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }

        const startDate = start ? moment(start, 'DD/MM/YYYY').toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, 'DD/MM/YYYY').toISOString() : null

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignments.map(assignment =>
                ({
                    id: Number(assignment.id)
                }))
            },
            tags: {
                create: tags.map(tag => ({
                    tag: { connect: { id: Number(tag.tagID) } }
                }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal TO ADD - ', formattedData)
        const goal = await addGoal(formattedData)

        if (goal) {
            return res.status(201).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to create goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleUpdateGoal = async (req, res) => {
    if (req.method === 'PUT') {
        const { goalID } = req.params
        const { name, description, status, start, end, assignments, tags } = req.body

        const typeDate = ['DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD']
        const startDate = start ? moment(start, typeDate).toISOString() : new Date().toISOString()
        const endDate = end ? moment(end, typeDate).toISOString() : null

        const assignmentIds = extractIds(assignments, 'id')

        const rawObject = {
            name,
            description,
            status,
            start: startDate,
            end: endDate,
            assignments: {
                connect: assignmentIds?.map(id => ({ id }))
            }
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal RECEVEID - ', rawObject)
        console.log('Goal TO UPDATE - ', formattedData)

        helperUpdateTagOnGoal(goalID, tags)
        helperUpdateUnlinkTagOnGoal(goalID, tags)
        const goal = await updateGoal(goalID, formattedData)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed updating goals' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleDeleteGoal = async (req, res) => {
    if (req.method === 'DELETE') {
        const { goalID } = req.params
        const goal = await deleteGoal(goalID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to delete this goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetGoal = async (req, res) => {
    if (req.method === 'GET') {
        const { goalID } = req.params
        const goal = await getGoal(goalID)

        if (goal) {
            return res.status(200).json(Array.isArray(goal) ? goal : [goal])
        } else {
            return res.status(500).json({ error: 'Failed to get a goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetGoalOnAssignment = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.params
        const goal = await getGoalOnAssignment(assignmentID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to fetch goals on this assignment' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetGoalOnTag = async (req, res) => {
    if (req.method === 'GET') {
        const { tagID } = req.params
        const goal = await getGoalOnTag(tagID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to fetch goals with this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const handleGetGoalWithoutAssignment = async (req, res) => {
    if (req.method === 'GET') {
        const { assignmentID } = req.params
        const goal = await getGoalWithoutAssignment(assignmentID)

        if (goal) {
            return res.status(200).json(goal)
        } else {
            return res.status(500).json({ error: 'Failed to fetch goals on this assignment' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const helperUpdateTagOnGoal = async (goalID, tags) => {
    if (!goalID || !tags) return

    try {
        await prisma.tagOnGoal.deleteMany({
            where: { goalID: Number(goalID) }
        })

        await prisma.tagOnGoal.createMany({
            data: tags?.map(tag => ({
                goalID: Number(goalID),
                tagID: Number(tag.tagID)
            })),
            skipDuplicates: true
        })

    } catch (error) {
        console.error('Failed to update tags on goal:', error)
    }
}

const helperUpdateUnlinkTagOnGoal = async (goalID, tags) => {
    if (!Array.isArray(tags)) { return }

    const getTags = await prisma.tagOnGoal.findMany({
        where: {
            goalID: Number(goalID),
        }
    })

    const toUnlink = !tags.length ? getTags : getTags.filter(tag => !tags.includes(tag.id))

    //OBS: CRIE ENDPOINT COM INCIAL HANDLE (FAZ SENTIDO PRO HTTP)
    //HANDLE chama funções reutilizáveis
}

export {
    handleAddGoal, handleUpdateGoal, handleDeleteGoal, handleGetGoal, handleGetGoalOnAssignment,
    handleGetGoalOnTag, handleGetGoalWithoutAssignment
}