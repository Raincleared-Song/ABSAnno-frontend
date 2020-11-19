<template>
    <div>
        <a-layout>
            <a-layout-content class="content">

                <!--   导航栏，提供检索功能     -->
                <div>
                    <a-row  type="flex">
                        <a-col span="12">
                            <el-input placeholder="关键词/发题者" v-model="keyword" size="small">
                                <el-button slot="append" @click="onSearch">搜索</el-button>
                            </el-input>
<!--                            <a-input-search placeholder="关键词/发题者" enter-button @search="onSearch" />-->
                        </a-col>
                    </a-row>
                    <br/>
                    <a-row justify="space-around" type="flex">
                        <a-col span="6">
                            题目类型
                            <a-select
                                    mode="multiple"
                                    :default-value="type"
                                    style="width: 70%"
                                    placeholder="题目类型"
                                    @change="handleChangeType">
                                <a-select-option v-for="t in typeTotal" :key="t">
                                    {{t}}
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col span="15">
                            题目主题
                            <a-select
                                    mode="multiple"
                                    :default-value="theme"
                                    style="width: 70%"
                                    placeholder="题目主题"
                                    @change="handleChangeTheme">
                                <a-select-option v-for="t in themeTotal" :key="t">
                                    {{t}}
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col span="2">
                            <a-button @click="sendSelect">确定</a-button>
                        </a-col>
                    </a-row>
                </div>
                <a-divider></a-divider>

                <!--    样式1，图片广场    -->
                <div v-if="groundType === 1" class = "portfolio" >
                    <div style="text-align:right;" >
                        <a-button type="link" disabled>
                            图片广场
                        </a-button>
                        <a-divider type="vertical" />
                        <a-button type="link" @click="changeType" >
                            文字列表
                        </a-button>
                    </div>
                    <br/>
                    <a-row type="flex" justify="space-around" v-if="isRouterAlive">
                        <a-col :span="7" v-for="msg in msgList" :key="msg">
                            <div v-if="msg.questionForm !== 'none'" class="portfolio-wrap" align="center">
                                <img :src="msg.image_url" alt="" width="100%" >
                                <div  class="portfolio-info">
                                    <h4>{{msg.name}}</h4>
                                    <p>题目数量：{{msg.questionNum}}</p>
                                    <div class="portfolio-links">
                                        <div class="icons-list">
                                            <a-icon v-if="power!==-1" type="form" @click="goOrder(msg)"></a-icon>
                                            <a-icon v-if="power!==-1 && msg.received==='F'" type="star" @click="getOrder(msg, true)" />
                                            <a-icon v-if="power!==-1 && msg.received==='T'" type="star" theme="filled" @click="getOrder(msg, true)" />
                                            <a-popover :title="msg.name+' 题组'" trigger="hover">
                                                <template slot="content">
                                                    发题者：{{msg.user}}<br/>
                                                    完成情况：{{msg.ans_num}}/{{msg.total_ans}}<br/>
                                                    <a-icon type="tags" />
                                                    {{msg.tags.toString()}}
                                                    <br/>
                                                    任务简介：{{msg.info}}
                                                </template>
                                                <a-icon type="info-circle" />
                                            </a-popover>
                                            <a-icon v-if="power===2" type="delete" @click="deleteMsg(msg.id)"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            <!--                    空白答题页面的填充-->
                            <div v-if="msg.questionForm === 'none'" align="center">
                                <!--                        图片尺寸：500*350            -->
                                <img src="@/assets/ground/blank2.jpg" alt="" width="230" >
                            </div>

                        </a-col>
                    </a-row>

                </div>

                <!--   样式2，题目列表     -->
                <div v-if="groundType===2">
                    <div style="text-align:right;" >
                        <a-button type="link" @click="changeType">
                            图片广场
                        </a-button>
                        <a-divider type="vertical" />
                        <a-button type="link" disabled>
                            文字列表
                        </a-button>
                    </div>
                    <br/>
                    <a-list item-layout="horizontal" :data-source="msgList" v-if="isRouterAlive">
                        <a-list-item slot="renderItem" slot-scope="msg" v-if="msg.questionNum !== 0">
                            <a slot="actions" v-if="power!==-1 && msg.received === 'F'" @click="getOrder(msg, true)">接单</a>
                            <a slot="actions" v-if="power!==-1 && msg.received === 'T'" @click="getOrder(msg, true)">取消接单</a>
                            <a slot="actions" v-if="power!==-1" @click="goOrder(msg)">做题</a>
                            <a slot="actions" v-if="power===2" @click="deleteMsg(msg.id)" style="color: #ff5c4d">删除</a>
                            <a-list-item-meta>
                                <!--                                <a v-if="power!==-1" slot="title" :href="'/#/question/'+ msg.id" >{{ msg.name }}</a>-->
                                <a slot="title"  style="font-size: 15pt" >{{ msg.name }}</a>
                                <a slot="description">
                                    <div style="color: #5e5e5e"  v-if="msg.tags[0] !== '' && msg.tags[0] !== '[]'" >
                                        <a-tag color="green">
                                            {{msg.type[0]}}
                                        </a-tag>
                                        <a-tag color="green">
                                            {{msg.type[1]}}
                                        </a-tag>
                                        题目数量：{{msg.questionNum}}
                                        <a-divider type="vertical" />
                                        <a-icon type="dollar"  theme="twoTone" two-tone-color="#ffb84d"  />{{msg.cash}}
                                        <a-divider type="vertical" />
                                        <a-icon type="user" />{{msg.user}}
                                        <a-divider type="vertical" />
                                        <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />{{msg.deadline}}
                                        <a-divider type="vertical" />
                                        <a-icon type="fire" theme="twoTone" two-tone-color="#ff4d4f" />{{msg.ans_num}}/{{msg.total_ans}}
                                        <a-divider type="vertical" />
                                        <a-tag v-bind:key="tag" v-for="tag in msg.tags">
                                            {{tag}}
                                        </a-tag>
                                    </div>

                                    <div style="color: #5e5e5e"  v-else >
                                        <a-tag color="green">
                                            {{msg.questionForm}}
                                        </a-tag>
                                        题目数量：{{msg.questionNum}}
                                        <a-divider type="vertical" />
                                        <a-icon type="dollar"  theme="twoTone" two-tone-color="#ffb84d"  />{{msg.cash}}
                                        <a-divider type="vertical" />
                                        <a-icon type="user" />{{msg.user}}
                                        <a-divider type="vertical" />
                                        <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />{{msg.deadline}}
                                        <a-divider type="vertical" />
                                        <a-icon type="fire" theme="twoTone" two-tone-color="#ff4d4f" />{{msg.ans_num}}/{{msg.total_ans}}
                                    </div>
                                    <div style="color: #5e5e5e; font-size: 13px">{{msg.info}}</div>
                                </a>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                </div>

                <p></p>
                <!--   分页符     -->
                <a-pagination v-model="current" v-bind:pageSize="pagesize" v-bind:total="totalMsgNum"
                              :style="{textAlign: 'center' }" @change="onChange(current)" v-if="isRouterAlive"/>
            </a-layout-content>


