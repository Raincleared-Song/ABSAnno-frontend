<template>
    <a-collapse v-model="activeKey" :bordered="false" accordion >
        <a-collapse-panel v-for="pub in pubList" v-bind:key="pub" style="background: #ffffff;"
                          :disabled="pub.is_banned === 1 || pub.num === 0">
            <template slot="header">
                <a-list item-layout="horizontal" :data-source="[pub]">
                    <a-list-item slot="renderItem" slot-scope="msg" >
                        <a slot="actions" v-if="msg.to_be_check === 1" @click="checkMsg(msg.id)" style="color: #d95656">
                            手动验收
                        </a>
                        <a slot="actions" v-if="msg.showLegend === 1" @click="stopMsg(msg.id)">
                            直接收题
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
                                <a-tag v-if="msg.to_ans === 1" color="blue">
                                    进行中
                                </a-tag>
                            </a>
                            <a slot="description">
                                <div style="color: #5e5e5e" >
                                    <a-tag color="green">
                                        {{msg.type[0]}}
                                    </a-tag>
                                    <a-tag color="green">
                                        {{msg.type[1]}}
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
<!--          <a-table-->
<!--              :columns="columns"-->
<!--              :data-source="detailedInfo"-->
<!--          />-->
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
const columns = [
  {
    title: '题干',
    dataIndex: 'word',
  },
  {
    title: '标注答案',
    dataIndex: 'ans',
  },
  {
    title: '预设答案',
    dataIndex: 'pre_ans',
  },
  {
    title: '可信度',
    dataIndex: 'ans_weight',
    width: 100,
  },
  {
    title: '已作答人数',
    dataIndex: 'now_num',
    width: 100,
  },
];
    import getBackend from "../utils/getBackend";
    import postBackend from "@/utils/postBackend";
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
                    if (jsonObj.code !== 201) {
                        this.$message.error('An error occurred! Try later!');
                    }
                });
            },
            checkMsg(id){
                this.$router.push("/question/"+id.toString()+"/1");
            },
            stopMsg(id){
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        this.$message.success("已成功收题！",2)
                        this.refresh();
                    }
                };
                postBackend("backend/endmission", {
                    mission_id: id.toString()
                }, onRespond);
            },

            judgeDisable(msg){
            },

            refresh(){
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        this.pubList = data.mission_list;
                        var i;
                        console.log(this.pubList)
                        for(i = 0; i < this.pubList.length; i+=1){
                            this.pubList[i].deadline = convertTime(this.pubList[i].deadline)
                            if(this.pubList[i].question_form === "chosen"){
                                this.pubList[i].type = ["选择", "文字"]
                            }
                            else if(this.pubList[i].question_form === "chosen-image"){
                                this.pubList[i].type = ["选择", "图片"]
                            }
                            else if(this.pubList[i].question_form === "fill"){
                                this.pubList[i].type = ["填空",'文字']
                            }
                            else if(this.pubList[i].question_form === "fill-image"){
                                this.pubList[i].type = ["填空","图片"]
                            }
                            this.pubList[i].showLegend = this.pubList[i].to_ans;
                        }
                    }
                };
                getBackend("backend/user", {
                    "method": "mission"
                }, onRespond);
            }
        },

        watch: {
            activeKey: {
                handler: function (key) { // 点击题组，展示题组详情
                    console.log(key);
                    let onRespond = jsonObj => {
                        if (jsonObj.code === 201) {
                            let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                            this.detailedInfo = data.question_list;
                        }
                    };
                    getBackend("backend/mymission", {
                        mission_id: key.id.toString()
                    }, onRespond);
                },
                deep: true
            },
        },

        mounted() {
            this.refresh();
        }
    }
</script>

<style scoped>

</style>