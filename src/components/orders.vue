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
                prop="name"
                label="任务名称"
                width="180">
            <template slot-scope="scope">
                {{scope.row.name}}
                <a-tag color="green">
                    {{scope.row.questionForm}}
                </a-tag>
            </template>
        </el-table-column>
        <el-table-column
                prop="questionNum"
                label="题目数量"
                width="80">
        </el-table-column>
        <el-table-column
                prop="cash"
                label="悬赏金额"
                width="80">
        </el-table-column>
        <el-table-column
                prop="user"
                label="发布者"
                width="120">
        </el-table-column>
        <el-table-column
                prop="tags"
                label="标签">
        </el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">做题</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "orders",
        data(){
            return {
                msgList:[{
                    'id': -1, 'name': "none", 'user': "none",
                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                    'total_ans': 0, 'ans_num': 0, 'deadline': "2020-12-10", 'cash': "none",
                    'tags': "test||what else"
                },{
                    'id': -1, 'name': "none", 'user': "none",
                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                    'total_ans': 0, 'ans_num': 0, 'deadline': "2020-12-20", 'cash': "none",
                    'tags': "test||what else"
                },{
                    'id': -1, 'name': "none", 'user': "none",
                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                    'total_ans': 0, 'ans_num': 0, 'deadline': "2020-11-01", 'cash': "none",
                    'tags': "test||what else"
                },],
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
            handleEdit(index, row) {
                // console.log(index, row);
            },
            handleDelete(index, row) {
                // console.log(index, row);
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
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }
</style>