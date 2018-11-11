
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
            // express 框架 app.use(static('public'))
            // 相对路径改成绝对路径
            let getPath = (url)=> {
                return path.resolve(process.pwd(), 'public', `${url}`)
            }
            let staticFunction = (url)=> {
                if (url === '/') {
                    url = '/index.html'
                }
                let _path = getPath(url)
                fs.readFile(_path, 'binary', (error, data)=> {
                    if (error) {
                        data = 'NOT FOUND'
                    }
                    response.end(data, 'binary')
                })
            }

            staticFunction(url)
            
        }
            
    }
}

module.exports = APP