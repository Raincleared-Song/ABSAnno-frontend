// 通信函数，向后端发送GET请求
import triggerEvent from "ant-design-vue/lib/_util/triggerEvent";

/* 这是一个高阶函数，负责向后端发送请求，包装在communication.js里也许方便一些？？？
*  param api: 定义在API.js里的东西
*  param requestParams: GET的请求参数
*  param onRespond: 一个函数，参数是返回的json object */
export default function getBackend(api, requestParams, onRespond) {
    let xmlHttp = null;
    if (window.XMLHttpRequest)
        xmlHttp = new XMLHttpRequest();
    else
        // eslint-disable-next-line no-undef
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

    if (xmlHttp != null) {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                const jsonObj = JSON.parse(xmlHttp.responseText);
                onRespond(jsonObj);
            }
        }
        let trueUrl = api.path;
        console.log(requestParams);
        if (requestParams !== null && typeof requestParams === "object") {
            trueUrl += "?";
            Object.keys(requestParams).forEach(key => {
                trueUrl += `${key}=${requestParams[key]}&`;
            });
            trueUrl = trueUrl.substring(0, trueUrl.length - 1);
        }
        console.log(trueUrl);
        xmlHttp.open('GET', trueUrl, true);
        xmlHttp.send(null);
    } else {
        alert("Your browser does not support XmlHTTP...");
    }
}