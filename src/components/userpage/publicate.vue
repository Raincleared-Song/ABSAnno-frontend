<template>
    <a-collapse default-active-key="1" :bordered="false" accordion>
        <a-collapse-panel v-for="pub in pubList" v-bind:key="pub"
                          style="background: #ffffff;">
            <template slot="header">
                <a-list item-layout="horizontal" :data-source="[pub]">
                    <a-list-item slot="renderItem" slot-scope="msg" >
                        <a slot="actions" @click="checkMsg(msg.id)" style="font-size: 15pt; color: #d95656"><a-icon type="pause" /></a>
                        <a slot="actions" @click="downloadMsg(msg.id)" style="font-size: 15pt"><a-icon type="download" /></a>
<!--                        <a slot="actions" @click="deleteMsg(msg.id)" style="color: #ff5c4d">删除题目</a>-->
                        <a-list-item-meta>
                            <a slot="title" style="font-size: 15pt" >{{ msg.name }}</a>
                            <a slot="description">
                                <div style="color: #5e5e5e" >
                                    <a-tag color="green">
                                        {{msg.questionForm}}
                                    </a-tag>
                                    题目数量：{{msg.questionNum}}
                                    <a-divider type="vertical" />
                                    <a-icon type="clock-circle" theme="twoTone" two-tone-color="#4dc7ff" />{{msg.deadline}}
                                    <a-divider type="vertical" />
                                    <a-icon type="fire" theme="twoTone" two-tone-color="#ff4d4f" />{{msg.ans_num}}/{{msg.total_ans}}
                                    <a-divider type="vertical" />
                                    <a-tag v-bind:key="tag" v-for="tag in msg.tags">
                                        {{tag}}
                                    </a-tag>
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
    export default {
        name: "publicate",
        data() {
            return {
                activeKey: ['1'],
                customStyle:
                    'margin-bottom: 10px; margin-top: 5px; ',
                pubList:[{
                    'id': -1, 'name': "none", 'user': "none",
                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                    'total_ans': 0, 'ans_num': 0, 'deadline': "none", 'cash': "none",
                    'tags': ""
                },
                    {
                        'id': 1, 'name': "none", 'user': "none",
                        'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                        'total_ans': 0, 'ans_num': 0, 'deadline': "none", 'cash': "none",
                        'tags': ""
                    }],
                detailedInfo:[{
                    'id': -1, 'name': "none", 'user': "none",
                    'questionNum': 0, 'questionForm': "none", 'is_banned': 0, 'full': 0,
                    'total_ans': 0, 'ans_num': 0, 'deadline': "none", 'cash': "none",
                    'tags': ""
                }],
            };
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            downloadMsg(id){
                console.log(id)
            },
            checkMsg(id){
                console.log(id)
            },
        }
    }
</script>

<style scoped>

</style>