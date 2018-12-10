
// 主要核心逻辑入口

const fs = require('fs')
const path = require('path')

class APP {
    constructor() {
        this.middlewareArr = []
        // 设计一个空的 promise
        this.middlewareChain = Promise.resolve()
    }
    use(middleware) {
        this.middlewareArr.push(middleware)
    }
    // 创建 promise 链条
    conposeMiddleware(context) {
        // 根据中间件数组创建 promise 链条
        let {middlewareArr} = this
        for (let middleware of middlewareArr) {
            this.middlewareChain = this.middlewareChain.then(()=> {
                return middleware(context)
            })
        }
        return this.middlewareChain
    }
    // 高阶函数
    initServer() {
        // 初始化的工作

        return (request, response)=> {
            // 每个请求进来的核心逻辑，根据 url 进行代码分发
            let {url, method} = request
            // Don't repeat yourself
            // 返回的字符串或者 buffer

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

            // Promise.resolve(参数) ==> 通过 context 对象来传递
            this.conposeMiddleware(context)
                .then(()=> {
                    let base = {'X-powered-by': 'Node.js'}
                    let {body, headers} = context.resContext
                    // writeHead 会覆盖 setHeader 里相同的 key/value
                    response.writeHead(200, 'resolve ok', Object.assign(base, headers))
                    response.end(body)
                })
                .catch((err)=> {
                    console.log(err)
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