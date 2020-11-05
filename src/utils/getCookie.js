/* 获得cookie中的字段
*  param key: cookie的键
*  return: cookie的值，若没有则返回null */
export default function getCookie(key){
    let strCookie = document.cookie;
    let arrCookie = strCookie.split(";");
    for(let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if(arr[0] === key) return arr[1];
    }
    return null;
}