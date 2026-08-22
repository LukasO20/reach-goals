import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js'

const BASE_URL = '/api/assignment'

export const addAssignment = async (assignment) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment),
            credentials: 'same-origin',
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return await response.json()
    } catch (error) {
        console.error(`Error adding assignment: ${error.message}`)
    }
}

export const updateAssignment = async (assignment) => {
    try {
        const url = `${BASE_URL}/${assignment.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok) throw new Error(error)

        return result
    } catch (error) {
        console.error(`Error update assignment: ${error.message}`)
    }
}

export const deleteAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-unlink-all-assignment',
        IDobject: { assignmentID: assignmentID },
    }

    try {
        const urlUnlinkTag = `/api/tag?${buildQueryParamsMap(queryParms)}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        const urlDeletAssignment = `${BASE_URL}/${assignmentID}`
        const response = await fetch(urlDeletAssignment, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        if (!responseUnlinkTag.ok) {
            const error = await responseUnlinkTag.json()
            throw new Error(
                error.error || 'Failed to unlink tags from assignment.'
            )
        }

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }
    } catch (error) {
        console.error(`Error delete assignment: ${error.message}`)
    }
}

export const getAssignment = async (assignmentID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: assignmentID,
        action: 'assignment-get',
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
        console.error(`Error get assignment: ${error.message}`)
    }
}

export const getAssignmentOnTag = async (tagID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: tagID,
        action: 'assignment-on-tag',
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
        console.error(`Error get assignment: ${error.message}`)
    }
}

export const getAssignmentOnGoal = async (goalID) => {
    const queryParms = {
        baseUrl: BASE_URL,
        id: goalID,
        action: 'assignment-on-goal',
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
        console.error(`Error get assignment: ${error.message}`)
    }
}

export const getAssignmentWithoutGoal = async () => {
    const queryParms = {
        baseUrl: BASE_URL,
        action: 'assignment-not-goal',
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
        console.error(`Error get assignment: ${error.message}`)
    }
}
