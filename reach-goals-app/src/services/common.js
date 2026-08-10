export const searchResults = async (params = '') => {
    try {
        const url = `/api/common?action=search-model&params=${params}`
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
            body: JSON.stringify(data),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok)
            throw new Error(
                result.error || 'Failed to update models drag-drop.'
            )

        return result
    } catch (error) {
        throw new Error(`Error get search results: ${error.message}`)
    }
}

export const removeModels = async (data) => {
    try {
        const url = `/api/common?action=remove-models`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok) throw new Error(error)

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
            body: JSON.stringify({ data, status }),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok) throw new Error(error)

        return result
    } catch (error) {
        throw new Error('Error updating model status: ', error.message)
    }
}
