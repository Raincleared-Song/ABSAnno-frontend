<template>
    <el-table
            :data="msgList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'ascending'}"
            :row-class-name="warnDDL">
        <el-table-column
                prop="deadline"
                label="截止日期"
                sortable
                width="120">
        </el-table-column>
        <el-table-column
                prop="mission_name"
                label="任务名称"
                width="180">
            <template slot-scope="scope">
                {{scope.row.mission_name}}
                <a-tag color="green">
                    {{scope.row.question_form}}
                </a-tag>
            </template>
        </el-table-column>
        <el-table-column
                prop="question_num"
                label="题目数量"
                width="80">
        </el-table-column>
        <el-table-column
                prop="mission_reward"
                label="悬赏金额"
                width="80">
        </el-table-column>
        <el-table-column
            prop="mission_info"
            label="任务简介">
        </el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope">
                <router-link v-if="power!==-1" :to="{path:'/question/'+ scope.row.id}">
                    <el-button size="mini">做题</el-button>
                </router-link>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import postBackend from "../utils/postBackend"
    import getBackend from "../utils/getBackend"

    export default {
        name: "orders",
        data(){
            return {
                msgList:[],
                current: 1,
                totalMsgNum: 1,
                pagesize: 12,
                getMsgNum:0,
                groundType: 1,
                isRouterAlive: true,
                keyword:"",
            }
        },

        props:[
            "username",
            "power",
        ],

        methods: {
            handleDelete(index, row) {
                console.log(row)
                postBackend("backend/receive", {mission_id: row.id.toString()},
                    jsonObj => {
                        if (jsonObj.code === 201) {
                            console.log("book success")
                        } else {
                            console.log("can't book/unbook")
                        }
                    });
            },

            warnDDL({row, rowIndex}) {
                if (row.deadline === this.getNowFormatDate()) {
                    return 'warning-row';
                }
                return '';
            },

            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            }
        },

        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                    this.msgList = data.rep_list;
                }
            };
            getBackend("backend/repshow", {}, onRespond);
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }
</style>