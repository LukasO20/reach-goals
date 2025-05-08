const apiURL = window.location.origin.includes("localhost") ? "http://localhost:5000"
: window.location.origin

export const addGoal = async (goal) => {
    console.log('GOAL RECEIVED - ', goal)

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
        const url = `${apiURL}/api/goal/actions/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })  

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to delete goal.')
        }
    } catch (error) {
        console.error('Error delete goal: ', error.message)
        throw error
    }
}

export const getGoal = async (id) => {
    try {
        const url = id ? `${apiURL}/api/goal/actions/${id}` : `${apiURL}/api/goal/actions`
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