
// 主要核心逻辑入口

const fs = require('fs')

class APP {
    constructor() {

    }

    initServer(request, response) {
        fs.readFile('./public/index.html', 'utf8', (error, data)=> {
            response.end(data)
        })
    }
}

module.exports = APP