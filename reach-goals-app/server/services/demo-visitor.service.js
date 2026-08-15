import prisma from '../config/connectdb.js'

import { generateAccessToken } from '../auth/jwt.js'
import { createAccessCookie, removeAccessCookie } from '../auth/cookie.js'
import { generateVerificationCode } from '../utils/utils.js'
import { sendEmail } from './email.service.js'

const TEN_MINUTES = 10 * 60 * 1000
const ONE_DAY = 24 * 60 * 60 * 1000

export const addDemoVisitorVerification = async (email = '') => {
    if (!email)
        throw new Error(
            `Email is necessary - email: ${email}, failed to process create demo-visitor-verification data`
        )

    try {
        return await prisma.$transaction(async (tx) => {
            const code = generateVerificationCode()
            const verificationCreated = await tx.demoVisitorVerification.create(
                {
                    data: {
                        email,
                        code,
                        expiresAt: new Date(Date.now() + TEN_MINUTES),
                    },
                }
            )

            if (!verificationCreated)
                throw new Error(
                    'Error to add demo-visitor-verification: Internal server error'
                )

            const emailSended = await sendEmail(email, code)

            return {
                email: verificationCreated.email,
                expiresAt: verificationCreated.expiresAt,
            }
        })
    } catch (error) {
        throw new Error(
            `Error to add a demo-visitor-verification: ${error.message}`
        )
    }
}

export const getDemoVisitorVerification = async (email = '') => {
    try {
        return await prisma.demoVisitorVerification.findMany({
            where: { email: email },
        })
    } catch (error) {
        throw new Error(`Error to get a demo-visitor-verification: ${error}`)
    }
}

export const getDemoVisitor = async (demoVisitorID) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const demoVisitor = await tx.demoVisitor.findUnique({
                where: { id: Number(demoVisitorID) },
            })

            const demoVisitorSession = await tx.demoVisitorSession.findUnique({
                where: { demoVisitorId: demoVisitor.id },
            })

            return {
                visitor: demoVisitor,
                session: demoVisitorSession,
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateDemoVisitorStatus = async (demoVisitorID, data) => {
    const { status } = data

    if (!demoVisitorID || !status)
        throw new Error(
            `Status and demoVisitorID are necessary - status: ${status}, demoVisitorID: ${demoVisitorID}, failed to process update demo-visitor-session data`
        )

    try {
        return await prisma.$transaction(async (tx) => {
            const demoVisitor = await tx.demoVisitor.findUnique({
                where: { id: Number(demoVisitorID) },
            })

            const demoVisitorSession = await tx.demoVisitorSession.update({
                where: { demoVisitorId: demoVisitor.id },
                data: {
                    status: status,
                },
            })

            return {
                visitor: demoVisitor,
                session: demoVisitorSession,
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

const addDemoVisitor = async (data) => {
    const { name, email } = data

    if (!name || !email)
        throw new Error(
            `Name and Email are necessary - name: ${name}, email: ${email},
            failed to process create demo-visitor-verification data`
        )

    try {
        return await prisma.$transaction(async (tx) => {
            const demoVisitor = await tx.demoVisitor.upsert({
                where: { email },
                create: { name, email },
                update: {},
            })

            const isDemoVisitorCreated = demoVisitor.id
            if (isDemoVisitorCreated) {
                await updateDemoVisitorStatus(demoVisitor.id, {
                    status: 'ACTIVE',
                })
            }

            const expiresAt = new Date(Date.now() + ONE_DAY)

            const demoVisitorSession = await tx.demoVisitorSession.upsert({
                where: { demoVisitorId: demoVisitor.id },
                create: {
                    demoVisitorId: demoVisitor.id,
                    status: 'ACTIVE',
                    expiresAt,
                },
                update: {
                    status: 'ACTIVE',
                    expiresAt,
                },
            })

            await tx.demoVisitorVerification.deleteMany({
                where: { email },
            })

            return {
                visitor: demoVisitor,
                session: demoVisitorSession,
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}

export const authenticateDemoVisitor = async (res, visitor) => {
    const demo = await addDemoVisitor(visitor)

    const token = generateAccessToken(demo.session)

    const cookie = createAccessCookie(token)

    res.setHeader('Set-Cookie', cookie)

    return res.status(200).json({
        visitorName: demo.visitor.name,
        visitorEmail: demo.visitor.email,
        expiresAt: demo.session.expiresAt,
    })
}

export const logoutDemoVisitor = async (res, demoVisitorID) => {
    const demo = await updateDemoVisitorStatus(Number(demoVisitorID), {
        status: 'EXPIRED',
    })

    const cookie = removeAccessCookie()

    res.setHeader('Set-Cookie', cookie)

    return res.status(200).json({
        visitorName: demo.visitor.name,
        visitorEmail: demo.visitor.email,
        status: demo.session.status,
    })
}
