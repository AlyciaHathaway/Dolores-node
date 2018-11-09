
// 主要核心逻辑入口

const fs = require('fs')

class APP {
    constructor() {

    }
    // 高阶函数
    initServer(request, response) {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑
            fs.readFile('./public/index.html', 'utf8', (error, data)=> {
                response.end(data)
            })
        }
            
    }
}

module.exports = APP