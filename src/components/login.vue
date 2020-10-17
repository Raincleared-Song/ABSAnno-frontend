<template>
    <body>
    <div class="box">
        <h2>请登录</h2>
        <div target="iframe">
            <div class="inputBox">
                <input type="text" name="name" v-model="name" required="">
                <label>用户名</label>
            </div>
            <div class="inputBox">
                <input type="password" name="secret" v-model="secret" required="">
                <label>密码</label>
            </div>
            <div>
                <span v-if="passOK===false" style="color: #ff0000">账号或密码错误，请重新输入</span>
                <span v-if="banned===true" style="color: #ff0000">该账号已被封禁，无法登录</span>
                <span v-if="OK===false" style="color: #ff0000">登录异常，请稍后重试</span>
            </div>
            <p></p>
            <input type="submit" name="" value="登录" @click="sendMsg">
        </div>
        <p></p>
        <p  style="color: #ffffff">没有账号？请<router-link to="/signin">注册</router-link></p>
    </div>
    <iframe id="iframe" name="iframe" style="display:none;"></iframe>
    </body>
</template>

<script>
    export default {
        name: "login",
        props: {
            showLogin: {
                type: Boolean,
                default: () => true
            },
        },
        // 请在下方设计自己的数据结构以及事件函数
        data(){
            return {
                name:"",
                secret:"",
                passOK:true,
                banned:false,
                OK:true,
            }
        },
        methods: {
            sendMsg(){
                // console.log(this.name, this.secret)
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201){
                        let res = JSON.parse(xhr.responseText);
                        let data = JSON.parse(res.data.replace(/'/g,'"'));
                        console.log(data)
                        console.log(data.name, data.power);
                        context.$emit('login', {"name":data.name, "power":data.power});
                        context.$router.push('/ground');
                    }
                    else if(xhr.readyState === 4){
                        let res = JSON.parse(xhr.response);
                        let error = res.data;
                        console.log(error)
                        if(error === "Password Is Error" || error === "This User Is Not Here"){
                            context.passOK = false;
                        }
                        else if(error === "User Is Banned"){
                            context.banned = true;
                        }
                        else {
                            context.OK = false;
                        }
                    }
                };
                xhr.open("post","backend/login");
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify({"name":this.name,"password":this.secret,
                    "method":"LogIn", "email":""}))
            },
        },
    }
</script>

<style scoped>
    body{
        margin:0;
        padding: 0;
        font-family: sans-serif;
        /* background: url("login.jpg");
        background-size: cover; */
    }
    .box
    {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:400px;
        padding: 40px;
        background:rgba(0,0,0,.8);
        box-sizing:border-box;
        box-shadow:0 15px 25px rgba(0,0,0,.5);
        border-radius: 10px;/*登录窗口边角圆滑*/
    }
    .box h2
    {
        margin:0 0 30px;
        padding:0;
        color:#fff;
        text-align:center;
    }
    .box .inputBox
    {
        position:relative;
    }
    .box .inputBox input
    {
        width: 100%;
        padding: 10px 0;
        font-side:16px;
        color: #fff;
        letter-spacing: 1px;
        margin-bottom:30px;/*输入框设置*/
        border:none;
        border-bottom:1px solid #fff;
        outline:none;
        background:transparent;
    }
    .box .inputBox label
    {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
    }
    .box .inputBox input:focus ~ label,
    .box .inputBox input:valid ~ label
    {
        top: -18px;
        left: 0;
        color: #03a9f4;
        font-size: 12px;
    }
    .box  input[type="submit"]
    {
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
        background: #03a9f4;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 5px;
    }
</style>