<template>
    <div>
        <a-row type="flex" justify="space-around" v-for="count2 in 3" :key="count2">
                <a-col :span="4" v-for="count in 4" :key="count">
                    <img src="@/assets/pic.jpg" alt="" width="200" >
                </a-col>
        </a-row>

        <a-pagination v-model="current" v-bind:pageSize="pagesize" v-bind:total="msgNum" :style="{textAlign: 'center' }" @change="onChange" />

    </div>
</template>

<script>
    export default {
        name: "ground",
        data(){
            return {
                msgList:[],
                current: 1,
                msgNum: 100,
                id: 0,
                pagesize: 12,
            }
        },
        methods: {
            getMsg(){
                const xhr = new XMLHttpRequest()
                // let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201){
                        let res = JSON.parse(xhr.response);
                        if(res.data === "?"){
                            console.log("wrong")
                        }
                    }
                };
                xhr.open("post","backend/square")
                xhr.send(JSON.stringify({'id': 1, 'num': 1}));
            },
            onChange(pageNumber) {
                console.log('Page: ', pageNumber);
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201){
                        let res = JSON.parse(xhr.response);
                        context.msgList = res.data;
                        console.log(res.data);
                    }
                };
                xhr.open("post","backend/square")
                xhr.send(JSON.stringify({'id': 1, 'num': pageNumber-1}));
            },
        },
        mounted:function () {   //自动触发写入的函数
            this.getMsg();
        },
    }
</script>

<style scoped>

</style>