// 通信函数

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
*  param api: 定义在API.js里的东西
*  param requestBody: request.body，传进一个object
*  param onRespond: 一个函数，参数是返回的json object */
export default function connectBackend(api, requestBody, onRespond) {
    let xmlHttp = null;
    if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (xmlHttp != null) {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (parseInt(xmlHttp.status / 100) === 2) {
                    const jsonObj = JSON.parse(xmlHttp.responseText);
                    onRespond(jsonObj);
                } else {
                    alert(`response status ${xmlHttp.status}`);
                }
            }
        }
        xmlHttp.open(api.method, api.path, true);
        xmlHttp.send(JSON.stringify(requestBody));
    } else {
        alert("Your browser does not support XmlHTTP...");
    }
}