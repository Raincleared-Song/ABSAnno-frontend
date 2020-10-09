<template >
    <a-layout id="components-layout-demo-fixed" >
<!--        <a-config-provider :autoInsertSpaceInButton="false">-->
            <navigation @logout='logout' :id="userId" :username="userName"/>
<!--        </a-config-provider>-->

        <a-layout-content :style="{ padding: '0 50px', marginTop: '100px' }" >
            <div :style="{ background: '#fff', padding: '24px', minHeight: '610px' }" >
            <router-view :username="userName" :id="userId" @login="login"></router-view>
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
        background: #000000 url(assets/logo.jpg) no-repeat center;
        margin: 16px 24px 16px 0;
        float: left;
    }

</style>

<script>
    import navigation from "@/components/navigation";
    // import '@/assets/css/global.scss';
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
            },
            login(data){
                // console.log(data)
                this.userId=data.id;
                this.userName=data.name;
                console.log(this.userName);
            }
        }
    }
</script>