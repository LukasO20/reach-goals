export const searchResults = async (params = '') => {
    try {
        const url = `/api/common?action=search-model&params=${params}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch results.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error get search results: ', error.message)
        throw error
    }
}

export const updateModelDragDrop = async (data) => {
    try {
        const url = `/api/common?action=update-dragdrop`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to update models drag-drop.')

        return result
    } catch (error) {
        console.error('Error get search results: ', error.message)
        throw error
    }
}

export const removeModels = async (data) => {
    try {
        const url = `/api/common?action=remove-models`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to remove models.')

        return result
    } catch (error) {
        console.error('Error to remove models: ', error.message)
        throw error
    }
}

export const updateModelStatus = async (data, status) => {
    try {
        const url = `/api/common?action=update-status`
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data, status })
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Failed to update model status.')

        return result
    } catch (error) {
        console.error('Error updating model status: ', error.message)
        throw error
    }
}