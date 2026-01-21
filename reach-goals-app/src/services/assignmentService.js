import { buildQueryParamsMap } from '../utils/mapping/mappingUtils.js'

// const apiURL = window.location.origin.includes("localhost")
//     && "http://localhost:5000" //Standard URL to use with a local custom server. Insert it like ${apiURL}/api/...

export const addAssignment = async (assignment) => {
    try {
        const response = await fetch(`/api/assignment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to add assignment.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding assignment: ', error.message)
        throw error
    }
}

export const updateAssignment = async (assignment) => {
    try {
        const url = `/api/assignment/${assignment.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to update assignment.')

        return result
    } catch (error) {
        console.error('Error update assignment: ', error.message)
        throw error
    }
}

export const deleteAssignment = async (assignmentID) => {
    const queryParms = {
        action: 'tag-unlink-all-assignment',
        IDobject: { 'assignmentID': assignmentID }
    }

    try {
        const urlUnlinkTag = `/api/tag?${buildQueryParamsMap(queryParms)}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const urlDeletAssignment = `/api/assignment/${assignmentID}`
        const response = await fetch(urlDeletAssignment, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!responseUnlinkTag.ok) {
            const error = await responseUnlinkTag.json()
            throw new Error(error.error || 'Failed to unlink tags from assignment.')
        }

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to delete assignment.')
        }
    } catch (error) {
        console.error('Error delete assignment: ', error.message)
        throw error
    }
}

export const getAssignment = async (assignmentID) => {
    try {
        const url = (assignmentID)
            ? `/api/assignment/${assignmentID}`
            : `/api/assignment?action=assignment-get`

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch assignments.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get assignment: ', error.message)
        throw error
    }
}

export const getAssignmentOnTag = async (tagID) => {
    const queryParms = {
        action: 'assignment-on-tag',
        IDobject: { 'tagID': tagID }
    }

    try {
        const url = `/api/assignment?${buildQueryParamsMap(queryParms)}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch assignments.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get assignment: ', error.message)
        throw error
    }
}

export const getAssignmentOnGoal = async (goalID) => {
    const queryParms = {
        action: 'assignment-on-goal',
        IDobject: { 'goalID': goalID }
    }

    try {
        const url = `/api/assignment?${buildQueryParamsMap(queryParms)}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch assignments.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get assignment: ', error.message)
        throw error
    }
}

export const getAssignmentWithoutGoal = async () => {
    try {
        const url = `/api/assignment?action=assignment-not-goal`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch assignments.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get assignment: ', error.message)
        throw error
    }
}