const apiURL = window.location.origin.includes("localhost") ? "http://localhost:5000"
: window.location.origin

export const addTag = async (tag) => {
    console.log('TAG RECEIVED - ', tag)

    try {
        const response = await fetch(`${apiURL}/api/tag/actions`, {
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
        const url = `${apiURL}/api/tag/actions/${tag.id}`
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

export const deleteTag = async (id) => {
    try {
        const url = `${apiURL}/api/tag/actions/${id}`
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

export const getTag = async (id) => {
    try {
        const url = id ? `${apiURL}/api/tag/actions/${id}` : `${apiURL}/api/tag/actions`
        const response = await fetch(url, {
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
        console.error('Error get tag: ', error.message)
        throw error
    }
}