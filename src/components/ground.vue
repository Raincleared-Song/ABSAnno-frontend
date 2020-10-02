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
        name: "ground"
    }
</script>

<style scoped>

</style>