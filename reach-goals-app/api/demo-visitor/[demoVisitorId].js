import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import {
    getDemoVisitor,
    logoutDemoVisitor,
} from '../../server/services/demo-visitor.service.js'

import { formatObject } from '../../server/utils/utils.js'

const ALLOWED_METHODS = ['GET', 'PUT']

const handler = async (req, res) => {
    const { action, demoVisitorId } = req.query

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

        if (req.method === 'PUT') {
            if (action === 'logout-session') {
                return await logoutDemoVisitor(res, demoVisitorId)
            }
        }
    } catch (error) {
        return res.status(500).json({
            service: `DemoVisitor - ${req.method}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
