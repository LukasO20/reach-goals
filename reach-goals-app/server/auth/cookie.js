import { stringifySetCookie } from 'cookie'

export const createAccessCookie = (token) => {
    return stringifySetCookie({
        name: 'demo-session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
    })
}
