export const addMeta = async (meta) => {
    try {
        const response = await fetch('/api/meta/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meta)
        })

        if (!response.ok) {
            const error  = await response.json()
            throw new Error(error.error || 'Failed to add meta.')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error adding meta: ', error.message)
        throw error
    }
}