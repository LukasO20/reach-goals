import { handlerAuthenticate } from '../../server/middleware/demo-session.middleware.js'
import { searchResults } from '../../server/services/search.service.js'
import {
    removeModels,
    updateModelDragDrop,
    updateModelStatus,
} from '../../server/services/model.service.js'

const ALLOWED_METHODS = ['GET', 'PUT', 'DELETE']

const handler = async (req, res) => {
    const { action, params } = req.query
    const { data, typeModel, status } = req.body
    let results = undefined

    if (!ALLOWED_METHODS.includes(req.method)) {
        return res.status(405).json({
            error: 'Method not allowed. Check the type of method sended',
        })
    }

    try {
        if (req.method === 'GET') {
            if (action === 'search-model') {
                results = await searchResults(params)
                return res.status(200).json(results)
            }
        }

        if (req.method === 'PUT') {
            if (action === 'update-dragdrop') {
                results = await updateModelDragDrop(data, typeModel)
                return res.status(200).json(results)
            }

            if (action === 'update-status') {
                results = await updateModelStatus(data, status)
                return res.status(200).json(results)
            }
        }

        if (req.method === 'DELETE') {
            if (action === 'remove-models') {
                await removeModels(data)
                return res
                    .status(200)
                    .json({ message: 'Models removed successfully.' })
            }
        }
    } catch (error) {
        return res.status(500).json({
            service: `Common - ${action}`,
            error: error.message || 'Internal Server Error',
        })
    }
}

export default handlerAuthenticate(handler)
