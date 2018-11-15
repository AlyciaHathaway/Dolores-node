
const fs = require('fs')
const path = require('path')

// express 框架 app.use(static('public'))
// 相对路径改成绝对路径
let getPath = (url)=> {
    // 注意，${url}前面要加点才能访问到这个路径
    return path.resolve(process.cwd(), 'public', `.${url}`)
}
let staticFunction = (url)=> {
    if (url === '/') {
        url = '/index.html'
    }
    let _path = getPath(url)
    let body = ''
    try {
        body = fs.readFileSync(_path)
    }catch(error) {
        body = `${error.stack}`
    }
    
    return body
}

module.exports = staticFunction