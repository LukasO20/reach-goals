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

    const cookie = req.headers.cookie

    if (!cookie) throw unauthorized('Demo session not found. Unauthorized')

    const token = cookie
        .split(';')
        .find((item) => item.trim().startsWith('demo-session='))

    if (!token) throw unauthorized('Demo session not found. Unauthorized')

    const jwt = token.split('=')[1]

    const payload = verifyAccessToken(jwt)

    return payload
}
