const apiURL = window.location.origin.includes("localhost") ? "http://localhost:5000"
: window.location.origin

export const addGoal = async (goal) => {

    try {
        const response = await fetch(`${apiURL}/api/goal/actions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal)
        })  

        if (!response.ok) {
            const error  = await response.json()
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
    console.log('GOAL FRONTEND TO SEND - ', goal)

    try {
        const url = `${apiURL}/api/goal/actions/${goal.id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal)
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add goal.')
        }
    } catch (error) {
        console.error('Error update goal: ', error.message)
        throw error
    }
}

export const deleteGoal = async (id) => {
    try {
        const urlUnlinkTag = `${apiURL}/api/tag/actions/unlink-all-goal/${id}`
        const responseUnlinkTag = await fetch(urlUnlinkTag, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const urlDeletGoal = `${apiURL}/api/goal/actions/${id}`
        const responseGoal = await fetch(urlDeletGoal, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!responseUnlinkTag.ok) {
            const error  = await responseUnlinkTag.json()
            throw new Error(error.error || 'Failed to unlink tags from goal.')
        }

        if (!responseGoal.ok) {
            const error  = await responseGoal.json()
            throw new Error(error.error || 'Failed to delete goal.')
        }

    } catch (error) {
        console.error('Error delete goal: ', error.message)
        throw error
    }
}

export const getGoal = async (id) => {
    try {

        const url = (id !== undefined && !isNaN(id))
            ? `${apiURL}/api/goal/actions/${id}`
            : `${apiURL}/api/goal/actions`

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalOnTag = async (id) => {
    try {
        const url = `${apiURL}/api/goal/actions/relation-tag/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalOnAssignment = async (id) => {
    try {
        const url = `${apiURL}/api/goal/actions/relation-assignment/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}

export const getGoalWithoutAssignment = async (id) => {
    try {
        const url = `${apiURL}/api/goal/actions/not-assignment/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to fetch goals.')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error get goal: ', error.message)
        throw error
    }
}