import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.REACHGOALS_URL || 3000

app.use(bodyParser.json())

import addMetaHandler from './meta/add'

app.post('./api/meta/add', addMetaHandler)
app.get('/', (req, res) => {
    res.send('Server is running!')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})