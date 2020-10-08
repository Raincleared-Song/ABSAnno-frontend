<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="300" style="background: #fff">
          <a-menu mode="inline" style="height: 100%">
            <a-menu-item key="1" @click="addJudgementQuestion">添加判断题</a-menu-item>
            <a-sub-menu>
              <span slot="title">选择题</span>
              <a-menu-item key="2" @click="addSingleChoiceQuestion">添加单选题</a-menu-item>
              <a-menu-item key="3" @click="addMultipleChoiceQuestion">添加多选题</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="4" @click="addTextEditQuestion">添加文字题</a-menu-item>
          </a-menu>
        </a-layout-sider>

        <!-- 题目预览区 -->
        <a-layout-content style="padding: 40px">
          <div v-if="nowQuestion != null">
            <h2>编辑任务</h2>
            <p>任务名称：<a-input palceholder="your mission title" v-model.trim="mission_description" /></p>
            <p>任务至少标注次数：<a-input-number v-model.trim.number="minimum_total_annotation" /></p>
            <JudgementGroup
                v-if="nowQuestion.type === 'judgement_group'"
                :editable="true"
                :question="nowQuestion" />
            <RadioGroup
                v-else-if="nowQuestion.type === 'select_single'"
                @addOption="addOption"
                @removeOption="removeOption"
                :editable="true"
                :question="nowQuestion" />
            <CheckboxGroup
                v-else-if="nowQuestion.type === 'select_multiple'"
                @addOption="addOption"
                @removeOption="removeOption"
                :editable="true"
                :question="nowQuestion" />
            <TextEdit
                v-else-if="nowQuestion.type === 'text_edit'"
                :editable="true"
                :question="nowQuestion" />
            <p v-else>{{ nowQuestion.type }}</p>
          </div>
          <a-empty v-else :description="false" />

          <!-- 底部分页栏和提交按钮 -->
          <div style="margin: 20px 0 20px 0">
            <a-pagination
                size="small"
                v-model="nowQuestionIndex"
                :total="questions.length"
                :page-size="1" />
          </div>
          <a-button
              v-show="questions.length > 0 || nowQuestion != null"
              type="primary" @click="submit">submit</a-button>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
  import JudgementGroup from "@/components/questions/judgement_group";
  import TextEdit from "@/components/questions/text_edit";
  import RadioGroup from "@/components/questions/radio_group";
  import CheckboxGroup from "@/components/questions/checkbox_group";
  import API from "@/utils/API"
  import postBackend from "@/utils/postBackend";

  let nowId = 0;

  export default {
    components: {
      JudgementGroup: JudgementGroup,
      TextEdit: TextEdit,
      RadioGroup: RadioGroup,
      CheckboxGroup: CheckboxGroup
    },  // end of components
    data() {
      return {
        mission_description: "",
        minimum_total_annotation: 10,
        questions: [],
        nowQuestionIndex: 0, // 为了配合导航条，这个变量是从1开始的！
        nowQuestion: null
      };
    },  // end of data
    methods: {
      addJudgementQuestion() {
        this.questions.push({
          id: nowId++,
          type: 'judgement_group',
          description: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      addSingleChoiceQuestion() {
        this.questions.push({
          id: nowId++,
          type: 'select_single',
          description: "",
          options: [],
          new_option: ""
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
          question_form: "judgement", // TODO: add more question_form
          question_num: this.questions.length.toString(),
          user_id: "1",   // TODO: set user id
          total: this.minimum_total_annotation.toString()
        };
        submitObj.question_list = this.questions.map(element => {
          return { contains: element.description };
        });
        console.log(submitObj);
        postBackend(API.POST_NEW_MISSION, submitObj, jsonObj => {
          console.log(jsonObj);
          alert("问题上传成功！");
          this.$router.push("/ground"); // 返回广场
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
  #components-layout-top-side .logo {
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
  .bottom-page {
    white-space: nowrap;
    float: bottom;
  }
  .bottom-page li {
    margin: 20px;
    display: inline-block;
    list-style: none;
  }
  .colored {
    color: #3a8ee6;
  }
</style>