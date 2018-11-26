// API Server

module.exports = (request)=> {
    let { url, method, context} = request
    let apiMap = {
        '/list.action': ['心理学', '三只松鼠', 'Mongodb'],
        '/user.action': ['Dolores', 'Joyce', 'Family']
    }
    // 处理 GET、POST
    method = method.toLowerCase()
    if (method === 'get') {
        return Promise.resolve(apiMap[url])
    }else {
        let {body} = context
        return Promise.resolve(body)
    }
}