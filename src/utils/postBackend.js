// 通信函数，向后端发送POST请求

/* 这是一个高阶函数，负责向后端发送请求
 * param url: url字符串
 * param requestBody: POST的request.body，传进一个object
 * param onRespond: 对于response的处理 */
export default function postBackend(url, requestBody, onRespond) {
    let xmlHttpPost;
    let xmlHttpCsrf;
    let jsonObj;    // 返回的东西
    if (window.XMLHttpRequest) {
        xmlHttpPost = new XMLHttpRequest();
        xmlHttpCsrf = new XMLHttpRequest();
        xmlHttpCsrf.open('GET', 'backend/csrf', true);
    } else {
        // eslint-disable-next-line no-undef
        xmlHttpPost = new ActiveXObject("Microsoft.XMLHTTP");
        // eslint-disable-next-line no-undef
        xmlHttpCsrf = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttpPost.onreadystatechange = function () {
        if (xmlHttpPost.readyState === 4) {
            jsonObj = JSON.parse(xmlHttpPost.responseText);
            onRespond(jsonObj);
        }
    }
    xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
            if (xmlHttpCsrf.status === 200) {
                const csrfToken = xmlHttpCsrf.responseText;  // 获取 CSRF token
                xmlHttpPost.open('POST', url, true);
                xmlHttpPost.setRequestHeader('content-type', 'application/json');
                xmlHttpPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
                console.log(requestBody);
                xmlHttpPost.send(JSON.stringify(requestBody));
            } else {
                console.log(xmlHttpCsrf.responseText);
            }
        }
    }
    xmlHttpCsrf.send();
}
