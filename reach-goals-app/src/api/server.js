const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// routes set
const { addMeta, updateMeta, getMeta, deleteMeta } = require('./meta/actions')
const { addAssignment, updateAssignment, getAssignment, deleteAssignment } = require('./assignment/actions')

app.post('/api/meta/actions', addMeta)
app.get('/api/meta/actions/:id?', getMeta)
app.put('/api/meta/actions/:id', updateMeta)
app.delete('/api/meta/actions/:id', deleteMeta)

app.post('/api/assignment/actions', addAssignment)
app.get('/api/assignment/actions/:id?', getAssignment)
app.put('/api/assignment/actions/:id', updateAssignment)
app.delete('/api/assignment/actions/:id', deleteAssignment)

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})