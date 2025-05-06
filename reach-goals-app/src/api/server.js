const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// routes set
const { addGoal, updateGoal, getGoal, deleteGoal } = require('./goal/actions')
const { addAssignment, updateAssignment, getAssignment, deleteAssignment } = require('./assignment/actions')
const { addTag, updateTag, getTag, deleteTag } = require('./tag/actions')

app.post('/api/goal/actions', addGoal)
app.get('/api/goal/actions/:id?', getGoal)
app.put('/api/goal/actions/:id', updateGoal)
app.delete('/api/goal/actions/:id', deleteGoal)

app.post('/api/assignment/actions', addAssignment)
app.get('/api/assignment/actions/:id?', getAssignment)
app.put('/api/assignment/actions/:id', updateAssignment)
app.delete('/api/assignment/actions/:id', deleteAssignment)

app.post('/api/tag/actions', addTag)
app.get('/api/tag/actions/:id?', getTag)
app.put('/api/tag/actions/:id', updateTag)
app.delete('/api/tag/actions/:id', deleteTag)

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})