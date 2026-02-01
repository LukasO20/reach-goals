import { prisma } from '../connectdb.js'

const handler = async (req, res) => {
    const { action, params } = req.query

    if (req.method === 'GET') {

        try {
            let results = undefined

            if (action === 'search-model') {
                results = await searchResults(params)
                if (results) return res.status(200).json(results)
            }
        }
        catch (err) {
            return res.status(500).json({ error: err.message || 'Internal Server Error' })
        }
    }
}

const searchResults = async (params = '') => {

    if (!!params) {
        const fieldsCommon = { name: { contains: params, mode: 'insensitive' } }

        const [goals, assignments, tags] = await Promise.all([
            prisma.goal.findMany({
                where: { ...fieldsCommon }
            }),
            prisma.assignment.findMany({
                where: { ...fieldsCommon }
            }),
            prisma.tag.findMany({
                where: { ...fieldsCommon }
            })
        ])

        return { goals, assignments, tags }
    }

    return { goals: [], assignments: [], tags: [] }
}

export default handler