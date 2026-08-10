import { authenticateDemoSession } from '../services/demo-session.service.js'

export const handlerAuthenticate = (handler) => {
    return async (req, res) => {
        try {
            const { action } = req.query

            await authenticateDemoSession(req, action)

            return handler(req, res)
        } catch (error) {
            const { message, status } = error

            if (status === 401) {
                return res.status(401).json({
                    service: 'DemoSession - authentication',
                    error: message,
                })
            }

            return res.status(500).json({
                service: 'DemoSession - authentication',
                error: message || 'Internal Server Error',
            })
        }
    }
}
