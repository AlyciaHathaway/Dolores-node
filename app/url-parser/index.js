/*
 * url-parser
 * 处理客户端数据
 * 
 */

// request: query + body + method

module.exports = (context)=> {
    let {method, url} = context.req
    let { reqContext } = context
    method = method.toLowerCase()
    // B ==socket== S 客户端通过管道流到服务端模型
    // 原型链 readable stream eventEmitter，on 方法是通过原型链拿到的
    // stream 的状态：paused(死盒) flow(活水)
    // 如果 stream 提前到达服务端，会存在 internal buffer 里
    return Promise.resolve({
        then: (resolve, reject)=> {

            if (method === 'post') {
                let data = ''
                // internal buffer ===> 拿出来 ===> end
                // 于是仓库被清空，内存被释放
                // paused ===> flow
                request.on('data', (chunk)=> {
                    data += chunk
                }).on('end', ()=> {
                    reqContext.body = JSON.parse(data) // body
                    // 通知下一个流程
                    resolve()
                })
            }else {
                resolve()
            }
            
        }
    })
    
}