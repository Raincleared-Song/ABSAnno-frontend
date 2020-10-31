<template>
    <div>
        <a-list item-layout="vertical" size="medium" :pagination="pagination" :data-source="answerListData">
            <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                <template v-for="{ type, text } in actions" slot="actions">
                      <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        {{ text + item[type] }}
                      </span>
                </template>
                <a-list-item-meta :description="item.qClass">
                    <a slot="title" >{{ item.qName }}</a>
                </a-list-item-meta>

            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "history",
        data () {
            return {
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                },
                actions: [
                    { type: 'qUser', text: 'Published by: ' },
                    { type: 'qTime', text: 'Published on: ' },
                ],

                collapsed: false,
                page_number: 3,
                userid: -1,
                info: [],
                answerList: [],
                myPublish: [],
                pageList: ['user', 'history', 'mission', 'editUser'],
                pageListChinese: ['用户信息', '答题历史', '我的发布', '修改个人信息'],
                user_power: ['未登录', '用户', '发布者', '管理员'],


                user_name: this.username,
                user_score: 0,
                user_weight: 0,
                user_ans_num: 0,

                totalNum: 10, // 总共回答了多少道题

                desireNum: "",

                indeterminate: true,
                checkAll: false,
            }
        },
        props: [
            "power",
            "username"
        ],
    }
</script>

<style scoped>

</style>