<template>
    <div class = "portfolio">
        <a-row type="flex" justify="space-around">
                <a-col :span="5" v-for="msg in msgList" :key="msg">
                    <div v-if="msg.questionForm !== 'none'" class="portfolio-wrap" align="center">
<!--                        图片尺寸：500*350            -->
                        <img v-if="msg.questionForm === 'judgement'" src="@/assets/judge.jpg" alt="" width="210" >
                        <div  class="portfolio-info">
                            <h4>{{msg.name}}</h4>
                            <p>题目数量：{{msg.questionNum}}</p>
                            <div class="portfolio-links">
                                <div class="icons-list">
                                    <router-link v-if="id!==0" :to="{path:'/question/'+ msg.id}"><a-icon type="form"/></router-link>
                                    <a-popover title="题组详情" trigger="hover">
                                        <template slot="content">
                                            题目：{{msg.name}}<br />
                                            题目数量：{{msg.questionNum}}<br />
                                            发布者：{{msg.user}}<br />
                                            题目类型：{{msg.questionForm}}
                                        </template>
                                        <router-link to="/rules">
                                            <a-icon type="info-circle" />
                                        </router-link>
                                    </a-popover>
                                </div>
                            </div>
                        </div>
                    </div>
<!--                    空白答题页面的填充-->
                    <div v-if="msg.questionForm === 'none'" align="center">
                        <!--                        图片尺寸：500*350            -->
                        <img src="@/assets/blank.jpg" alt="" width="210" >
                    </div>
                </a-col>
        </a-row>
        <p></p>
        <a-pagination v-model="current" v-bind:pageSize="pagesize" v-bind:total="totalMsgNum"
                      :style="{textAlign: 'center' }" @change="onChange" />

    </div>
</template>

<script>
    export default {
        name: "ground",
        data(){
            return {
                msgList:[],
                current: 1,
                totalMsgNum: 1,
                // id: 1,
                pagesize: 12,
                getMsgNum:0,
                thisPageSize:12,
            }
        },
        props:[
            "username",
            "id",
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
                    if (xhr.readyState === 4 && xhr.status === 201){
                        let res = JSON.parse(xhr.responseText);
                        let data = JSON.parse(res.data.replace(/'/g,'"'));
                        context.totalMsgNum = data.total;
                        context.thisPageSize = context.totalMsgNum - (pageNumber-1)*12;
                        context.msgList = data.question_list
                        // console.log("backend/square?id="+this.id.toString()+"&num="+this.getMsgNum.toString());
                        while(context.msgList.length < 12){
                            context.msgList.push({ 'id': -1, 'name': "none", 'user': "none",
                                'questionNum': 0, 'questionForm': "none"});
                        }
                    }
                };
                this.getMsgNum = (pageNumber-1)*12;
                console.log("backend/square?id="+this.id.toString()+"&num="+this.getMsgNum.toString());
                xhr.open("get","backend/square?id="+this.id.toString()+"&num="+this.getMsgNum.toString());
                xhr.send();
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