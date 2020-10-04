<template>
    <div class = "portfolio">
        <a-row type="flex" justify="space-around">
                <a-col :span="4" v-for="msg in msgList1" :key="msg">
                    <p></p>
                    <div class="portfolio-wrap">
                        <img v-if="msg.questionForm === 'judgement'" src="@/assets/judge.jpg" alt="" width="200" >
                        <div class="portfolio-info">
                            <h4>{{msg.name}}</h4>
                            <p>题目数量：{{msg.questionNum}}</p>
<!--                            <div class="portfolio-links">-->
<!--                                <a href="assets/img/portfolio/portfolio-1.jpg" data-gall="portfolioGallery" class="venobox" title="App 1"><i class="bx bx-plus"></i></a>-->
<!--                                <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>-->
<!--                            </div>-->
                        </div>
                    </div>
                    <p></p>
                </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
            <a-col :span="4" v-for="msg in msgList2" :key="msg">
                <p></p>
                <div class="portfolio-wrap">
                    <img v-if="msg.questionForm === 'judgement'" src="@/assets/judge.jpg" alt="" width="200" >
                    <div class="portfolio-info">
                        <h4>{{msg.name}}</h4>
                        <p>题目数量：{{msg.questionNum}}</p>
                    </div>
                </div>
                <p></p>
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
            <a-col :span="4" v-for="msg in msgList3" :key="msg">
                <p></p>
                <div class="portfolio-wrap">
                    <img v-if="msg.questionForm === 'judgement'" src="@/assets/judge.jpg" alt="" width="200" >
                    <div class="portfolio-info">
                        <h4>{{msg.name}}</h4>
                        <p>题目数量：{{msg.questionNum}}</p>
                    </div>
                </div>
                <p></p>
            </a-col>
        </a-row>
        <a-pagination v-model="current" v-bind:pageSize="pagesize" v-bind:total="totalMsgNum" :style="{textAlign: 'center' }" @change="onChange" />

    </div>
</template>

<script>
    export default {
        name: "ground",
        data(){
            return {
                msgList1:[],
                msgList2:[],
                msgList3:[],
                current: 1,
                totalMsgNum: 100,
                id: 1,
                pagesize: 12,
                getMsgNum:0,
                thisPageSize:12,
            }
        },
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
                        context.totalMsgNum = data.ret;
                        context.thisPageSize = context.totalMsgNum - (pageNumber-1)*12;
                        console.log(context.thisPageSize);
                        context.msgList1 = data.question_list.slice(0, context.min(4,context.thisPageSize));
                        context.msgList2 = data.question_list.slice(context.min(4,context.thisPageSize), context.min(8,context.thisPageSize));
                        context.msgList3 = data.question_list.slice(context.min(8,context.thisPageSize), context.min(12,context.thisPageSize));
                        console.log(context.msgList1)
                    }
                };
                this.getMsgNum = (pageNumber-1)*12;
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
        padding: 2px 15px;
    }

    .portfolio #portfolio-flters li {
        cursor: pointer;
        display: inline-block;
        padding: 8px 20px 12px 20px;
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
        color: #444444;
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
        z-index: 1;
        background: rgba(84, 84, 84, 0.6);
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
        z-index: 2;
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
        z-index: 3;
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
        z-index: 9994;
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
        z-index: 9994;
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
        z-index: 4;
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