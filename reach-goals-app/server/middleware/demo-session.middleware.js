import { verifyAccessToken } from '../auth/jwt.js'

const ACTIONS_PASS = ['demo-visitor-verification', 'demo-visitor']

const authenticateDemoSession = async (req, action = '') => {
    if (!req)
        throw new Error(
            'Request object is necessary - failed to process authenticate demo-session'
        )

    if (ACTIONS_PASS.includes(action)) return true

    const cookie = req.headers.cookie

    if (!cookie) throw new Error('Demo session not found. Unauthorized')

    const token = cookie
        .split(';')
        .find((item) => item.trim().startsWith('demo-session='))

    if (!token) throw new Error('Demo session not found. Unauthorized')

    const jwt = token.split('=')[1]

    const payload = verifyAccessToken(jwt)

    return payload
}

export const handlerAuthenticate = (handler) => {
    return async (req, res) => {
        try {
            const { action } = req.query

            await authenticateDemoSession(req, action)

            return handler(req, res)
        } catch (error) {
            if (error.status === 401) {
                return res.status(401).json({
                    message: error.message,
                })
            }

            return res.status(500).json({
                error: error.message,
            })
        }
    }
}
