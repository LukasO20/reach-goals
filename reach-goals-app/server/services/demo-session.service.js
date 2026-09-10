import { verifyAccessToken } from '../auth/jwt.js'
import { modelUserRegistry } from './model.service.js'

const ACTIONS_PASS = ['verification', 'send-code']

const QUOTAGOALEXCEEDED = 30
const QUOTAMODELEXCEEDED = 50

const unauthorized = (message) => {
    const error = new Error(message)
    error.status = 401
    return error
}

const tooManyRequests = (message) => {
    const error = new Error(message)
    error.status = 429
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

export const authenticateQuotaModel = async (
    visitorId = '',
    req = { method: 'PASS', url: '' }
) => {
    const url = /\/api\/([^?]+)/
    const type = req.url.match(url)[1]

    if (req.method !== 'POST') return true

    const quotaResult = await quotaModelGuard(visitorId)

    const isQuotaExceeded =
        (type === 'goal' && quotaResult.quotaExceeded.goal) ||
        (type === 'assignment' && quotaResult.quotaExceeded.assignment) ||
        (type === 'tag' && quotaResult.quotaExceeded.tag)

    if (isQuotaExceeded) {
        throw tooManyRequests(
            `Quota exceeded - goal: ${quotaResult.registry.goal}/${QUOTAGOALEXCEEDED}, assignment: ${quotaResult.registry.assignment}/${QUOTAMODELEXCEEDED}, tag: ${quotaResult.registry.tag}/${QUOTAMODELEXCEEDED}`
        )
    }

    return true
}

export const quotaModelGuard = async (visitorId = '') => {
    const registry = await modelUserRegistry(visitorId)

    const isGoalOver = registry.goal >= QUOTAGOALEXCEEDED
    const isAssignmentOver = registry.assignment > QUOTAMODELEXCEEDED
    const isTagOver = registry.tag > QUOTAMODELEXCEEDED

    return {
        quotaExceeded: {
            goal: isGoalOver,
            assignment: isAssignmentOver,
            tag: isTagOver,
        },
        registry,
    }
}
