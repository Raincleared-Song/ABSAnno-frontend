// 通信函数，向后端发送POST请求
import triggerEvent from "ant-design-vue/lib/_util/triggerEvent";

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
*  param requestBody: POST的request.body，传进一个object
*  param onRespond: 一个函数，参数是返回的json object */
export default function postBackend(api, requestBody, onRespond) {
    let xmlHttpPost;
    let xmlHttpCsrf;
    if (window.XMLHttpRequest) {
        xmlHttpPost = new XMLHttpRequest();
        xmlHttpCsrf = new XMLHttpRequest();
        xmlHttpCsrf.open('GET', 'backend/csrf', true);
    } else {
        // eslint-disable-next-line no-undef
        xmlHttpPost = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttpPost.onreadystatechange = function () {
        if (xmlHttpPost.readyState === 4) {
            if (xmlHttpPost.status === 201) {
                const jsonObj = JSON.parse(xmlHttpPost.responseText);
                onRespond(jsonObj);
            } else {
                console.log(xmlHttpPost.responseText);
            }
        }
    }
    xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
            if (xmlHttpCsrf.status === 200) {
                const csrfToken = xmlHttpCsrf.responseText;  // 获取 CSRF token
                xmlHttpPost.open('POST', api.path, true);
                xmlHttpPost.setRequestHeader('content-type', 'application/json');
                xmlHttpPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
                xmlHttpPost.send(JSON.stringify(requestBody));  // ?
            } else {
                console.log(xmlHttpCsrf.responseText);
            }
        }
    }
    xmlHttpCsrf.send();
}
