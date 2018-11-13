
// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')

class APP {
    constructor() {

    }
    // 高阶函数
    initServer() {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑，根据 url 进行代码分发
            let { url } = request
            let body = staticServer(url)
            
            response.end(body)
        }
            
    }
}

module.exports = APP