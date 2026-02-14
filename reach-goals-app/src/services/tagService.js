import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js'

// const apiURL = window.location.origin.includes("localhost")
//     && "http://localhost:5000" //Standard URL to use with a local custom server. Insert it like ${apiURL}/api/...

export const addTag = async (tag) => {
    try {
        const response = await fetch(`/api/tag`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to add tag.')
        }

        return await response.json()
    } catch (error) {
        console.error('Error adding tag: ', error.message)
        throw error
    }
}

export const updateTag = async (tag) => {
    try {
        const url = `/api/tag/${tag.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to update tag.')

        return result
    } catch (error) {
        console.error('Error update tag: ', error.message)
        throw error
    }
}

export const deleteTag = async (tagID) => {
    try {
        const url = `/api/tag/${tagID}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to delete tag.')
        }
    } catch (error) {
        console.error('Error delete tag: ', error.message)
        throw error
    }
}

export const getTag = async (tagID) => {
    try {
        const url = (tagID)
            ? `/api/tag/${tagID}`
            : `/api/tag?action=tag-get`

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        return await response.json()
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
        const response = await fetch(`/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch tags on goal.')
        }

        return await response.json()
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
        const response = await fetch(`/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
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
        const response = await fetch(`/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch tags.')
        }

        return await response.json()
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
        const response = await fetch(`/api/tag?${buildQueryParamsMap(queryParms)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch tags.')
        }

        return await response.json()
    } catch (error) {
        console.error('Error get tag without relation: ', error.message)
        throw error
    }
}

export const unlinkTagOnGoal = async (tagID, goalID) => {
    try {
        const response = await fetch(`/api/tag/actions/unlink-goal/${tagID}/${goalID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to unlink this tag.')
        }

        return await response.json()
    } catch (error) {
        console.error('Error to unlink tag: ', error.message)
        throw error
    }
}