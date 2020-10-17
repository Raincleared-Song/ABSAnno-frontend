<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="300" style="background: #fff">
          <div>
            任务描述：{{ mission_description }}
          </div>
          <div>
            任务类型：{{ mission_type }}
          </div>
          <a-button type="dashed" block>
            <a-icon type="plus" />
            <div>添加新题目</div>
          </a-button>
        </a-layout-sider>

        <!-- 题目预览区 -->
        <a-layout-content style="margin: 10px 40px">
          <div v-if="nowQuestion != null">
            <JudgementGroup
                v-if="mission_type === 'judgement'"
                :editable="true"
                :question="nowQuestion" />
            <CheckboxGroup
                v-else-if="mission_type === 'select_multiple'"
                @addOption="addOption"
                @removeOption="removeOption"
                :editable="true"
                :question="nowQuestion" />
            <TextEdit
                v-else-if="mission_type === 'text_edit'"
                :editable="true"
                :question="nowQuestion" />
            <p v-else>{{ mission_type }}</p>
          </div>
          <a-empty v-else :description="false" />

          <!-- 底部分页栏和提交按钮 -->
          <div style="margin: 20px auto">
            <a-pagination
                v-model="nowQuestionIndex"
                :total="questions.length"
                :page-size="1" />
          </div>
          <a-button
              v-show="questions.length > 0 || nowQuestion != null"
              type="primary" @click="submit"
          >submit</a-button>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
  import JudgementGroup from "@/components/questions/judgement_group";
  import TextEdit from "@/components/questions/text_edit";
  import CheckboxGroup from "@/components/questions/checkbox_group";
  import API from "@/utils/API"
  import postBackend from "@/utils/postBackend";

  let nowId = 0;

  export default {
    name: "edit_question",
    components: {
      JudgementGroup: JudgementGroup,
      TextEdit: TextEdit,
      CheckboxGroup: CheckboxGroup
    },  // end of components
    data() {
      return {
        mission_type: this.$route.params.type,
        questions: [],
        nowQuestionIndex: 0, // 为了配合导航条，这个变量是从1开始的！
        nowQuestion: null
      };
    },  // end of data
    props: {
      username: {
        type: String,
        default: "joe doe"
      },
      id: {
        type: Number,
        default() {
          return 0;
        }
      },
      mission_description: {
        type: String,
        default: ""
      },
      minimum_total_annotation: {
        type: Number,
        default() {
          return 10;
        }
      }
    },
    methods: {
      addQuestion() {
        if (this.mission_type === 'judgement') {
          this.addJudgementQuestion();
        } else if (this.mission_type === 'select_multiple') {
          this.addMultipleChoiceQuestion();
        } else if (this.mission_type === 'text_edit') {
          this.addTextEditQuestion();
        }
      },
      addJudgementQuestion() {
        this.questions.push({
          id: nowId++,
          type: 'judgement',
          description: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      addMultipleChoiceQuestion() {
        this.questions.push({
          id: nowId++,
          type: 'select_multiple',
          description: "",
          options: [],
          new_option: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      addTextEditQuestion() {
        this.questions.push({
          id: nowId++,
          type: 'text_edit',
          description: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      // 向后端发送数据
      submit() {
        let submitObj = {
          name: this.mission_description,
          question_form: this.mission_type,
          question_num: this.questions.length.toString(),
          user_id: this.id.toString(),
          total: this.minimum_total_annotation.toString()
        };
        console.log(this.id)
        submitObj.question_list = this.questions.map(element => {
          return { contains: element.description };
        });
        console.log(submitObj);
        postBackend(API.POST_NEW_MISSION, submitObj, jsonObj => {
          console.log(jsonObj);
          this.$message.success("提交成功！即将返回首页！");
          this.$router.push("/ground");
        });
      },
      // 这两个方法处理子组件触发的事件
      addOption(questionId, newOption) {
        console.log(questionId);
        let targetIdx = this.questions.findIndex(question => {
          return question.id === questionId;
        });
        this.questions[targetIdx].options.push(newOption);
        this.questions[targetIdx].new_option = "";
      },
      removeOption(questionId, optionIdx) {
        let targetIdx = this.questions.findIndex(question => {
          return question.id === questionId;
        });
        this.questions[targetIdx].options.splice(optionIdx, 1);
      }
    },  // end of methods
    watch: {
      nowQuestionIndex(newVal) {
        this.nowQuestion = this.questions[newVal - 1];
      }
    }
  }
</script>

<style>
</style>