const pool = require('../../connectdb')

//create
const createMeta = async ({ name }) => {
    const result = await pool.query(
        'INSERT INTO meta (name) VALUES ($1) RETURNING *',
        [name]
    )
    return result.rows[0]
}

//get meta
const getMeta = async () => {
    const result = await pool.query('SELECT * FROM meta')
}

module.exports = { createMeta, getMeta }