import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js'

const BASE_URL = '/api/goal'

export const addGoal = async (goal) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal),
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error adding goal: ${error.message}`)
    }
}

export const updateGoal = async (goal) => {
    try {
        const url = `${BASE_URL}/${goal.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok) throw new Error(error)

        return result
    } catch (error) {
        console.error(`Error update goal: ${error.message}`)
    }
}

export const deleteGoal = async (goalID) => {
    const queryParms = {
        action: 'tag-unlink-all-goal',
        IDobject: { goalID: goalID },
    }

    try {
        const urlUnlinkTag = `/api/tag?${buildQueryParamsMap(queryParms)}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        const urlDeletGoal = `${BASE_URL}/${goalID}`
        const responseGoal = await fetch(urlDeletGoal, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!responseUnlinkTag.ok) {
            const error = await responseUnlinkTag.json()
            throw new Error(error)
        }

        if (!responseGoal.ok) {
            const error = await responseGoal.json()
            throw new Error(error)
        }
    } catch (error) {
        console.error(`Error delete goal: ${error.message}`)
    }
}

export const getGoal = async (goalID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: goalID,
        action: 'goal-get',
    }

    try {
        const url = buildQueryParamsMap(queryParms)

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!response.ok) throw new Error(response.json())

        return await response.json()
    } catch (error) {
        console.error(`Error get goal: ${error.message}`)
    }
}

export const getGoalOnTag = async (tagID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: tagID,
        action: 'goal-on-tag',
    }

    try {
        const url = buildQueryParamsMap(queryParms)
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error get goal: ${error.message}`)
    }
}

export const getGoalOnAssignment = async (assignmentID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: assignmentID,
        action: 'goal-on-assignment',
    }

    try {
        const url = buildQueryParamsMap(queryParms)
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error get goal: ${error.message}`)
    }
}

export const getGoalWithoutAssignment = async (assignmentID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: assignmentID,
        action: 'goal-not-assignment',
    }

    try {
        const url = buildQueryParamsMap(queryParms)
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error get goal: ${error.message}`)
    }
}
