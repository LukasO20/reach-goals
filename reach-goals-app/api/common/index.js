import prisma from '../connectdb.js'

import {
    generateVerificationCode,
    sendEmail,
    TEN_MINUTES,
    TWENTY_FOUR_HOURS,
} from '../utils/utils.js'

const searchResults = async (params = '') => {
    if (params) {
        const fieldsCommon = { name: { contains: params, mode: 'insensitive' } }

        const goals = await prisma.goal.findMany({
            where: { ...fieldsCommon },
        })

        const assignments = await prisma.assignment.findMany({
            where: { ...fieldsCommon },
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
                            },
                        },
                    },
                },
                assignments: {
                    include: {
                        assignment: {
                            select: {
                                name: true,
                                status: true,
                            },
                        },
                    },
                },
            },
        })

        return { goals, assignments, tags }
    }

    return { goals: [], assignments: [], tags: [] }
}

const updateModelDragDrop = async (data = [], typeModel = '') => {
    const allowTypesModel = ['goal', 'assignment']

    if (allowTypesModel.includes(typeModel)) {
        try {
            return await prisma.$transaction(
                data.map((item) =>
                    prisma[typeModel].update({
                        where: { id: item.id },
                        data: { order: item.order, status: item.status },
                    })
                )
            )
        } catch (err) {
            return console.error('Error update status and order model:', err)
        }
    }

    return console.error(
        `Something went wrong during update drag drop model: type is ${typeModel}. Send 'goal' or 'assignment'`
    )
}

const removeModels = async (data = []) => {
    try {
        const [
            removedTagOnGoal,
            removedTagOnAssignment,
            removedTags,
            removedGoals,
            removedAssignments,
        ] = await prisma.$transaction([
            prisma.tagOnGoal.deleteMany({
                where: {
                    goalID: { in: data },
                },
            }),
            prisma.tagOnAssignment.deleteMany({
                where: {
                    assignmentID: { in: data },
                },
            }),
            prisma.tag.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
            prisma.goal.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
            prisma.assignment.deleteMany({
                where: {
                    id: { in: data },
                },
            }),
        ])

        const totalDeleted = [
            removedTagOnGoal,
            removedTagOnAssignment,
            removedTags,
            removedGoals,
            removedAssignments,
        ].reduce((sum, item) => sum + item.count, 0)

        return totalDeleted > 0
    } catch (error) {
        console.error('Error removing models:', error)
        throw error
    }
}

const updateModelStatus = async (ids = [], status = '') => {
    const allowStatus = ['progress', 'conclude', 'cancel']

    if (allowStatus.includes(status)) {
        try {
            const statusGoal = await prisma.goal.updateMany({
                where: { id: { in: ids } },
                data: { status },
            })

            const statusAssignment = await prisma.assignment.updateMany({
                where: { id: { in: ids } },
                data: { status },
            })

            return { goal: statusGoal, assignment: statusAssignment }
        } catch (err) {
            return console.error('Error updating model status:', err)
        }
    }
}

const addDemoVisitorVerification = async (email = '') => {
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
                verification: verificationCreated,
            }
        })
    } catch (error) {
        throw new Error(
            `Error to add a demo-visitor-verification: ${error.message}`
        )
    }
}

const getDemoVisitorVerification = async (email = '') => {
    try {
        return await prisma.demoVisitorVerification.findUnique({
            where: { email: email },
        })
    } catch (error) {
        throw new Error('Error to get a demo-visitor-verification: ', error)
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
            const demoVisitor = await tx.demoVisitor.create({
                data: {
                    name,
                    email,
                },
            })

            const demoVisitorSession = await tx.demoVisitorSession.create({
                data: {
                    demoVisitorId: demoVisitor.id,
                    status: 'ACTIVE',
                    expiresAt: new Date(Date.now() + TWENTY_FOUR_HOURS),
                },
            })

            const verificationCreatedDeleted =
                await tx.demoVisitorVerification.delete({
                    where: { email },
                })

            if (!verificationCreatedDeleted)
                throw new Error(
                    `Error to delete a demo-visitor-verification: ${error.message}`
                )

            return {
                visitor: demoVisitor,
                session: demoVisitorSession,
            }
        })
    } catch (error) {
        throw new Error(`Error to add a demo-visitor: ${error.message}`)
    }
}

const handler = async (req, res) => {
    const { action, params } = req.query
    const { data, typeModel, status } = req.body
    let results = undefined

    if (req.method === 'GET') {
        try {
            if (action === 'search-model') {
                results = await searchResults(params)
                if (results) return res.status(200).json(results)
            }
        } catch (err) {
            return res
                .status(500)
                .json({ error: err.message || 'Internal Server Error' })
        }
    }

    if (req.method === 'PUT') {
        try {
            if (action === 'update-dragdrop') {
                results = await updateModelDragDrop(data, typeModel)
                if (results) return res.status(200).json(results)
            }

            if (action === 'update-status') {
                results = await updateModelStatus(data, status)
                if (results) return res.status(200).json(results)
            }
        } catch (err) {
            return res
                .status(500)
                .json({ error: err.message || 'Internal Server Error' })
        }
    }

    if (req.method === 'POST') {
        try {
            if (action === 'demo-visitor') {
                const { email } = data

                if (!email)
                    throw new Error(
                        `Error to process data. Email is necessary. Data sended - email: ${email}`
                    )

                const demoVisitorVerification =
                    await getDemoVisitorVerification(email)

                if (
                    demoVisitorVerification &&
                    new Date() < demoVisitorVerification.expiresAt
                ) {
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

                if (new Date() > demoVisitorVerification.expiresAt)
                    throw new Error(
                        'Error to validate your e-mail. Code expired, try a new one'
                    )

                if (code !== demoVisitorVerification.code)
                    throw new Error(
                        'Error to validate your e-mail. Invalid code, we sent a code to your e-mail. Check it and try again'
                    )

                const demoVisitorAdded = await addDemoVisitor(data)

                return res.status(200).json(demoVisitorAdded)
            }
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message || 'Internal Server Error' })
        }
    }

    if (req.method === 'DELETE') {
        try {
            if (action === 'remove-models') {
                results = await removeModels(data)
                if (results) return res.status(200).json(results)
            }
        } catch (err) {
            return res
                .status(500)
                .json({ error: err.message || 'Internal Server Error' })
        }
    }
}

export default handler