<!--            感兴趣-->
            <a-layout-sider class="sidebar" width="250">
                <h3 class="sidebar-title">Discover   <a-icon type="reload" @click="getNewInterest(intNum)"/></h3>
                <div v-for="msg in intList" :key="msg">
                    <a-card size="small" style="width: 200px">
                        <template slot="title">
                            <a-icon v-if="power!==-1 && msg.received==='F'" type="star" @click="getOrder(msg, false)" />
                            <a-icon v-if="power!==-1 && msg.received==='T'" type="star"
                                    theme="twoTone" two-tone-color="#ffb84d" @click="getOrder(msg, false)" />
                            <a @click="goOrder(msg)" v-if="power!==-1" style="color: #5e5e5e">{{msg.name}}</a>
                            <a v-else style="color: #5e5e5e">-{{msg.name}}-</a>
                            <a-tag color="green">{{msg.type[0]}}</a-tag>
                            <a-tag color="green" v-if="msg.type[1] === '图片'">{{msg.type[1]}}</a-tag>

                        </template>
                        <div style="font-size: 13px">
                            题目数量：{{msg.questionNum}}<br/>
                            <a-icon type="dollar" />{{msg.cash}}
                            <a-divider type="vertical" />
                            <a-icon type="clock-circle" />{{msg.deadline}}
                            <br/>
                            <a-icon type="user" />{{msg.user}}
                            <a-divider type="vertical" />
                            <a-icon type="fire" />{{msg.ans_num}}/{{msg.total_ans}}
                            <br/>
                            <a-icon type="tags" />
                            {{msg.tags.toString()}}
                        </div>
                    </a-card>
                    <br/>
                </div>
            </a-layout-sider>

        </a-layout>
    </div>
