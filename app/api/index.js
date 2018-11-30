// API Server

module.exports = (context)=> {
    let {url, method} = context.req
    let {resContext, reqContext} = context

    let apiMap = {
        '/list.action': ['心理学', '三只松鼠', 'Mongodb'],
        '/user.action': ['Dolores', 'Joyce', 'Family']
    }
    // 处理 GET、POST
    method = method.toLowerCase()
    
    return Promise.resolve({
        then: (resolve, reject)=> {
            if (method === 'get') {
                resContext.body = apiMap[url]
                return Promise.resolve()
            }else {
                let {body} = reqContext
                resContext.body = body
            }
            resolve()
        }
    })
   
}