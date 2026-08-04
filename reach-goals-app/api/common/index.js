import { authenticateDemoSession } from '../../server/middleware/demo-session.middleware.js'
import { searchResults } from '../../server/services/search.service.js'
import {
    addDemoVisitorVerification,
    authenticateDemoVisitor,
    getDemoVisitorVerification,
} from '../../server/services/demo-visitor.service.js'
import {
    removeModels,
    updateModelDragDrop,
    updateModelStatus,
} from '../../server/services/model.service.js'

const handler = async (req, res) => {
    const { action, params } = req.query
    const { data, typeModel, status } = req.body
    let results = undefined

    try {
        await authenticateDemoSession(req, action)

        if (req.method === 'GET') {
            if (action === 'search-model') {
                results = await searchResults(params)
                if (results) return res.status(200).json(results)
            }
        }

        if (req.method === 'PUT') {
            if (action === 'update-dragdrop') {
                results = await updateModelDragDrop(data, typeModel)
                if (results) return res.status(200).json(results)
            }

            if (action === 'update-status') {
                results = await updateModelStatus(data, status)
                if (results) return res.status(200).json(results)
            }
        }

        if (req.method === 'POST') {
            if (action === 'demo-visitor') {
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

            if (action === 'demo-visitor-verification') {
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

        if (req.method === 'DELETE') {
            if (action === 'remove-models') {
                results = await removeModels(data)
                if (results) return res.status(200).json(results)
            }
        }
    } catch (error) {
        const responseStatus = res.status

        if (responseStatus === 401) {
            return res.status(401).json({
                restartDemo: true,
                message: 'Unauthorized. Demo session expired. Try a new login',
                error,
            })
        }

        return res.status(500).json({
            error:
                `Failed to process request - ${action}: ${error.message}` ||
                'Internal Server Error',
        })
    }
}

export default handler