</template>

<script>
    import dealAdmin from "@/utils/admin"
    import postBackend from "../utils/postBackend"
    import getBackend from "../utils/getBackend"
    import API from "@/utils/API";
    import convertTime from "../utils/convertTime";
    export default {
        name: "ground",
        data(){
            return {
                msgList:[],
                current: 1,
                totalMsgNum: 1,
                pagesize: 12,
                getMsgNum:0,
                type:[],
                theme:[],
                themeTotal:["青年", "中年","老年","学生","教师",
                    "上班族","研究者","人脸识别","图片识别","文字识别",
                    "AI写作","翻译校对","文本分析","生活场景","工作场景","购物",
                    "运动","旅游","动物","道德准则","地理","科学","心理学"],
                typeTotal:["文字-选择","文字-填空","图片-选择","图片-填空"],
                typeSend:[],
                groundType: 1,
                isRouterAlive: true,
                keyword:"",
                intList:[],
                intNum: 0,
                pageNumber: 0,
            }
        },
        props:[
            "username",
            "power",
            "avatar"
        ],
        methods: {
            min(a, b){
                if(a>b) return b;
                return a;
            },
            onChange(pageNumber) {
                this.pageNumber = pageNumber;
                this.getMsgNum = (pageNumber - 1) * 12;
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        this.totalMsgNum = data.total;
                        this.msgList = data.question_list;
                        while (this.msgList.length < 12) {
                            this.msgList.push({
                                'id': -1, 'name': "none", 'user': "none",
                                'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                                'total_ans': 0, 'ans_num': 0, 'deadline': "none", 'cash': "none",
                                'tags': ""
                            });
                        }
                        var i;
                        for(i = 0; i < 12; i+=1){
                            this.msgList[i].deadline = convertTime(this.msgList[i].deadline)
                            if(this.msgList[i].questionForm === "chosen"){
                                this.msgList[i].type = ["选择", "文字"]
                            }
                            else if(this.msgList[i].questionForm === "chosen-image"){
                                this.msgList[i].type = ["选择", "图片"]
                            }
                            else if(this.msgList[i].questionForm === "fill"){
                                this.msgList[i].type = ["填空",'文字']
                            }
                            else if(this.msgList[i].questionForm === "fill-image"){
                                this.msgList[i].type = ["填空","图片"]
                            }
                        }
                    } else {
                        console.log(jsonObj.data);
                    }
                };


                // 将中文选项映射至英文
                this.typeSend = [];
                var i;
                for(i = 0; i < this.type.length; i+=1){
                    if(this.type[i] === "文字-选择"){
                        this.typeSend.push("chosen");
                    }
                    else if(this.type[i] === "文字-填空"){
                        this.typeSend.push("fill");
                    }
                    else if(this.type[i] === "图片-选择"){
                        this.typeSend.push("chosen-image");
                    }
                    else if(this.type[i] === "图片-填空"){
                        this.typeSend.push("fill-image");
                    }
                }

                getBackend("backend/square", {
                    "num":this.getMsgNum,
                    "type":this.typeSend,
                    "theme":this.theme,
                    "kw":this.keyword,
                }, onRespond);


                // for test only
                // while(this.msgList.length < 12){
                //     this.msgList.push({ 'id': -1, 'name': "none", 'user': "none",
                //         'questionNum': 1, 'questionForm': "judgement", 'is_banned':0,
                //         'total_ans':0, 'ans_num':0, 'deadline':"none", 'cash':"none",
                //         'tags':['food', 'sports'], "url":'@/assets/ground/6-1.jpg'});
                // }
            },

            deleteMsg(msgId){
                dealAdmin(msgId, 'mission_ban');
                console.log("delete message"+msgId);
                this.$message.success('删除成功', 2);
                var count = 0;
                this.msgList.forEach(function(item, index, arr) {
                    if(item.id === msgId) {
                        arr[index] = { 'id': -1, 'name': "none", 'user': "none",
                            'questionNum': 0, 'questionForm': "none", 'is_banned':0,
                            'total_ans':0, 'ans_num':0, 'deadline':"none", 'cash':"none", 'tags':""};
                    }
                    if(item.questionNum === 0){
                        count = count + 1;
                    }
                });
                console.log(count)
                if(count === 11){ // all deleted
                    this.current = this.current - 1;
                    this.onChange(this.current);
                    // this.totalMsgNum = this.totalMsgNum - 1;
                    console.log(this.totalMsgNum)
                }
                this.getNewInterest(this.intNum - 1)

                // reload
                // this.isRouterAlive = false
                // this.$nextTick(() => (this.isRouterAlive = true))
            },
            getOrder(msg, ground){
                let id = msg.id

                postBackend("backend/receive", {mission_id: id.toString()},
                    jsonObj => {
                        if (jsonObj.code === 201) {
                            if(msg.received === "T"){
                                msg.received = "F";
                                this.$message.warning('取消接单：'+msg.name, 2);
                            }else{
                                msg.received = "T";
                                this.$message.success('成功接单：'+msg.name, 2);
                            }
                            if(ground){
                                this.getNewInterest(this.intNum - 1)
                            }
                            else{
                                this.onChange(this.pageNumber)
                            }
                        } else {
                            console.log("can't book/unbook")
                        }
                    });
            },
            onSearch() {
                // this.keyword = value;
                this.onChange(1);
            },
            handleChangeTheme(value) {
                this.theme = value;
            },
            handleChangeType(value) {
                // this.typeCheckList.value = !this.typeCheckList.value;
                this.type = value;
            },
            sendSelect(){
                this.onChange(1);
            },
            changeType(){
                if(this.groundType === 1){
                    this.groundType = 2;
                }
                else{
                    this.groundType = 1;
                }
            },
            getNewInterest(num){
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        this.intList = data.question_list;
                        var i;
                        for(i = 0; i < 5; i+=1){
                            this.intList[i].deadline = convertTime(this.intList[i].deadline)
                            if(this.intList[i].questionForm === "chosen"){
                                this.intList[i].type = ["选择", "文字"]
                            }
                            else if(this.intList[i].questionForm === "chosen-image"){
                                this.intList[i].type = ["选择", "图片"]
                            }
                            else if(this.intList[i].questionForm === "fill"){
                                this.intList[i].type = ["填空",'文字']
                            }
                            else if(this.intList[i].questionForm === "fill-image"){
                                this.intList[i].type = ["填空","图片"]
                            }
                        }
                    } else {
                        console.log(jsonObj.data);
                    }
                };
                getBackend("backend/interest", {
                    "page":num*5,
                }, onRespond);
                this.intNum = num + 1;

                // for test only
                // while(this.intList.length < 5){
                //     this.intList.push({ 'id': -1, 'name': "none", 'user': "none",
                //         'questionNum': 1, 'questionForm': "judgement", 'is_banned':0,
                //         'total_ans':0, 'ans_num':0, 'deadline':"none", 'cash':"none",
                //         'tags':['food', 'sports'], "received":"F","type" : "选择"});
                // }
                // console.log(num)
            },
            goOrder(msg){
                if(msg.received === "F"){
                    postBackend("backend/receive", {mission_id: msg.id.toString()},
                        jsonObj => {
                            if (jsonObj.code === 201) {
                                this.$router.push('/question/'+msg.id+"/0");
                                this.onChange(this.pageNumber)
                            } else {
                                console.log("can't book/unbook")
                            }
                        });
                }
                else{
                    this.$router.push('/question/'+msg.id+"/0");
                }
            },
        },
        mounted:function () {   //自动触发写入的函数
            this.onChange(1);
            this.getNewInterest(0);
        },
    }

