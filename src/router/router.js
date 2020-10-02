import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import ground from "@/components/ground";
import rules from "@/components/rules";
import edit_question from "@/components/edit_question";
import login from "@/components/login"
import signin from "@/components/signin"
// import login from "../static/login.html"
//定义routes路由的集合，数组类型
const routes=[
    {path:'/ground',component:ground},
    {path:"/edit",component:edit_question},
    {path:"/rules",component:rules},
    {path:'',redirect:"ground"},
    {path:'/login',component:login},
    {path:'/signin',component: signin}
]

const router=new VueRouter({
//ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router