var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.env.PORT || 8888

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }

    
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery)

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        response.statusCode = 200
        
        // var amount = fs.readFileSync('./db', 'utf8')
        // string = string.replace('&&&amount&&&', amount)
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        // response.end(string)

        response.write(string)
        response.end()
    } else if (path === '/pay') {
        var amount = fs.readFileSync('./db', 'utf8')
        var newAmount = amount - 1
        // if(Math.random() > 0.5){
        fs.writeFileSync('./db', newAmount)
        response.setHeader('Content-Type', 'application/javascript')
        response.statusCode = 200
        response.write(`
        // 说明 jack.com的后端程序员需要对 frank.com 的页面细节了解很清楚
        // 耦合 解耦
            // amount.innerText = amount.innerText - 1
            // 这就是JSONP
            // JSON + padding = JSONP
            // 左padding ${query.callbackName}.call(undefined,
            // 右padding )
            // JSON {
            //    "success": true,
            //   "left": ${newAmount}
            //}
            // ${query.callbackName}.call(undefined,{
            //     "success": true,
            //     "left": ${newAmount}
            // })
            ${query.callback}.call(undefined,'success')
        `)
        // }else{
        //     response.statusCode = 400
        //     response.write('fail')
        // }
        response.end()
    } else if(path === '/main.js'){
        var string = fs.readFileSync('./main.js', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(string)
        response.end()
    } else if(path === '/xxx'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        // response.setHeader('Access-Control-Allow-Origin', 'http://frank.com:8001') // 加上这句话可以两个不同源的网站互相读取AJAX
        // response.setHeader('Access-Control-Allow-Origin', '*') // 允许所有人访问
        response.write(`
        {
            "note":{
                "to": "aa",
                "from": "bb",
                "heading": "cc",
                "content": "hi"
            }
        }
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.end()
    }








    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)