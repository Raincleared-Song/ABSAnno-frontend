<template>
    <div>
        <div class="components-input-demo-presuffix">
            <h3>你可以在此改变你的用户名（留空来保持不变）</h3>
            <a-input-group compact>
                <a-input ref="userNameInput" placeholder="User name" v-model="user_name">
                    <a-icon slot="prefix" type="user" />
                    <a-tooltip slot="suffix" title="You can change your username here">
                        <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                </a-input>
            </a-input-group>
            <br/>
        </div>
        <div>
            <h3>选择你喜欢的题目类型</h3>
            <div>
                <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                        Check all
                    </a-checkbox>
                </div>
                <br />
                <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onCheckListChange" />
            </div>
        </div>
        <div>
            <h3>选择你偏好的题目数量</h3>
            <a-select default-value="num1" style="width: 120px" @change="handleNumberChange">
                <a-select-option value="num1">
                    题目数量1
                </a-select-option>
                <a-select-option value="num2">
                    题目数量2
                </a-select-option>
                <a-select-option value="num3">
                    题目数量3
                </a-select-option>
                <a-select-option value="num4">
                    题目数量4
                </a-select-option>
            </a-select>
        </div>
        <div>
            <h3>是否提交？</h3>
            <a-button-group>
                <a-button @click="change(0)">Cancel</a-button>
                <a-button type="primary" @click="submitChange">
                    OK
                </a-button>
            </a-button-group>
        </div>
    </div>
</template>

<script>
    const answerListData = [];
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const defaultCheckedList = ['Apple', 'Orange'];
    export default {
        name: "edit_info",
        data () {
            return {
                // answerListData,
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

                checkedList: defaultCheckedList,
                indeterminate: true,
                checkAll: false,
                plainOptions,
            }
        },
        methods: {
            submitChange() {
            },
            onCheckListChange(checkedList) {
                this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
                this.checkAll = checkedList.length === plainOptions.length;
                console.log(checkedList)
            },
            onCheckAllChange(e) {
                Object.assign(this, {
                    checkedList: e.target.checked ? plainOptions : [],
                    indeterminate: false,
                    checkAll: e.target.checked,
                });
            },
            handleNumberChange(value) {
                console.log(`selected ${value}`);
                this.desireNum = value
            },
        },

        created: function () {
            // this.change(0);
            console.log("in created function")
        },
    }
</script>

<style scoped>

</style>