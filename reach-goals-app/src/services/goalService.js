import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js' 

const apiURL = window.location.origin.includes("localhost")
    && "http://localhost:5000" //Standard URL to use with a local custom server. Insert it like ${apiURL}/api/...

export const addGoal = async (goal) => {
    try {
        const response = await fetch(`/api/goal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to add goal.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding goal: ', error.message)
        throw error
    }
}

export const updateGoal = async (goal) => {
    try {
        const url = `/api/goal/${goal.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to update goal.')

        return result
    } catch (error) {
        console.error('Error update goal: ', error.message)
        throw error
    }
}

export const deleteGoal = async (goalID) => {
    const queryParms = {
        action: 'tag-unlink-all-goal',
        IDobject: { 'goalID': goalID }
    }

    try {
        const urlUnlinkTag = `/api/tag?${buildQueryParamsMap(queryParms)}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const urlDeletGoal = `/api/goal/${goalID}`
        const responseGoal = await fetch(urlDeletGoal, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!responseUnlinkTag.ok) {
            const error = await responseUnlinkTag.json()
            throw new Error(error.error || 'Failed to unlink tags from goal.')
        }

        if (!responseGoal.ok) {
            const error = await responseGoal.json()
            throw new Error(error.error || 'Failed to delete goal.')
        }

    } catch (error) {
        console.error('Error delete goal: ', error.message)
        throw error
    }
}

export const getGoal = async (goalID) => {
    try {
        const url = (goalID)
            ? `/api/goal/${goalID}`
            : `/api/goal?action=goal-get`

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalOnTag = async (tagID) => {
    const queryParms = {
        action: 'goal-on-tag',
        IDobject: { 'tagID': tagID }
    }

    try {
        const url = `/api/goal?${buildQueryParamsMap(queryParms)}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalOnAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'goal-on-assignment',
        IDobject: { 'assignmentID': assignmentID }
    }

    try {
        const url = `/api/goal?${buildQueryParamsMap(queryParms)}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalWithoutAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'goal-not-assignment',
        IDobject: { 'assignmentID': assignmentID }
    }

    try {
        const url = `/api/goal?${buildQueryParamsMap(queryParms)}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}