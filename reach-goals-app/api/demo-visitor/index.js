import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    addDemoVisitorVerification,
    authenticateDemoVisitor,
    getDemoVisitorVerification,
} from '../../server/services/demo-visitor.service.js'
import { authenticateDemoSession } from '../../server/services/demo-session.service.js'

const ALLOWED_METHODS = ['GET', 'POST']

const handler = async (req, res) => {
    const { action, demoVisitorId } = req.query
    const { data } = req.body
    let results = undefined

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            if (action === 'auth-session') {
                results = await authenticateDemoSession(req, action)
                return res.status(200).json(results)
            }
        }

        if (req.method === 'POST') {
            if (action === 'send-code') {
                const { email } = data

                if (!email)
                    throw new Error(
                        `Error to process data. Email is necessary. Data sended - email: ${email}`
                    )

                const demoVisitorVerification =
                    await getDemoVisitorVerification(email)

                const hasSomeValidCode = demoVisitorVerification.some(
                    (item) => new Date() < item.expiresAt
                )

                if (hasSomeValidCode) {
                    throw new Error(
                        'Error to validate your e-mail. A code already sended, check your e-mail'
                    )
                }

                const demoVisitorVerificationAdded =
                    await addDemoVisitorVerification(email)

                return res.status(200).json(demoVisitorVerificationAdded)
            }

            if (action === 'verification') {
                const { name, email, code } = data

                if (!name || !email)
                    throw new Error(
                        `Error to process data. Name and Email is necessary. Data sended - name: ${name}, email: ${email}`
                    )

                const demoVisitorVerification =
                    await getDemoVisitorVerification(email)

                const isEveryExpired = demoVisitorVerification.every(
                    (item) => new Date() > item.expiresAt
                )

                if (isEveryExpired)
                    throw new Error(
                        'Error to validate your e-mail. Code expired, try a new one'
                    )

                const isEveryInvalidCode = demoVisitorVerification.every(
                    (item) => item.code !== code
                )

                if (isEveryInvalidCode)
                    throw new Error(
                        'Error to validate your e-mail. Invalid code, we sent a code to your e-mail. Check it and try again'
                    )

                return await authenticateDemoVisitor(req, res, data)
            }
        }
    } catch (error) {
        return res.status(500).json({
            error:
                `Failed to process request - ${action}: ${error.message}` ||
                'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
