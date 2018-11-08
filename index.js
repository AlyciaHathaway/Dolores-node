const http = require('http')
const PORT = 7000

http.createServer((request, reponse)=> {
    reponse.end('Hello World')
}).listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`)
})