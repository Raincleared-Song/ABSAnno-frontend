import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import ground from "@/components/ground";
import rules from "@/components/rules";
import edit_question from "@/components/edit_question";
import login from "@/components/login"
import signin from "@/components/signin"

import user_page from "@/components/user_page";
import admin_page from "@/components/admin_page";

import answer_question from "@/components/answer_question";
import banuser from "@/components/banuser"

//定义routes路由的集合，数组类型

const routes=[
    {path:'/ground',component:ground},
    {path:"/edit",component:edit_question},
    {path:"/rules",component:rules},
    {path:'',redirect:"ground"},
    {path:'/login',component:login},
    {path:'/signin',component: signin},
    {path:'/user',component: user_page},
    {path:'/admin',component: admin_page},
    {path:'/question/:id', component: answer_question},
    {path:'/users',component: banuser},
]

const router = new VueRouter({
//ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router