// API Server

module.exports = (request)=> {
    let { url, method } = request
    let apiMap = {
        '/list.action': ['心理学', '三只松鼠', 'Mongodb'],
        '/user.action': ['Dolores', 'Joyce', 'Family']
    }
    // 处理 GET、POST
    method = method.toLowerCase()
    if (method === 'get') {
        return Promise.resolve(apiMap[url])
    }else {
        // B ==socket== S 客户端通过管道流到服务端模型
        // 原型链 readable stream eventEmitter
        
        return new Promise((resolve, reject)=> {
            let data = ''
            request.on('data', (chunk)=> {
                data += chunk
            }).on('end', ()=> {
                resolve(data)
            })
        })
    }
}