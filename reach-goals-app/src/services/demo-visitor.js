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

export const getDemoVisitor = async (demoVisitorId) => {
    try {
        const url = `/api/demo-visitor/${demoVisitorId}`
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok)
            throw new Error(`Failed to get demo visitor: ${result.error}`)

        return result
    } catch (error) {
        throw new Error(`Error getting demo visitor: ${error.message}`)
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
            throw new Error(`Failed to send code: ${result.error}`)

        return result
    } catch (error) {
        throw new Error(`Error seinding code: ${error.message}`)
    }
}

export const demoVisitorVerify = async (data) => {
    try {
        const url = `/api/demo-visitor?action=verification`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
            credentials: 'same-origin',
        })

        const result = await response.json()
        if (!response.ok)
            throw new Error(`Failed to verify demo session: ${result.error}`)

        return result
    } catch (error) {
        throw new Error(`Error verifying demo visitor: ${error.message}`)
    }
}
