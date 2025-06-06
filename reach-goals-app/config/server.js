const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// routes set
const { addGoal, updateGoal, getGoal, getGoalOnTag, getGoalOnAssignment,
     getGoalWithoutAssignment, deleteGoal } = require('../api/goal/actions')
const { addAssignment, updateAssignment, getAssignment, getAssignmentOnTag,
     getAssignmentOnGoal, getAssignmentWithoutGoal, deleteAssignment } = require('../api/assignment/actions')
const { addTag, updateTag, getTag, deleteTag, getTagOnGoal, getTagOnAssignment,
     getTagNotGoal, getTagNotAssignment, unlinkTagOnGoal, unlinkAllTagOnGoal, unlinkTagOnAssignment, unlinkAllTagOnAssignment } = require('../api/tag/actions')

app.post('/api/goal/actions', addGoal)
app.get('/api/goal/actions/:id?', getGoal)
app.get('/api/goal/actions/relation-assignment/:relationID', getGoalOnAssignment)
app.get('/api/goal/actions/not-assignment/:relationID', getGoalWithoutAssignment)
app.get('/api/goal/actions/relation-tag/:relationID', getGoalOnTag)
app.put('/api/goal/actions/:id', updateGoal)
app.delete('/api/goal/actions/:id', deleteGoal)

app.post('/api/assignment/actions', addAssignment)
app.get('/api/assignment/actions/not-goal', getAssignmentWithoutGoal)
app.get('/api/assignment/actions/:id?', getAssignment)
app.get('/api/assignment/actions/relation-goal/:relationID', getAssignmentOnGoal)
app.get('/api/assignment/actions/relation-tag/:relationID', getAssignmentOnTag)
app.put('/api/assignment/actions/:id', updateAssignment)
app.delete('/api/assignment/actions/:id', deleteAssignment)

app.post('/api/tag/actions', addTag)
app.get('/api/tag/actions/:id?', getTag)
app.get('/api/tag/actions/relation-goal/:relationID', getTagOnGoal)
app.get('/api/tag/actions/relation-assignment/:relationID', getTagOnAssignment)
app.get('/api/tag/actions/not-goal/:relationID', getTagNotGoal)
app.get('/api/tag/actions/not-assignment/:relationID', getTagNotAssignment)
app.put('/api/tag/actions/:id', updateTag)

app.delete('/api/tag/actions/:id', deleteTag)
app.delete('/api/tag/actions/unlink-all-goal/:id', unlinkAllTagOnGoal)
app.delete('/api/tag/actions/unlink-all-assignment/:id', unlinkAllTagOnAssignment)
app.delete('/api/tag/actions/unlink-goal/:tagID/:relationID', unlinkTagOnGoal)
app.delete('/api/tag/actions/unlink-assignment/:tagID/:relationID', unlinkTagOnAssignment)

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})