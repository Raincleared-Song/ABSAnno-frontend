<template>
    <div>
        <a-divider>待审批升级用户</a-divider>
        <user-manage :username="username" :power="power"/>
        <a-divider>封禁用户</a-divider>
        <banuser :username="username" :power="power"/>
    </div>
</template>

<script>
    import Banuser from "./manager/banuser";
    import UserManage from "./manager/userManage";
    export default {
        name: "manager",
        components: {UserManage, Banuser},
        props:[
            "username",
            "power",
        ],
    }
</script>

<style scoped>

</style>