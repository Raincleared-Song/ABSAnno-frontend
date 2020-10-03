import getCookie from "@/utils/getCookie";

/* 在cookie中设置字段
*  若该字段已存在则更改它的值，否则在cookie中添加。
*  param key: cookie的键
*  param value: cookie的值 */
export default function setCookie(key, value){
    let v = getCookie(key);
    if (v === null) {
        document.cookie += `${key}=${escape(value)};`;
    } else {
        document.cookie = document.cookie.replace(
            new RegExp(`${key}=(.*?);`, 'g'), `${escape(value)}`);
    }

}
