// 通信函数，向后端发送POST请求

/* 这是一个高阶函数，负责向后端发送文件请求
 * param url: url字符串
 * param requestBody: POST的request.body，传进一个object
 * param onRespond: 对于response的处理 */
export default function postFile(url, requestBody, onRespond) {
    let xmlHttpCsrf;
    let jsonObj;    // 返回的东西
    if (window.XMLHttpRequest) {
        xmlHttpCsrf = new XMLHttpRequest();
        xmlHttpCsrf.open('GET', 'backend/csrf', true);
    } else {
        // eslint-disable-next-line no-undef
        xmlHttpCsrf = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
            if (xmlHttpCsrf.status === 200) {
                let xmlHttpPost;
                if (window.XMLHttpRequest)
                    xmlHttpPost = new XMLHttpRequest();
                else
                    // eslint-disable-next-line no-undef
                    xmlHttpPost = new ActiveXObject("Microsoft.XMLHTTP");

                xmlHttpPost.onreadystatechange = function () {
                    if (xmlHttpPost.readyState === 4) {
                        console.log(xmlHttpPost.responseText);
                        jsonObj = JSON.parse(xmlHttpPost.responseText);
                        onRespond(jsonObj);
                    }
                }
                const csrfToken = xmlHttpCsrf.responseText;  // 获取 CSRF token
                xmlHttpPost.open('POST', url, true);
                // xmlHttpPost.setRequestHeader('content-type', 'multipart/form-data; boundary=----378272391');
                xmlHttpPost.withCredentials = true;
                xmlHttpPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
                xmlHttpPost.send(requestBody);
            } else {
                console.log(xmlHttpCsrf.responseText);
            }
        }
    }
    xmlHttpCsrf.send();
}
