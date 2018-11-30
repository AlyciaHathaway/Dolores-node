
// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')
const urlParser = require('./url-parser')

class APP {
    constructor() {

    }
    // 高阶函数
    initServer() {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑，根据 url 进行代码分发
            let {url, method} = request
            // Don't repeat yourself
            // 返回的字符串或者 buffer
            request.context = {
                body: '',
                query: '',
                method: 'get'
            }

            let context = {
                req: request,
                reqContext: {
                    body: '', // POST 请求的数据
                    query: {} // 处理客户端 GET 请求
                },
                res: response,
                resContext: {
                    headers: {}, // response 的返回报文
                    body: '' // 返回给前端的内容区
                }
            }

            urlParser(context).then(()=> {
                return apiServer(context)
            }).then((value)=> {
                if (!value) {
                    // 如果 api 里拿不到值，则说明是静态资源请求
                    return staticServer(context)
                }else {
                    // 如果 api 里有对应值，则是 ajax 请求
                    return value
                }
            }).then((value)=> {

                let base = {'X-powered-by': 'Node.js'}
                let body = ''
                // 返回静态资源，格式为 buffer
                if (value instanceof Buffer) {
                    body = value
                }else {
                    // 返回 api 的数组
                    body = JSON.stringify(value)
                    let finalHeader = Object.assign(base, {
                        'Content-Type': 'application/json'
                    })
                    response.writeHead(200, 'resolve ok', finalHeader)
                }
                response.end(body)
            })


            // let body = ''
            // let headers = {}
            // 所有以 action 结尾的 url，认为它是 ajax
            // if (url.match('action')) {
            //     apiServer(url).then((value)=> {
            //         body = JSON.stringify(value)
            //         headers = {
            //             'Content-type': 'application/json'
            //         }
            //         let finalHeader = Object.assign(headers, {'X-Powered-By': 'Node.js'})
            //         response.writeHead(200, 'Success', finalHeader)
            //         response.end(body)
            //     })
                
            // }else {
            //     staticServer(url).then((body)=> {
            //         let finalHeader = Object.assign(headers, {'X-Powered-By': 'Node.js'})
            //         response.writeHead(200, 'Success', finalHeader)
            //         response.end(body)
            //     })
            // }
            
        }
            
    }
}

module.exports = APP