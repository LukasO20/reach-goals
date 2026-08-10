import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js'

export const addTag = async (tag) => {
    try {
        const response = await fetch(`/api/tag`, {
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
        const url = `/api/tag/${tag.id}`
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
        const url = `/api/tag/${tagID}`
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
    try {
        const url = tagID ? `/api/tag/${tagID}` : `/api/tag?action=tag-get`

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
        action: 'tag-on-goal',
        IDobject: { goalID: goalID },
    }

    try {
        const response = await fetch(
            `/api/tag?${buildQueryParamsMap(queryParms)}`,
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
        console.error(`Error get tag on goal: ${error.message}`)
    }
}

export const getTagOnAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-on-assignment',
        IDobject: { assignmentID: assignmentID },
    }

    try {
        const response = await fetch(
            `/api/tag?${buildQueryParamsMap(queryParms)}`,
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

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Error get tag on goal: ${error.message}`)
    }
}

export const getTagNotGoal = async (goalID) => {
    const queryParms = {
        action: 'tag-not-goal',
        IDobject: { goalID: goalID },
    }

    try {
        const response = await fetch(
            `/api/tag?${buildQueryParamsMap(queryParms)}`,
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
        console.error(`Error get tag without relation: ${error.message}`)
    }
}

export const getTagNotAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-not-assignment',
        IDobject: { assignmentID: assignmentID },
    }

    try {
        const response = await fetch(
            `/api/tag?${buildQueryParamsMap(queryParms)}`,
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
