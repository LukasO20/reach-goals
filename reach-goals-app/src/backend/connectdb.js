const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'ep-weathered-band-a4qagvp1-pooler.us-east-1.aws.neon.tech',
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool