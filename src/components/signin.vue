<template>
    <body>
    <div class="box">
        <h2>请注册</h2>
<!--        TODO 需要看看有没有更好的办法提交这个表单。目前密码会显示在网址上……       -->
        <form target="iframe">
            <div class="inputBox">
                <input type="text" name="name" v-model="name" required="">
                <label>用户名</label>
                <span v-if="nameOK===false" style="color: #ff0000">请设置合法用户名!</span>
            </div>
            <div class="inputBox">
                <input type="password" name="secret" v-model="secret" required="">
                <label>密码</label>
            </div>
            <div class="inputBox">
                <input type="password" name="repeat" v-model="repeat" required="">
                <label>请确认密码</label>
                <span v-if="secretOK===false" style="color: #ff0000">两次输入的密码务必保持一致</span>
            </div>
            <input type="submit" name="" value="注册" @click="sendMsg">
        </form>
        <p></p>
        <p>已有账号？请<router-link to="/login">登录</router-link></p>
    </div>
    <iframe id="iframe" name="iframe" style="display:none;"></iframe>
    </body>
</template>

<script>
    export default {
        name: "signin",
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
                repeat:"",
                secretOK:true,
                nameOK:false,
            }
        },
        methods: {
            sendMsg(){
                console.log(this.name, this.secret)
                // TODO 直接在这里与后端交互
                this.$emit('msg',this.name,this.secret)
                if(this.showLogin){
                    // TODO 后端判断用户名和密码是否匹配后返回
                    this.$router.push('/ground');
                }
            },
        },

        watch: { // 用于实时检测username是否合法
            "name": {
                handler(name) {// TODO 可以更改要求
                    this.nameOK = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(name)
                }
            },
            "repeat":{
                handler(repeat){
                    if(this.secret === repeat){
                        this.secretOK = true
                    }
                    else{
                        this.secretOK = false
                    }
                }
            }

        }
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