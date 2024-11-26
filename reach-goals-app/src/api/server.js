const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.REACHGOALS_URL || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// routes set
const { addMeta } = require('../api/meta/actions')
const { getMeta } = require('../api/meta/actions')

app.post('/api/meta/actions', addMeta)
app.get('/api/meta/actions', getMeta)

// server status
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})