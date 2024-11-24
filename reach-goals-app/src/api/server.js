const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.REACHGOALS_URL || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const addMetaHandler = require('../api/meta/add')

app.post('/api/meta/add', addMetaHandler)
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})