import { buildQueryParamsMap } from "../../utils/mappingUtils.js"

const apiURL = window.location.origin.includes("localhost")
    ? "http://localhost:3000" //if vercel dev running use 3000 PORT, if npm start (use 5000 PORT API custom server)
    : window.location.origin

export const addGoal = async (goal) => {
    try {
        const response = await fetch(`${apiURL}/api/goal`, {
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
        const url = `${apiURL}/api/goal/${goal.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to add goal.')
        }
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
        const urlUnlinkTag = `${apiURL}/api/tag?${buildQueryParamsMap(queryParms)}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const urlDeletGoal = `${apiURL}/api/goal/${goalID}`
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
        const url = (goalID !== undefined && !isNaN(goalID))
            ? `${apiURL}/api/goal/${goalID}`
            : `${apiURL}/api/goal?action=goal-get`

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
        const url = `${apiURL}/api/goal?${buildQueryParamsMap(queryParms)}`
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
        const url = `${apiURL}/api/goal?${buildQueryParamsMap(queryParms)}`
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
        const url = `${apiURL}/api/goal?${buildQueryParamsMap(queryParms)}`
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