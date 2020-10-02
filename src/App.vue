<template>
    <a-layout id="components-layout-demo-fixed">
        <navigation @showLogin="showLoginFunc"/>

        <a-layout-content :style="{ padding: '0 50px', marginTop: '100px' }">
            <div :style="{ background: '#fff', padding: '24px', minHeight: '610px' }">
            <router-view></router-view>
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
    import ground from "@/components/ground";
    import edit_question from "@/components/edit_question";
    import login from "@/components/login"
    export default {
        name: 'Home',
        components: {
            navigation,
        },
    }
</script>