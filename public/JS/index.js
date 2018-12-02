

setTimeout(function() {
    $.ajax({
        url: '/user.action',
        method: 'get',
        // 返回数组
        success: function(array) {
            array = JSON.parse(array)
            var liString = array.map(function(items) {
                return '<li>' + items + '</li>'
            }).join('')
    
            $('#root').html(liString)
        },
        error: function(error) {
            console.log(error)
        },
    })
    // 模拟 post
    $.ajax({
        url: '/list.action',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify([
            'name','Dolores'
        ]),
        // 返回数组
        success: function(array) {
            array = JSON.parse(array)
            var liString = array.map(function(items) {
                return '<li>' + items + '</li>'
            }).join('')
    
            $('#shop').html(liString)
        },
        error: function(error) {
            console.log(error)
        },
    })
}, 1000)
