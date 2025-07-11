import { buildQueryParamsMap } from "../../utils/mappingUtils.js"

const apiURL = window.location.origin.includes("localhost")
    ? "http://localhost:3000" //if vercel dev running use 3000 PORT, if npm start (use 5000 PORT API custom server)
    : window.location.origin

export const addTag = async (tag) => {
    try {
        const response = await fetch(`${apiURL}/api/tag`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add tag.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding tag: ', error.message)
        throw error
    }
}

export const updateTag = async (tag) => {
    try {
        const url = `${apiURL}/api/tag/${tag.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add tag.')
        }
    } catch (error) {
        console.error('Error update tag: ', error.message)
        throw error
    }
}

export const deleteTag = async (tagID) => {
    try {
        const url = `${apiURL}/api/tag/${tagID}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to delete tag.')
        }
    } catch (error) {
        console.error('Error delete tag: ', error.message)
        throw error
    }
}

export const getTag = async (tagID) => {
    try {
        const url = (tagID !== undefined && !isNaN(tagID))
            ? `${apiURL}/api/tag/${tagID}`
            : `${apiURL}/api/tag?action=tag-get`

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get tag: ', error.message)
        throw error
    }
}

export const getTagOnGoal = async (goalID) => {
    const queryParms = {
        action: 'tag-on-goal',
        IDobject: { 'goalID': goalID }
    }

    try {
        const response = await fetch(`${apiURL}/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch tags on goal.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get tag on goal: ', error.message)
        throw error
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-on-assignment',
        IDobject: { 'assignmentID': assignmentID }
    }

    try {
        const response = await fetch(`${apiURL}/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch tags on goal.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get tag on goal: ', error.message)
        throw error
    }
}

export const getTagNotGoal = async (goalID) => {
    const queryParms = {
        action: 'tag-not-goal',
        IDobject: { 'goalID': goalID }
    }

    try {
        const response = await fetch(`${apiURL}/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch tags.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get tag without relation: ', error.message)
        throw error
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-not-assignment',
        IDobject: { 'assignmentID': assignmentID }
    }

    try {
        const response = await fetch(`${apiURL}/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch tags.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get tag without relation: ', error.message)
        throw error
    }
}

export const unlinkTagOnGoal = async (tagID, goalID) => {
    try {
        const response = await fetch(`${apiURL}/api/tag/actions/unlink-goal/${tagID}/${goalID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to unlink this tag.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error to unlink tag: ', error.message)
        throw error
    }
}