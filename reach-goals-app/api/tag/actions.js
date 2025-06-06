const prisma = require('../connectdb')

const formatObject = (objectData) => { //CREATE AN UNIQUE "formatObject" function and share it
    return Object.fromEntries(
        Object.entries(objectData).filter(([_, value]) => value !== undefined && value !== "")
    )
}

const addTag = async (req, res) => {
    if (req.method === 'POST') {
        const { name, color } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }
        if (!color) { return res.status(400).json({ error: 'Name is required.' }) }

        const rawObject = {
            name,
            color
        }

        const formattedData = formatObject(rawObject)
        console.log('Tag TO ADD - ', formattedData)

        try {
            const tag = await prisma.tag.create({
                data: formattedData
            })

            return res.status(201).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to create tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const updateTag = async (req, res) => {
    if (req.method === 'PUT') {
        const { id } = req.params
        const { name, color } = req.body

        if (!name) { return res.status(400).json({ error: 'Name is required.' }) }
        if (!color) { return res.status(400).json({ error: 'Name is required.' }) }

        const rawObject = {
            name,
            color
        }

        const formattedData = formatObject(rawObject)
        console.log('Goal TO UPDATE - ', formattedData)

        try {
            const tag = await prisma.tag.update({
                where: { id: Number(id) },
                data: formattedData,
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed updating tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const deleteTag = async (req, res) => {
    if (req.method === 'DELETE') {

        const { id } = req.params

        try {
            const tag = await prisma.tag.delete({
                where: { id: Number(id) }
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getTag = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { id } = req.params
            let tag = undefined

            if (id !== undefined && !isNaN(id)) {
                tag = await prisma.tag.findUnique({
                    where: { id: Number(id) },
                    include: { goals: true, assignments: true }
                })
            } else {
                tag = await prisma.tag.findMany({
                    include: { goals: true, assignments: true }
                })
            }

            return res.status(200).json(Array.isArray(tag) ? tag : [tag])

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getTagOnGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params

            if (!relationID || isNaN(relationID)) {
                return res.status(400).json({ error: "Parameter 'goalID' invalid." });
            }

            const tags = await prisma.tagOnGoal.findMany({
                where: { goalID: Number(relationID) },
                include: { tag: { select: { id: true, name: true, color: true } } }
            })

            return res.status(200).json(tags.map(tagRelation => tagRelation.tag))

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getTagOnAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params

            if (!relationID || isNaN(relationID)) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." });
            }

            const tags = await prisma.tagOnAssignment.findMany({
                where: { assignmentID: Number(relationID) },
                include: { tag: { select: { id: true, name: true, color: true } } }
            })

            return res.status(200).json(tags.map(tagRelation => tagRelation.tag))

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getTagNotGoal = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params

            if (!relationID || isNaN(relationID)) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." })
            }

            const tags = await prisma.tag.findMany({
                where: {
                    NOT: {
                        goals: {
                            some: { goalID: Number(relationID) }
                        }
                    }
                },
                select: { id: true, name: true, color: true }
            })

            return res.status(200).json(tags)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const getTagNotAssignment = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { relationID } = req.params

            if (!relationID || isNaN(relationID)) {
                return res.status(400).json({ error: "Parameter 'relationID' invalid." });
            }

            const tags = await prisma.tag.findMany({
                where: {
                    NOT: {
                        assignments: {
                            some: { assignmentID: Number(relationID) }
                        }
                    }
                },
                select: { id: true, name: true, color: true }
            })

            return res.status(200).json(tags)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to fetch tags' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const unlinkTagOnGoal = async (req, res) => {
    if (req.method === 'DELETE') {
        const { tagID, relationID } = req.params

        try {
            const tag = await prisma.tagOnGoal.delete({
                where: {
                    goalID_tagID: {
                        goalID: Number(relationID),
                        tagID: Number(tagID)
                    }
                }
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const unlinkAllTagOnGoal = async (req, res) => {
    if (req.method === 'DELETE') {
        const { id } = req.params

        try {
            const tag = await prisma.tagOnGoal.deleteMany({
                where: {
                    goalID: Number(id),
                }
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete these relations between tag and goal' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const unlinkTagOnAssignment = async (req, res) => {
    if (req.method === 'DELETE') {
        const { assignmentID, tagID } = req.params

        try {
            const tag = await prisma.tagOnAssignment.delete({
                where: {
                    assignmentID_tagID: {
                        assignmentID: Number(assignmentID),
                        tagID: Number(tagID)
                    }
                }
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete this tag' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

const unlinkAllTagOnAssignment = async (req, res) => {
    if (req.method === 'DELETE') {
        const { id } = req.params

        try {
            const tag = await prisma.tagOnAssignment.deleteMany({
                where: {
                    assignmentID: Number(id),
                }
            })

            return res.status(200).json(tag)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Failed to delete these relations between tag and assignment' })
        }

    } else { return res.status(405).json({ error: 'Method not allowed. Check the type of method sended' }) }
}

module.exports = { addTag, updateTag, deleteTag, getTag, getTagOnGoal, getTagOnAssignment, getTagNotGoal, getTagNotAssignment, unlinkTagOnGoal, unlinkTagOnAssignment, unlinkAllTagOnGoal, unlinkAllTagOnAssignment }