// 通信函数，向后端发送POST请求
import triggerEvent from "ant-design-vue/lib/_util/triggerEvent";

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
 * param api: API.js里面的常量，url等等
 * param requestBody: POST的request.body，传进一个object */
export default function postBackend(api, requestBody, onRespond, isJson = true) {
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
    }
    xmlHttpPost.onreadystatechange = function () {
        if (xmlHttpPost.readyState === 4) {
            jsonObj = JSON.parse(xmlHttpPost.responseText);
            onRespond(jsonObj);
            // return jsonObj
        }
    }
    xmlHttpCsrf.onreadystatechange = function () {
        if (xmlHttpCsrf.readyState === 4) {
            if (xmlHttpCsrf.status === 200) {
                const csrfToken = xmlHttpCsrf.responseText;  // 获取 CSRF token
                xmlHttpPost.open('POST', api.path, true);
                xmlHttpPost.setRequestHeader('content-type', 'application/json');
                xmlHttpPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
                if (isJson)
                    xmlHttpPost.send(JSON.stringify(requestBody));
                else
                    xmlHttpPost.send(requestBody);
            } else {
                console.log(xmlHttpCsrf.responseText);
            }
        }
    }
    xmlHttpCsrf.send();
}
