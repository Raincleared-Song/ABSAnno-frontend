<template>
    <div>
        <a-row type="flex" justify="space-around" v-for="count2 in 3" :key="count2">
                <a-col :span="4" v-for="count in 4" :key="count">
                    <img src="@/assets/pic.jpg" alt="" width="200" >
                </a-col>
        </a-row>

        <a-pagination total="89" defaultCurrent = "1" :style="{textAlign: 'center' }"/>

    </div>
</template>

<script>
    export default {
        name: "ground",
        data(){
            return {
                msgList:[],
            }
        },
        methods: {
            getMsg(){
                const xhr = new XMLHttpRequest()
                let context = this
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201){
                        console.log(xhr.response);
                        context.msgList = xhr.response.data;
                    }
                };
                xhr.open("post","backend/square")
                xhr.send(JSON.stringify({'id': 1, 'num': 0}));
            },

        },
        mounted:function () {   //自动触发写入的函数
            this.getMsg();
        },
    }
</script>

<style scoped>

</style>