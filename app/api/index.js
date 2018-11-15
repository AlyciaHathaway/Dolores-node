// API Server

module.exports = (url)=> {
    let apiMap = {
        '/list.action': ['心理学', '三只松鼠', 'Mongodb'],
        '/user.action': ['Dolores', 'Joyce', 'Family']
    }

    return apiMap[url]
}