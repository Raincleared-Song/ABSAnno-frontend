<template>
    <div>
        <a-descriptions title="用户信息">
            <a-descriptions-item label="用户名">
                {{this.username}}
            </a-descriptions-item>
            <a-descriptions-item label="用户积分">
                {{this.user_score}}
            </a-descriptions-item>
            <a-descriptions-item label="用户信誉">
                {{this.user_weight}}
            </a-descriptions-item>
            <a-descriptions-item label="用户答题数量/完成任务数">
                {{this.user_ans_num}}
            </a-descriptions-item>
            <a-descriptions-item label="Credit">
                Credit
            </a-descriptions-item>
        </a-descriptions>
    </div>
</template>

<script>
    export default {
        name: "basic_info"
    }
</script>

<style scoped>

</style>