import { verifyAccessToken } from '../auth/jwt.js'

const ACTIONS_PASS = ['demo-visitor-verification', 'demo-visitor']

export const authenticateDemoSession = async (req, action = '') => {
    if (!req)
        throw new Error(
            'Request object is necessary - failed to process authenticate demo-session'
        )

    if (ACTIONS_PASS.includes(action)) return true

    const cookie = req.headers.cookie

    if (!cookie) throw new Error('Demo session not found')

    const token = cookie
        .split(';')
        .find((item) => item.trim().startsWith('demo-session='))

    if (!token) throw new Error('Demo session not found')

    const jwt = token.split('=')[1]

    const payload = verifyAccessToken(jwt)

    return payload
}
