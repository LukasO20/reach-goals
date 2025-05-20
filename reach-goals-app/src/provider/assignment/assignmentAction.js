const apiURL = window.location.origin.includes("localhost") ? "http://localhost:5000"
: window.location.origin

export const addAssignment = async (assignment) => {
    console.log('ASSIGNMENT RECEIVED - ', assignment)
    try {
        const response = await fetch(`${apiURL}/api/assignment/actions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment)
        })  

        if (!response.ok) {
            const error  = await response.json()
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
        const url = `${apiURL}/api/assignment/actions/${assignment.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignment)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add assignment.')
        }
    } catch (error) {
        console.error('Error update assignment: ', error.message)
        throw error
    }
}

export const deleteAssignment = async (id) => {
    try {
        const urlUnlinkTag = `${apiURL}/api/tag/actions/unlink-all-assignment/${id}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const urlDeletAssignment = `${apiURL}/api/assignment/actions/${id}`
        const response = await fetch(urlDeletAssignment, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!responseUnlinkTag.ok) {
            const error = await responseUnlinkTag.json()
            throw new Error(error.error || 'Failed to unlink tags from assignment.')
        }

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to delete assignment.')
        }
    } catch (error) {
        console.error('Error delete assignment: ', error.message)
        throw error
    }
}

export const getAssignment = async (id) => {
    try {
        const url = id ? `${apiURL}/api/assignment/actions/${id}` : `${apiURL}/api/assignment/actions`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch assignments.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get assignment: ', error.message)
        throw error
    }
}