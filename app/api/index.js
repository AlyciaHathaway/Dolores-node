// API Server

module.exports = (context)=> {
    let {url, method} = context.req
    let {resContext, reqContext} = context
    let {res} = context

    let apiMap = {
        '/list.action': ['心理学', '三只松鼠', 'Mongodb'],
        '/user.action': ['Dolores', 'Joyce', 'Family']
    }
    // 处理 GET、POST
    method = method.toLowerCase()
    
    return Promise.resolve({
        then: (resolve, reject)=> {
            if (url.match('action')) {
                if (method === 'get') {
                    resContext.body = JSON.stringify(apiMap[url])
                }else {
                    let {body} = reqContext
                    resContext.body = JSON.stringify(body)
                }
                resContext.headers = Object.assign(resContext.headers, {
                    'Contet-Type': 'application/json'
                })
            }
            resolve()
        }
    })
   
}