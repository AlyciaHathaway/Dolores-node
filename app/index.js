
// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')

class APP {
    constructor() {

    }
    // 高阶函数
    initServer() {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑，根据 url 进行代码分发
            // let url = request.url
            let { url } = request
            // 所有以 action 结尾的 url，认为它是 ajax
            // Don't repeat yourself
            // 返回的字符串或者 buffer
            let body = ''
            let headers = {}
            if (url.match('action')) {
                body = JSON.stringify(apiServer(url))
                headers = {
                    'Content-type': 'application/json'
                }
            }else {
                body = staticServer(url)
            }
            let finalHeader = Object.assign(headers, {'X-Powered-By': 'Node.js'})
            response.writeHead(200, 'Success', finalHeader)
            response.end(body)
        }
            
    }
}

module.exports = APP