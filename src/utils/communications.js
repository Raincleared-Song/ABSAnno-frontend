// 通信函数

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
*  param api: 定义在API.js里的东西
*  param requestBody: request.body，传进一个object
*  param func: 一个函数，参数是返回的json object */
export default function connectBackend(api, requestBody, func) {
    let xmlHttp = null;
    if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (xmlHttp != null) {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status / 200 === 2) {
                    const jsonObj = JSON.parse(xmlHttp.responseText);
                    func(jsonObj);
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