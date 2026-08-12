import { verifyAccessToken } from '../auth/jwt.js'

const ACTIONS_PASS = ['verification', 'send-code']

const unauthorized = (message) => {
    const error = new Error(message)
    error.status = 401
    return error
}

export const authenticateDemoSession = async (req, action = '') => {
    if (!req)
        throw new Error(
            'Request object is necessary - failed to process authenticate demo-session'
        )

    if (ACTIONS_PASS.includes(action)) return true

    const cookie = req.headers.cookie ?? ''

    const token = cookie
        .split(';')
        .find((item) => item.trim().startsWith('demo-session='))

    if (!token && action !== 'auth-session')
        throw unauthorized('Demo session not found. Unauthorized')

    if (!token && action === 'auth-session') return true

    const jwt = token.split('=')[1]

    const payload = verifyAccessToken(jwt)

    return payload
}
