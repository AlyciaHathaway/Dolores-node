
// 主要核心逻辑入口

const fs = require('fs')

class APP {
    constructor() {

    }
    // 高阶函数
    initServer() {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑，根据 url 进行代码分发
            let { url } = request
            let staticFunction = (url)=> {
                if (url === '/') {
                    url = '/index.html'
                }
                fs.readFile(`./public${url}`, 'utf8', (error, data)=> {
                    response.end(data)
                })
            }

            staticFunction(url)
            
        }
            
    }
}

module.exports = APP