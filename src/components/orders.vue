<template>
    <el-table
            :data="msgList"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'ascending'}"
            :row-class-name="warnDDL">
        <el-table-column
                prop="deadline"
                label="最晚作答时间"
                sortable
                width="150">
        </el-table-column>
        <el-table-column
                prop="mission_name"
                label="任务名称"
                width="180">
            <template slot-scope="scope">
                {{scope.row.mission_name}}
                <a-tag color="green">
                    {{scope.row.type}}
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
                width="100"
                sortable
        >
        </el-table-column>
        <el-table-column
                prop="mission_info"
                label="任务简介">
        </el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope">
                <a-space>
                    <router-link v-if="power!==-1" :to="{path:'/question/'+ scope.row.mission_id}+'/0'">
                        <el-button size="mini">做题</el-button>
                    </router-link>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </a-space>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import postBackend from "../utils/postBackend"
    import getBackend from "../utils/getBackend"
    import convertTime from "../utils/convertTime";

    export default {
        name: "orders",
        data(){
            return {
                msgList:[],
                size:0,
            }
        },

        props:[
            "username",
            "power",
            "avatar"
        ],

        methods: {
            handleDelete(index, row) {
                console.log(row)
                postBackend("backend/receive", {mission_id: row.mission_id.toString()},
                    jsonObj => {
                        if (jsonObj.code === 201) {
                            console.log("book deleted")
                        } else {
                            console.log("can't undo book")
                        }
                    });
                var i;
                for(i = 0; i < this.size; i+=1) {
                    if(this.msgList[i].mission_id === row.mission_id){
                        this.msgList.splice(i, 1)
                    }
                }
            },

            warnDDL({row, rowIndex}) {
                var date = new Date().getTime()
                if (row.deadline === convertTime(date)) {
                    return 'warning-row';
                }
                return '';
            },
        },

        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                    this.msgList = data.rep_list;
                    var i;
                    this.size=data.total_num
                    for(i = 0; i < data.total_num; i+=1){
                        this.msgList[i].deadline = convertTime(this.msgList[i].deadline)
                        if(this.msgList[i].question_form === "judgement"){
                            this.msgList[i].type = "判断"
                        }
                        else if(this.msgList[i].question_form === "chosen"){
                            this.msgList[i].type = "选择"
                        }
                        else{
                            this.msgList[i].type = "图片"
                        }
                    }
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