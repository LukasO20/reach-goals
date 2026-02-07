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

        const goals = await prisma.goal.findMany({
            where: { ...fieldsCommon }
        })

        const assignments = await prisma.assignment.findMany({
            where: { ...fieldsCommon }
        })

        const tags = await prisma.tag.findMany({
            where: { ...fieldsCommon },
            include: {
                goals: {
                    include: {
                        goal: {
                            select: {
                                name: true,
                                status: true,
                            }
                        }
                    }
                },
                assignments: {
                    include: {
                        assignment: {
                            select: {
                                name: true,
                                status: true,
                            }
                        }
                    }
                }
            }
        })

        return { goals, assignments, tags }
    }

    return { goals: [], assignments: [], tags: [] }
}

export default handler