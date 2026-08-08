import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import { getDemoVisitor } from '../../server/services/demo-visitor.service.js'

const ALLOWED_METHODS = ['GET']

const handler = async (req, res) => {
    const { demoVisitorId } = req.query

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            const demoVisitor = await getDemoVisitor(demoVisitorId)
            return res.status(200).json(demoVisitor)
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
