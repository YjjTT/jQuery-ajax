window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () {}
    return nodes
}

window.jQuery.ajax = function ({
    url,
    method,
    body,
    successFn,
    failFn,
    headers
}) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()
        request.open(method, url)
        for (let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value)
        }
        request.onreadystatechange = () => {
            if (request.status >= 200 && request.status <= 300) {
                resolve.call(undefined, request.responseText)
            } else {
                reject.call(undefined, request)
            }
        }
        request.send(body)
    })
}
// function success(responseText){
//     console.log(responseText)
// }
// function fail (request){
//     console.log(request)
// }
// myButton.addEventListener('click', function(e){
//     window.jQuery.ajax({
//         url: '/xxx',
//         method: 'post',
//     }).then(success, fail)
// })