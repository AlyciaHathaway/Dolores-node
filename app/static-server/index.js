// 静态资源服务
const fs = require('fs')
const path = require('path')

// express 框架 app.use(static('public'))
// 相对路径改成绝对路径
let getPath = (url)=> {
    // 注意，${url}前面要加点才能访问到这个路径
    return path.resolve(process.cwd(), 'public', `.${url}`)
}
let staticFunction = (request)=> {
    let {url} = request
    return new Promise((resolve, reject)=> {
        if (url === '/') {
            url = '/index.html'
        }
        let _path = getPath(url)
        let body = fs.readFile(_path, (err, data)=> {
            if (err) {
                reject(`${err.stack}`)
            }
            resolve(data)
        })
    })
}

module.exports = staticFunction