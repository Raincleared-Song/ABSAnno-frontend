<template>
    <a-layout id="components-layout-demo-fixed">
        <a-config-provider :autoInsertSpaceInButton="false">
            <navigation @logout='logout' :id="userId"/>
        </a-config-provider>

        <a-layout-content :style="{ padding: '0 50px', marginTop: '100px' }">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '580px' }">
            <router-view :username="userName" :id="userId"></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            ABSTRACT Testing
        </a-layout-footer>
    </a-layout>

</template>

<style>
    #components-layout-demo-fixed .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
    }

</style>

<script>
    import navigation from "@/components/navigation";
    export default {
        name: 'Home',
        components: {
            navigation,
        },
        data(){
            return {
                userId:0,
                userName:"游客，请登录/注册",
            }
        },
        methods: {
            logout(data) {
                this.userId=0;
                this.userName="游客，请登录/注册";
                console.log("logout!");
            }
        }
    }
</script>