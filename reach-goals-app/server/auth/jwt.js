import jwt from 'jsonwebtoken'

export const generateAccessToken = (session = {}) => {
    if (!session.demoVisitorId)
        throw new Error(
            `Failed to generate acess token. demoVisitorId is necessary - session: ${session}`
        )

    const sessionData = {
        sub: session.demoVisitorId,
        sid: session.id,
        type: 'demo-visitor',
    }

    return jwt.sign(sessionData, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
