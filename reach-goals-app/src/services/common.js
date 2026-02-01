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