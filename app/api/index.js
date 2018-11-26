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
        // 原型链 readable stream eventEmitter，on 方法是通过原型链拿到的
        // stream 的状态：paused(死盒) flow(活水)
        // 如果 stream 提前到达服务端，会存在 internal buffer 里
        return new Promise((resolve, reject)=> {
            let data = ''
            // internal buffer ===> 拿出来 ===> end
            // 于是仓库被清空，内存被释放
            // paused ===> flow
            request.on('data', (chunk)=> {
                data += chunk
            }).on('end', ()=> {
                resolve(JSON.parse(data))
            })
        })
    }
}