<template>
    <div>
        <a-divider>广播通知</a-divider>
        <a-row justify="center" type="flex">
            <a-col :span="7" style="font-size: 15px">
                发送给
                <a-checkable-tag v-model="checkall" @change="handleChange('all')">
                    全体用户
                </a-checkable-tag>
                <a-checkable-tag v-model="checknormal" @change="handleChange('normal')">
                    普通用户
                </a-checkable-tag>
                <a-checkable-tag v-model="checkvip" @change="handleChange('vip')">
                    VIP用户
                </a-checkable-tag>
                <a-checkable-tag v-model="checkadmin" @change="handleChange('admin')">
                    管理员
                </a-checkable-tag>
            </a-col>
            <a-col :span="13">
                <el-input placeholder="消息内容" v-model="text">
                    <el-button slot="append" @click="onBroadCast">广播</el-button>
                </el-input>
<!--                <a-input-search placeholder="消息内容" allow-clear row="2" @search="onBroadCast">-->
<!--                    <a-button slot="enterButton">-->
<!--                        广播-->
<!--                    </a-button>-->
<!--                </a-input-search>-->
            </a-col>
        </a-row>


        <a-divider>待审批升级用户</a-divider>
        <user-manage :username="username" :power="power" @reload="onReload"/>
        <a-divider>管理用户</a-divider>
        <banuser :username="username" :power="power" :reload="reload_"/>
    </div>
</template>

<script>
    import Banuser from "./manager/banuser";
    import UserManage from "./manager/userManage";
    import postBackend from "../utils/postBackend"

    export default {
        name: "manager",
        components: {UserManage, Banuser},
        data(){
            return{
                checkall: false,
                checknormal: false,
                checkvip: false,
                checkadmin: false,
                target:[],
                text:"",
                reload_:false,
            }
        },
        props:[
            "username",
            "power",
            "avatar"
        ],
        methods:{
            onReload(){
                this.reload_= true;
            },
            onBroadCast(){
                // console.log(value)
                // this.text = value
                postBackend("backend/message",
                    {msg:this.text, user:this.target},
                    jsonObj => {
                        if (jsonObj.code === 201) {
                            console.log("Successful broadcast!")
                            this.$message.success("成功发送消息",2)
                            this.text = ""
                        } else {
                            if(jsonObj.data === "You didnt specify receivers"){
                                this.$message.warning("请选择发送对象",2)
                            }
                            console.log("can't broadcast")
                        }
                    });
            },
            handleChange(user) {
                if(user === "all"){
                    this.checknormal=false
                    this.checkvip=false
                    this.checkadmin=false
                    if(this.checkall){
                        this.target=["all"]
                    }
                    else{
                        this.target=[]
                    }
                }
                else {
                    this.checkall=false
                    let all=this.target.indexOf("all")
                    if(all !== -1){
                        this.target.splice(all,1)
                    }
                    this.target.push(user)
                }
                console.log(this.target)
            },
        }
    }
</script>

<style scoped>

</style>