export default function dealAdmin(id, method) {
    let xmlRequestGet = new XMLHttpRequest();
    xmlRequestGet.open("get", "backend/csrf", true);
    let xmlRequestPost = new XMLHttpRequest();

    xmlRequestPost.onreadystatechange = function() {
        if (xmlRequestPost.readyState === 4 && xmlRequestPost.status === 201){
            console.log("succeed")
        }
    }

    // xmlRequestPost.setRequestHeader('content-type', 'application/json');
    xmlRequestGet.onreadystatechange = function () {
        if (xmlRequestGet.readyState === 4 && xmlRequestGet.status === 200) {  // 注意返回码是 200
            let csrfToken = this.responseText;  // 获取 CSRF token
            xmlRequestPost.open("post","backend/usepower", true);
            xmlRequestPost.setRequestHeader('X-CSRFToken', csrfToken);  // 设置请求头
            xmlRequestPost.setRequestHeader('content-type', 'application/json');
            xmlRequestPost.send(JSON.stringify({"id":id,"method":method}));
        }
    }

    xmlRequestGet.send();
}