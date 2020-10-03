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
        methods: {
            getMsg(){
                // console.log(this.name, this.secret)
                // TODO 直接在这里与后端交互
                this.$emit('msg',this.name,this.secret)
                if(this.showLogin){
                    // TODO 后端判断用户名和密码是否匹配后返回
                    this.$router.push('/ground');
                }
            },
        },
    }

</script>

<style scoped>

</style>