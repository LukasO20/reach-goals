import { buildQueryParamsMap } from '../utils/mapping/mapping-utils.js'

const BASE_URL = '/api/tag'

export const addTag = async (tag) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag),
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error adding tag: ${error.message}`)
    }
}

export const updateTag = async (tag) => {
    try {
        const url = `${BASE_URL}/${tag.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tag),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok) throw new Error(error)

        return result
    } catch (error) {
        console.error(`Error update tag: ${error.message}`)
    }
}

export const deleteTag = async (tagID) => {
    try {
        const url = `${BASE_URL}/${tagID}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }
    } catch (error) {
        console.error(`Error delete tag: ${error.message}`)
    }
}

export const getTag = async (tagID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: tagID,
        action: 'tag-get',
    }

    try {
        const url = buildQueryParamsMap(queryParms)

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        return await response.json()
    } catch (error) {
        console.error(`Error get tag: ${error.message}`)
    }
}

export const getTagOnGoal = async (goalID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: goalID,
        action: 'tag-on-goal',
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
        console.error(`Error get tag on goal: ${error.message}`)
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: assignmentID,
        action: 'tag-on-assignment',
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

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error get tag on goal: ${error.message}`)
    }
}

export const getTagNotGoal = async (goalID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: goalID,
        action: 'tag-not-goal',
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
        console.error(`Error get tag without relation: ${error.message}`)
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: assignmentID,
        action: 'tag-not-assignment',
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
        console.error(`Error get tag without relation: ${error.message}`)
    }
}

export const unlinkTagOnGoal = async (tagID, goalID) => {
    try {
        const response = await fetch(
            `/api/tag/actions/unlink-goal/${tagID}/${goalID}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
            }
        )

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error to unlink tag: ${error.message}`)
    }
}
