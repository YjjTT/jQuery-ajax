window.jQuery = function (nodeOrSelector){ 
    let nodes = {}
    nodes.addClass = function(){}
    return nodes
}

window.jQuery.ajax = function({url ,method, body, successFn, failFn, headers}){
    // let url = options.url
    // let method = options.method
    // let body = options.body
    // let successFn = options.successFn
    // let failFn = options.failFn
    // let headers = options.headers

    // ES6 析构赋值
    // let {url ,method, body, successFn, failFn, headers} = options

    let request = new XMLHttpRequest()
    request.open(method, url)
    for(let key in headers){
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = ()=>{
        if(request.status >= 200 && request.status <= 300){
            successFn.call(undefined, request.responseText)
        }else{
            failFn.call(undefined, request)
        }
    }
    request.send(body)
}

window.$ = window.jQuery

myButton.addEventListener('click', function(e){
    window.jQuery.ajax({
        url: '/xxx',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        },
        successFn: (eee)=>{ console.log(eee) },
        failFn: (x)=>{ console.log(x) }
    })
})