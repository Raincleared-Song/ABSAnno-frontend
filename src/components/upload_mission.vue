<template>
    <div style="margin: 20px;">
        <a-row type="flex">
            <a-col span="8">
                <!--        左侧，上传文件-->
                <div style="margin: 10px">
                    <h3>你可以选择通过json或者.zip文件上传题目。</h3>
                    <br/>
                    请将 <em>zip</em> 文件上传至此处
                </div>

                <el-upload
                        drag
                        ref="upload_file"
                        action="#"
                        :accept="zip"
                        :file-list="fileList"
                        :on-change="onChangeFile"
                        :auto-upload="false"
                        style="margin: 0 auto">
                    <i class="el-icon-upload" />
                    <div style="margin: 20px 0">
                        Click or drag file to this area to upload
                    </div>
                </el-upload>

                <a-button
                        @click="sendFile"
                        type="primary" style="margin: 10px">
                    Upload
                </a-button>
            </a-col>

            <a-col span="16">
                <!--        右侧，规则说明-->
                <div style="margin-left: 60px;">

                    <h4>
                        .zip文件格式：
                    </h4>
                    将两个json文件（和可能有的res文件夹）打包即可。
                    <br/>
                    <br/>
                    <h4>
                        json格式：
                    </h4>
                    <a-collapse :bordered="false"  style="background: #ffffff;">
                        <a-collapse-panel key="1" header="basic.json文件">
                            <div>{<br/>
                                <strong>"name": "test_zip"</strong>,  # 任务名称<br/>
                                <strong>"question_form": "chosen-image"</strong>, # 任务类型，可以从chosen, chosen-image, fill, fill-image四个类型中选择，分别表示纯文字选择题、带图选择题、填空题、带图填空题<br/>
                                <strong>"question_num": "2"</strong>,  # 任务包含题目数量<br/>
                                <strong>"total": "5"</strong>,  # 任务总计所需作答人数<br/>
                                <strong>"retrieve_time": "1"</strong>,  # 题组收回时间（用户接单后需要多长时间内作答，单位：小时）<br/>
                                <strong>"mission_tags": "Sports||Math||Lifestyle"</strong>,  # 题组tag，请查看我们的tag列表来确定（附在后面了）<br/>
                                <strong>"question_path": "questions.json"</strong>,  # 题目列表，下方解释<br/>
                                <strong>"image_path": "res"</strong> # 因为是带图选择题，所以指定图片存储路径<br/>
                                }
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="2" header="questions.json文件（带注释版本）">
                            <div>
                                <div style="color: #dd6161">
                                    注意，下方格式为带注释的格式，实际上需要保证每行或者为空或者为一个完整的json可解析字符串。<br/>
                                </div>
                                {# 第一道题<br/>
                                <strong>"contains": "title3"</strong>, # 题目内容描述，即题干<br/>
                                <strong>"ans": "A"</strong>,  # 预埋答案（如果有）<br/>
                                <strong>"choices": "A||B||C||D"</strong>, # 各个选项的内容，用双竖线隔开<br/>
                                <strong>"image_name": "app.png"</strong> # 题目图片（如果有）<br/>}<br/>
                                {# 第二道题<br/>
                                <strong>"contains": "title4"</strong>,<br/>
                                <strong>"choices": "E||F||G||H"</strong>,<br/>
                                <strong>"image_name": "app2.png"</strong><br/>}
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="3" header="questions.json文件（实际版本）">
                            <div>
                                <div style="color: #dd6161">
                                    每道题必须为1行（即每行头尾必须为'{'和'}'），中间允许有空行。<br/>
                                </div>
                                <strong>
                                    {"contains": "title3", "ans": "A", "choices": "A||B||C||D"}<br/>
                                    {"contains": "title4", "ans": "B", "choices": "E||F||G||H"}
                                </strong>
                            </div>
                        </a-collapse-panel>
                        <a-collapse-panel key="4" header="res文件夹（可选）">
                            <div>存放所有题目的图片，对应questions.json内的图片。</div>
                        </a-collapse-panel>
                    </a-collapse>
                </div>

                <!--        <a-tree :default-expanded-keys="['0-0', '0-1']">-->
                <!--          &lt;!&ndash;            <a-icon slot="switcherIcon" type="down" />&ndash;&gt;-->
                <!--          <a-tree-node key="0-0" title="json 格式" style="font-size: 16px">-->
                <!--            <a-tree-node key="0-0-0" title="basic.json文件" style="font-size: 14px">-->
                <!--                <a-tree-node key="0-0-0-0" style="font-size: 14px" title = '{   "name": "test_zip",  # 题组名称'/>-->
                <!--                <a-tree-node key="0-0-0-1" style="font-size: 14px" title = '    "question_form": "chosen-image", # 题组类型'/>-->
                <!--                <a-tree-node key="0-0-0-2" style="font-size: 14px" title = '    "question_num": "2",  # 题组包含题目数量'/>-->
                <!--                <a-tree-node key="0-0-0-3" style="font-size: 14px" title = '    "total": "5",  # 题目所需作答人数'/>-->
                <!--                <a-tree-node key="0-0-0-4" style="font-size: 14px" title = '    "retrieve_time": "1",  # 题组收回时间（用户接单后需要多长时间内作答，单位：小时）'/>-->
                <!--                <a-tree-node key="0-0-0-5" style="font-size: 14px" title = '    "mission_tags": "Sports||Math||Lifestyle",  # 题组tag，请查看我们的tag列表来确定'/>-->
                <!--                <a-tree-node key="0-0-0-6" style="font-size: 14px" title = '    "question_path": "questions.json",  # 题目列表，下方解释'/>-->
                <!--                <a-tree-node key="0-0-0-7" style="font-size: 14px" title = '    "image_path": "res"    } # 是否有image题目'/>-->
                <!--                </a-tree-node>-->
                <!--            </a-tree-node>-->
                <!--            <a-tree-node key="0-0-1" title="questions.json文件" style="font-size: 14px">-->
                <!--                <a-tree-node key="0-0-1-0">-->
                <!--                    # 第一道题 <br/>-->
                <!--                    {"contains": "title3", # 题目内容描述<br/>-->
                <!--                    "pre_ans": "A",  # 预埋答案（如果有）<br/>-->
                <!--                    "choices": "A||B||C||D", # 各个选项的内容，用双竖线隔开<br/>-->
                <!--                    "image_name": "app.png"} # 题目图片（如果有）<br/>-->
                <!--                    # 第二道题<br/>-->
                <!--                    {"contains": "title4",<br/>-->
                <!--                    "choices": "E||F||G||H",<br/>-->
                <!--                    "image_name": "app2.png"}-->
                <!--                </a-tree-node>-->
                <!--            </a-tree-node>-->
                <!--            <a-tree-node key="0-0-2" title="res文件夹（如果有）" style="font-size: 14px">-->
                <!--                <a-tree-node key="0-0-2-0">-->
                <!--                    存放所有题目的图片，对应questions.json内的图片。-->
                <!--                </a-tree-node>-->
                <!--            </a-tree-node>-->
                <!--          </a-tree-node>-->
                <!--            <a-tree-node key="0-1" title=".zip文件格式" style="font-size: 16px">-->
                <!--                <a-tree-node key="0-1-1" style="font-size: 14px">-->
                <!--                    将以上三个json文件打包即可。-->
                <!--                </a-tree-node>-->
                <!--        </a-tree>-->
            </a-col>



        </a-row>

    </div>
</template>

<script>
    import API from "@/utils/API";
    import postBackend from "@/utils/postBackend";

    export default {
        name: "upload_mission",
        data() {
            return {
                file: undefined,
            }
        },
        methods: {
            sendFile() {
                if (this.file === undefined)
                    return;
                let formData = new FormData();
                formData.append('zip', this.file.raw);
                postBackend(API.POST_NEW_MISSION.path, formData, jsonObj => {
                    if (jsonObj.code === 201) {
                        console.log(jsonObj);
                        this.$message.success("Upload Success!", 1).then(() => {
                            this.$router.push("/ground");
                        });
                    } else {
                        console.log(jsonObj);
                        this.$message.error(jsonObj.data);
                    }
                }, true)
            },
            onChangeFile(file) {
                this.file = file;
            },
            onClickKnowRule() {
                this.$message.info("还没写");
            }
        },
        computed: {
            fileList: function () {
                if (this.file) return [this.file];
                else return [];
            }
        }
    }
</script>

<style>

</style>