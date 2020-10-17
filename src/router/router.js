import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import ground from "@/components/ground";
import rules from "@/components/rules";
import login from "@/components/login"
import signin from "@/components/signin"
import edit_question from "@/components/edit_question";
import create_mission from "@/components/create_mission";
import mission_field from "@/components/mission_field";

import user_page from "@/components/user_page";
import admin_page from "@/components/admin_page";

import answer_question from "@/components/answer_question";

// import login from "../static/login.html"

//定义routes路由的集合，数组类型

const routes=[
    { path: '/ground', component: ground },
    { path: '/rules', component: rules },
    { path: '', redirect: "ground" },
    { path: '/login', component: login },
    { path: '/signin', component: signin },
    { path: '/user', component: user_page },
    { path: '/admin', component: admin_page },
    { path: '/question/:id', component: answer_question },
    {
        path: '/mission',
        component: mission_field,
        children: [
            { path: 'create', component: create_mission },
            { path: 'edit', component: edit_question }
        ]
    }
]

const router = new VueRouter({
//ES6简写，等于routes：routes
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router