/*
 * created by Dolores
 * 18/11/09
 */

const http = require('http')
const PORT = 7000
const APP = require('./app')
const server = new APP()

http.createServer(server.initServer()).listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`)
})