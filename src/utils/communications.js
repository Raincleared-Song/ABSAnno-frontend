// 通信函数

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
*  param api: 定义在API.js里的东西
*  param requestBody: request.body，传进一个object
*  param func: 一个函数，参数是返回的json object */
export default function connectBackend(api, requestBody, func) {
    var xmlhttp = null;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200 || xmlhttp.status === 201) {
                    const jsonObj = JSON.parse(xmlhttp.responseText);
                    func(jsonObj);
                } else {
                    alert("Problem retrieving XML data...");
                }
            }
        }
        xmlhttp.open(api.method, api.path, true);
        xmlhttp.send(JSON.stringify(requestBody));
    } else {
        alert("Your browser does not support XmlHTTP...");
    }
}