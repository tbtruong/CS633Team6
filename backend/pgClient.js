import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config({path:".env"})

const client = new pg.Client({
    ssl: process.env.NODE_ENV ?  {
        "rejectUnauthorized": false
    } : false
})


// await client.connect()
//
//
// const res = await client.query('SELECT NOW()')
// console.log(res)
// await client.end()


export default client