</script>

<style scoped>
    .content{
        background: #ffffff;
        padding: 30px
    }

    .portfolio .portfolio-item {
        margin-bottom: 30px;
    }

    .portfolio #portfolio-flters {
        padding: 0;
        margin: 0 auto 25px auto;
        list-style: none;
        text-align: center;
        background: white;
        border-radius: 50px;
        /*padding: 2px 15px;*/
    }

    .portfolio #portfolio-flters li {
        cursor: pointer;
        display: inline-block;
        /*padding: 8px 20px 12px 20px;*/
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
        color: #ffffff;
        margin: 0 4px 8px 4px;
        transition: all ease-in-out 0.3s;
        border-radius: 50px;
        background: #f2f2f2;
    }

    .portfolio #portfolio-flters li:hover, .portfolio #portfolio-flters li.filter-active {
        background: #e96b56;
        color: #fff;
    }

    .portfolio #portfolio-flters li:last-child {
        margin-right: 0;
    }

    .portfolio .portfolio-wrap {
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        z-index: 0;
        background: rgba(84, 84, 84, 0);
    }

    .portfolio .portfolio-wrap::before {
        content: "";
        background: rgba(84, 84, 84, 0.6);
        position: absolute;
        left: 30px;
        right: 30px;
        top: 30px;
        bottom: 30px;
        transition: all ease-in-out 0.3s;
        z-index: 0;
        opacity: 0;
    }

    .portfolio .portfolio-wrap .portfolio-info {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        z-index: 0;
        transition: all ease-in-out 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .portfolio .portfolio-wrap .portfolio-info::before {
        display: block;
        content: "";
        width: 48px;
        height: 48px;
        position: absolute;
        top: 35px;
        left: 35px;
        border-top: 3px solid #fff;
        border-left: 3px solid #fff;
        transition: all 0.5s ease 0s;
        z-index: 0;
    }

    .portfolio .portfolio-wrap .portfolio-info::after {
        display: block;
        content: "";
        width: 48px;
        height: 48px;
        position: absolute;
        bottom: 35px;
        right: 35px;
        border-bottom: 3px solid #fff;
        border-right: 3px solid #fff;
        transition: all 0.5s ease 0s;
        z-index: 0;
    }

    .portfolio .portfolio-wrap .portfolio-info h4 {
        font-size: 20px;
        color: #fff;
        font-weight: 600;
    }

    .portfolio .portfolio-wrap .portfolio-info p {
        color: #ffffff;
        font-size: 14px;
        text-transform: uppercase;
        padding: 0;
        margin: 0;
    }

    .portfolio .portfolio-wrap .portfolio-links {
        text-align: center;
        z-index: 0;
    }

    .portfolio .portfolio-wrap .portfolio-links i {
        color: #fff;
        margin: 0 2px;
        font-size: 28px;
        display: inline-block;
        transition: 0.3s;
    }

    .portfolio .portfolio-wrap .portfolio-links i:hover {
        color: #e96b56;
    }

    .portfolio .portfolio-wrap:hover::before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 1;
    }

    .portfolio .portfolio-wrap:hover .portfolio-info {
        opacity: 1;
    }

    .portfolio .portfolio-wrap:hover .portfolio-info::before {
        top: 15px;
        left: 15px;
    }

    .portfolio .portfolio-wrap:hover .portfolio-info::after {
        bottom: 15px;
        right: 15px;
    }

    .sidebar {
        padding: 30px;
        margin: 0 0 0 0;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        background: #ffffff;
        width: 400px;
    }

    .sidebar .sidebar-title {
        font-size: 20px;
        font-weight: 700;
        padding: 0 0 0 0;
        margin: 0 0 15px 0;
        color: #545454;
        position: relative;
    }

    .sidebar .sidebar-item {
        margin-bottom: 30px;
    }

</style>