export const getAuthenticateDemoSession = async () => {
    try {
        const url = `/api/demo-visitor?action=auth-session`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok)
            throw new Error(
                `Failed to get authenticated demo session: ${result.error}`
            )

        return result
    } catch (error) {
        throw new Error(
            `Error getting authenticated demo session: ${error.message}`
        )
    }
}

export const demoVisitorStart = async (data) => {
    try {
        const url = `/api/demo-visitor?action=send-code`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok)
            throw new Error(result.error || 'Failed to save a demo visitor.')

        return result
    } catch (error) {
        throw new Error('Error save a demo visitor: ', error.message)
    }
}
