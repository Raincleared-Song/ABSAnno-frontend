<template>
    <a-collapse v-model="activeKey" :bordered="false" accordion>
        <a-collapse-panel v-for="pub in pubList" v-bind:key="pub"
                          style="background: #ffffff;" :disabled="pub.is_banned === true || pub.is_banned === 1">
            <template slot="header">
                <a-list item-layout="horizontal" :data-source="[pub]">
                    <a-list-item slot="renderItem" slot-scope="msg" >
                        <a slot="actions" @click="checkMsg(msg.id)" style="font-size: 15pt; color: #d95656"><a-icon type="pause" /></a>
                        <a slot="actions" @click="downloadMsg(msg.id)" style="font-size: 15pt"><a-icon type="download" /></a>
                        <a-list-item-meta>
                            <a slot="title" style="font-size: 15pt" >{{ msg.name }}</a>
                            <a slot="description">
                                <div style="color: #5e5e5e" >
                                    <a-tag color="green">
                                        {{msg.question_form}}
                                    </a-tag>
                                    题目数量：{{msg.question_num}}
                                    <a-divider type="vertical" />
                                    <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />{{msg.deadline}}
                                    <a-divider type="vertical" />
                                    <a-icon type="fire" theme="twoTone" two-tone-color="#ff4d4f" />{{msg.now}}/{{msg.total}}
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
            </el-table>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
    import postBackend from "../utils/postBackend"
    import getBackend from "../utils/getBackend"

    export default {
        name: "publicate",
        props: [
            'username',
            'power'
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
                console.log(id) // TODO
            },
            checkMsg(id){
                let onRespond = jsonObj => {
                    if (jsonObj.code === 201) {
                        let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                        this.detailedInfo = data.question_list;
                    }
                };
                getBackend("backend/check", {
                    "mission_id":id.toString()
                }, onRespond);
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
                    "mission_id":key.id.toString()
                }, onRespond);
            },
        },

        mounted() {
            let onRespond = jsonObj => {
                if (jsonObj.code === 201) {
                    let data = JSON.parse(jsonObj.data.replace(/'/g, '"'));
                    this.pubList = data.mission_list;
                }
            };
            getBackend("backend/user", {
                "method":"mission"
            }, onRespond);
        }
    }
</script>

<style scoped>

</style>