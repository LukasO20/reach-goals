import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// routes set
import {
    handleAddGoal, handleUpdateGoal, handleGetGoal, handleGetGoalOnTag, handleGetGoalOnAssignment,
    handleGetGoalWithoutAssignment, handleDeleteGoal
} from '../api/goal/actions.js'
import {
    handleAddAssignment, handleUpdateAssignment, handleGetAssignment, handleGetAssignmentOnTag,
    handleGetAssignmentOnGoal, handleGetAssignmentWithoutGoal, handleDeleteAssignment
} from '../api/assignment/actions.js'
import {
    handleAddTag, handleUpdateTag, handleGetTag, handleDeleteTag, handleGetTagOnGoal, handleGetTagOnAssignment,
    handleGetTagNotGoal, handleGetTagNotAssignment, handleUnlinkTagOnGoal, handleUnlinkAllTagOnGoal,
    handleUnlinkTagOnAssignment, handleUnlinkAllTagOnAssignment
} from '../api/tag/actions.js'

app.post('/api/goal/actions', handleAddGoal)
app.get('/api/goal/actions/:goalID?', handleGetGoal)
app.get('/api/goal/actions/relation-assignment/:assignmentID', handleGetGoalOnAssignment)
app.get('/api/goal/actions/not-assignment/:assignmentID', handleGetGoalWithoutAssignment)
app.get('/api/goal/actions/relation-tag/:tagID', handleGetGoalOnTag)
app.put('/api/goal/actions/:goalID', handleUpdateGoal)
app.delete('/api/goal/actions/:goalID', handleDeleteGoal)

app.post('/api/assignment/actions', handleAddAssignment)
app.get('/api/assignment/actions/not-goal', handleGetAssignmentWithoutGoal)
app.get('/api/assignment/actions/:assignmentID?', handleGetAssignment)
app.get('/api/assignment/actions/relation-goal/:goalID', handleGetAssignmentOnGoal)
app.get('/api/assignment/actions/relation-tag/:tagID', handleGetAssignmentOnTag)
app.put('/api/assignment/actions/:assignmentID', handleUpdateAssignment)
app.delete('/api/assignment/actions/:assignmentID', handleDeleteAssignment)

app.post('/api/tag/actions', handleAddTag)
app.get('/api/tag/actions/:id?', handleGetTag)
app.get('/api/tag/actions/relation-goal/:goalID', handleGetTagOnGoal)
app.get('/api/tag/actions/relation-assignment/:assignmentID', handleGetTagOnAssignment)
app.get('/api/tag/actions/not-goal/:goalID', handleGetTagNotGoal)
app.get('/api/tag/actions/not-assignment/:assignmentID', handleGetTagNotAssignment)
app.put('/api/tag/actions/:tagID', handleUpdateTag)

app.delete('/api/tag/actions/:tagID', handleDeleteTag)
app.delete('/api/tag/actions/unlink-all-goal/:goalID', handleUnlinkAllTagOnGoal)
app.delete('/api/tag/actions/unlink-all-assignment/:assignmentID', handleUnlinkAllTagOnAssignment)
app.delete('/api/tag/actions/unlink-goal/:tagID/:goalID', handleUnlinkTagOnGoal)
app.delete('/api/tag/actions/unlink-assignment/:tagID/:assignmentID', handleUnlinkTagOnAssignment)

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})