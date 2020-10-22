<template>
    <div>
        <!--   导航栏，提供检索功能     -->
        <div>
            <a-row >
                <a-col :span="7">
                    <a-input-search placeholder="请输入题目关键词" enter-button @search="onSearch" />
                </a-col>
            </a-row>
            <br/>
            <a-row >
                <a-col :span="8">
                    题目类型
                    <a-select
                            mode="multiple"
                            :default-value="type"
                            style="width: 70%"
                            placeholder="请选择您期待的题目类型"
                            @change="handleChangeType"
                    >
                        <a-select-option v-for="t in typeTotal" :key="t">
                            {{t}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8">
                    题目主题
                    <a-select
                            mode="multiple"
                            :default-value="theme"
                            style="width: 70%"
                            placeholder="请选择您期待的题目主题"
                            @change="handleChangeTheme"
                    >
                        <a-select-option v-for="t in themeTotal" :key="t">
                            {{t}}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="2">
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
            <a-row type="flex" justify="space-around" v-if="isRouterAlive">
                <a-col :span="5" v-for="msg in msgList" :key="msg">
                    <div v-if="msg.questionForm !== 'none'" class="portfolio-wrap" align="center">

                        <!--                        图片尺寸：500*350            -->

                        <img v-if="msg.questionForm === 'judgement'" src="@/assets/ground/judgement2.jpg" alt="" width="230" >
                        <img v-if="msg.questionForm === 'chosen'" src="@/assets/ground/choice2.jpg" alt="" width="230" >
                        <div  class="portfolio-info">
                            <h4>{{msg.name}}</h4>
                            <p>题目数量：{{msg.questionNum}}</p>
                            <div class="portfolio-links">
                                <div class="icons-list">
                                    <router-link v-if="power!==-1" :to="{path:'/question/'+ msg.id}"><a-icon type="form"/></router-link>

                                    <a-popover :title="msg.title+' 题组'" trigger="hover">
                                        <template slot="content">
                                            题目数量：{{msg.questionNum}}<br />
<!--                                            <a-icon type="dollar"  theme="twoTone" two-tone-color="#ffb84d"  />-->
                                            悬赏金额：{{msg.cash}}<br/>
<!--                                            <a-icon type="user" />-->
                                            发布者：{{msg.user}}<br />
<!--                                            <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />-->
                                            截止时间：{{msg.deadline}}<br/>
<!--                                            <a-icon type="fire" theme="twoTone" two-tone-color="#ff4d4f" />-->
                                            完成情况：{{msg.ans_num}}/{{msg.total_ans}}<br/>
                                            <a-icon type="tags" />
                                            {{msg.tags.toString()}}
<!--                                            <div v-bind:key="tag" v-for="tag in msg.tags">-->
<!--                                                {{tag}}-->
<!--                                            </div>-->
                                            <!--                                            点击按钮，查看规则说明-->
                                        </template>
                                        <router-link to="/rules">
                                            <a-icon type="info-circle" />
                                        </router-link>
                                    </a-popover>
                                    <router-link v-if="power===2" to="/ground">
                                        <a-icon type="delete" @click="deleteMsg(msg.id)"/>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

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
            <a-list item-layout="horizontal" :data-source="msgList" v-if="isRouterAlive">
                <a-list-item slot="renderItem" slot-scope="msg" v-if="msg.questionNum !== 0">
                    <a slot="actions" v-if="power!==-1">
                        <router-link  :to="{path:'/question/'+ msg.id}">做题</router-link>
                    </a>
                    <a slot="actions" v-if="power===2" @click="deleteMsg(msg.id)" style="color: #ff5c4d">删除</a>
                    <a-list-item-meta>
                        <a v-if="power!==-1" slot="title" :href="'/#/question/'+ msg.id" >{{ msg.name }}
<!--                            <a-tag color="cyan">-->
<!--                                {{msg.questionForm}}-->
<!--                            </a-tag>-->
                        </a>
                        <a v-if="power===-1" slot="title"  style="font-size: 15pt" >{{ msg.name }}

                        </a>
                        <a slot="description">
                            <div style="color: #5e5e5e">
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
                                <a-divider type="vertical" />
                                <a-tag v-bind:key="tag" v-for="tag in msg.tags">
                                    {{tag}}
                                </a-tag>
                            </div>
                        </a>
                    </a-list-item-meta>
<!--                    <div>-->
<!--                        <a-tag color="cyan">-->
<!--                            {{msg.questionForm}}-->
<!--                        </a-tag>-->
<!--                    </div>-->
                </a-list-item>
            </a-list>
        </div>

        <p></p>
<!--   分页符     -->
        <a-pagination v-model="current" v-bind:pageSize="pagesize" v-bind:total="totalMsgNum"
                      :style="{textAlign: 'center' }" @change="onChange" v-if="isRouterAlive"/>
    </div>
</template>

<script>
    import dealAdmin from "@/utils/admin"
    import getBackend from "@/utils/getBackend";
    import API from "@/utils/API";
    export default {
        name: "ground",
        data(){
            return {
                msgList:[],
                current: 1,
                totalMsgNum: 1,
                pagesize: 12,
                getMsgNum:0,
                // thisPageSize:12,
                // type:["全部"],
                // theme:["全部"],
                // themeTotal:["全部","食物", "风景","宠物","运动"],
                // typeTotal:["全部","文字","图片","选择","判断"],
                type:["total"],
                theme:["total"],
                themeTotal:["total","science", "art","sports","literature","food","music","game","daily","others"],
                typeTotal:["total","judgement","chosen"],
                groundType: 1,
                isRouterAlive: true,
                keyword:"",
            }
        },
        props:[
            "username",
            "power",
        ],
        methods: {
            min(a, b){
                if(a>b) return b;
                return a;
            },

            onChange(pageNumber) {
                this.current = pageNumber;
                console.log('Page: ', pageNumber);
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 201) {
                            let res = JSON.parse(xhr.responseText);
                            // console.log(res);
                            let data = JSON.parse(res.data.replace(/'/g, '"'));
                            context.totalMsgNum = data.total;
                            // context.thisPageSize = context.totalMsgNum - (pageNumber-1)*12;
                            context.msgList = data.question_list;
                            while (context.msgList.length < 12) {
                                context.msgList.push({
                                    'id': -1, 'name': "none", 'user': "none",
                                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0,
                                    'total_ans': 0, 'ans_num': 0, 'deadline': "none", 'cash': "none",
                                    'tags': []
                                });
                            }
                        } else {
                            console.log(xhr.responseText);
                        }
                    }
                };
                this.getMsgNum = (pageNumber - 1) * 12;
                // 请求带上所有的标签和关键词，一个请求就可以发送

                console.log(this.getMsgNum);
                console.log(`backend/square?num=${this.getMsgNum}&type=${this.type}&theme=${this.theme}&kw=${this.keyword}`);
                xhr.open("get",`backend/square?num=${this.getMsgNum}&type=${this.type}&theme=${this.theme}&kw=${this.keyword}`);
                xhr.send();

                // for test only
                // while(context.msgList.length < 12){
                //     context.msgList.push({ 'id': -1, 'name': "none", 'user': "none",
                //         'questionNum': 1, 'questionForm': "judgement", 'is_banned':0,
                //         'total_ans':0, 'ans_num':0, 'deadline':"none", 'cash':"none",
                //         'tags':['food', 'sports']});
                // }
            },

            deleteMsg(msgId){
                dealAdmin(msgId, 'mission_ban');
                console.log("delete message"+msgId);
                var count = 0;
                this.msgList.forEach(function(item, index, arr) {
                    if(item.id === msgId) {
                        arr[index] = { 'id': -1, 'name': "none", 'user': "none",
                            'questionNum': 0, 'questionForm': "none", 'is_banned':0,
                            'total_ans':0, 'ans_num':0, 'deadline':"none", 'cash':"none", 'tags':[]};
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
                // reload
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            },
            onSearch(value) {
                this.keyword = value;
                this.onChange(1);
            },
            handleChangeTheme(value) {
                this.theme = value;
            },
            handleChangeType(value) {
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
        },
        mounted:function () {   //自动触发写入的函数
            this.onChange(1);
        },
    }

</script>

<style scoped>
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

    .portfolio .portfolio-wrap .portfolio-links a {
        color: #fff;
        margin: 0 2px;
        font-size: 28px;
        display: inline-block;
        transition: 0.3s;
    }

    .portfolio .portfolio-wrap .portfolio-links a:hover {
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
</style>