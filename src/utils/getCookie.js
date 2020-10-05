/* 获得cookie中的字段
*  param key: cookie的键
*  return: cookie的值，若没有则返回null */
export default function getCookie(key){
    var strCookie = document.cookie;
    var arrCookie = strCookie.split(";");
    for(var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if(arr[0] === key) return arr[1];
    }
    return null;
}