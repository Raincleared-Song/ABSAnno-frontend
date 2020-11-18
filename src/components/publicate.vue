<template>
    <a-collapse v-model="activeKey" :bordered="false" accordion >
        <a-collapse-panel v-for="pub in pubList" v-bind:key="pub" style="background: #ffffff;"
                          :disabled="pub.is_banned === 1 || pub.num === 0">
            <template slot="header">
                <a-list item-layout="horizontal" :data-source="[pub]">
                    <a-list-item slot="renderItem" slot-scope="msg" >
                        <a slot="actions" v-if="msg.to_ans === 1" @click="checkMsg(msg.id)" style="color: #d95656">
                            手动验收
                        </a>
                        <a slot="actions"
                                :href="`/backend/result?mission_id=${msg.id}`">
                            下载结果
                        </a>
                        <a-list-item-meta>
                            <a slot="title" style="font-size: 15pt" >
                                {{ msg.name }}
                                <a-tag v-if="msg.is_banned === 1" color="red">
                                    被封禁
                                </a-tag>
                                <a-tag v-if="msg.num === 0" color="orange">
                                    未被作答
                                </a-tag>
                            </a>
                            <a slot="description">
                                <div style="color: #5e5e5e" >
                                    <a-tag color="green">
                                        {{msg.type}}
                                    </a-tag>
                                    题目数量：{{msg.question_num}}
                                    <a-divider type="vertical" />
                                    <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />{{msg.deadline}}
                                    <a-divider type="vertical" />
                                    预期作答数量：{{msg.total}}
                                    <a-divider type="vertical" />
                                    {{msg.info}}
                                </div>
                            </a>
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </template>
            <el-table
                    :data="detailedInfo"
                    style="width: 100%"
                    :default-sort = "{prop: 'date', order: 'ascending'}"
                    size = "small"
                    stripe="true"
            >
                <el-table-column
                        prop="word"
                        label="题干">
                </el-table-column>
                <el-table-column
                        prop="ans"
                        label="标注答案">
                </el-table-column>
                <el-table-column
                        prop="pre_ans"
                        label="预设答案">
                </el-table-column>
                <el-table-column
                        prop="ans_weight"
                        label="可信度"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="now_num"
                        label="已作答人数">
                </el-table-column>
            </el-table>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
    import getBackend from "../utils/getBackend"
    import API from "../utils/API"
    import convertTime from "../utils/convertTime";

    export default {
        name: "publicate",
        props: [
            'username',
            'power',
            'avatar'
        ],
        data() {
            return {
                activeKey: [],
                pubList:[],
                detailedInfo:[],
            };
        },
        methods: {
            downloadMsg(id){
                getBackend(API.GET_RESULT, {
                    mission_id: id
                }, jsonObj => {
                    if (jsonObj.code === 201) {
                        // TODO: download
                    } else {
                        this.$message.error('An error occurred! Try later!');
                    }
                });
            },
            checkMsg(id){
                this.$router.push("/question/"+id.toString()+"/1")
                // let onRespond = jsonObj => {
                //     if (jsonObj.code === 201) {
                //         let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                //         this.detailedInfo = data.question_list;
                //     }
                // };
                // getBackend("backend/check", {
                //     "mission_id":id.toString()
                // }, onRespond);
            },
            judgeDisable(msg){

            },
        },

        watch: {
            activeKey(key) { // 点击题组，展示题组详情
                // console.log(key.id);
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        this.detailedInfo = data.question_list;
                    }
                };
                getBackend("backend/mymission", {
                    mission_id:key.id.toString()
                }, onRespond);
            },
        },

        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                    this.pubList = data.mission_list;
                    var i;
                    console.log(this.pubList)
                    for(i = 0; i < this.pubList.length; i+=1){
                        this.pubList[i].deadline = convertTime(this.pubList[i].deadline)
                        if(this.pubList[i].question_form === "judgement" ||
                            this.pubList[i].question_form === "judgement-image") {
                            this.pubList[i].type = "判断"
                        }
                        else if(this.pubList[i].question_form === "chosen" ||
                            this.pubList[i].question_form === "chosen-image") {
                            this.pubList[i].type = "选择"
                        }
                    }
                }
            };
            getBackend("backend/user", {
                "method": "mission"
            }, onRespond);
        }
    }
</script>

<style scoped>

</style>