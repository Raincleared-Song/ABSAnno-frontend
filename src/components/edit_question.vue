<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="250" style="background: #fff">
          <div style="margin: 20px">
            任务名称：{{ mission_info.name }}
          </div>
          <div style="margin: 20px">
            任务类型：{{ missionType() }}
          </div>
          <a-button
              type="dashed" block
              @click="addQuestion">
            添加新题目
          </a-button>
        </a-layout-sider>

        <!-- 题目预览区 -->
        <a-layout-content style="margin: 10px 40px">
          <div v-if="nowQuestion != null">
            <JudgementGroup
                v-if="mission_info.type === 'judgement'"
                @updateImage="onUpdateImage"
                :editable="true"
                :has_image="mission_info.has_image"
                :question="nowQuestion" />
            <CheckboxGroup
                v-else-if="mission_info.type === 'choice'"
                @addOption="addOption"
                @removeOption="removeOption"
                @updateImage="onUpdateImage"
                :editable="true"
                :has_image="mission_info.has_image"
                :question="nowQuestion" />
            <TextEdit
                v-else-if="mission_info.type === 'text'"
                @updateImage="onUpdateImage"
                :editable="true"
                :has_image="mission_info.has_image"
                :question="nowQuestion" />
            <p v-else>{{ mission_info.type }}</p>
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
              @click="$emit('submit-questions')"
              v-show="questions.length > 0 || nowQuestion != null"
              type="primary"
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
        nowQuestionIndex: 0, // 为了配合导航条，这个变量是从1开始的！
        nowQuestion: null
      }
    },  // end of data
    props: [
        'mission_info',
        'questions'
    ],  // end of props
    methods: {
      // 增加题目
      addQuestion() {
        if (this.mission_info.type === 'judgement') {
          this.addJudgementQuestion();
        } else if (this.mission_info.type === 'choice') {
          this.addMultipleChoiceQuestion();
        } else if (this.mission_info.type === 'text') {
          this.addTextEditQuestion();
        }
      },
      addJudgementQuestion() {
        this.questions.push({
          index: nowId++,
          type: 'judgement',
          description: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      addMultipleChoiceQuestion() {
        this.questions.push({
          index: nowId++,
          type: 'choice',
          description: "",
          options: [],
          new_option: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      addTextEditQuestion() {
        this.questions.push({
          index: nowId++,
          type: 'text',
          description: ""
        });
        this.nowQuestionIndex = this.questions.length;
      },
      // 返回题型的中文名称
      missionType() {
        if (this.mission_info.type === 'judgement') {
          return '判断题';
        } else if (this.mission_info.type === 'choice') {
          return '选择题';
        } else if (this.mission_info.type === 'text') {
          return '文字描述题';
        } else if (this.mission_info.type === 'image') {
          return '图片题';
        }
      },
      // 这3个方法处理子组件触发的事件
      addOption(questionId, newOption) {
        console.log(questionId);
        let targetIdx = this.questions.findIndex(question => {
          return question.index === questionId;
        });
        this.questions[targetIdx].options.push(newOption);
        this.questions[targetIdx].new_option = "";
      },
      removeOption(questionId, optionIdx) {
        let targetIdx = this.questions.findIndex(question => {
          return question.index === questionId;
        });
        console.log(targetIdx, optionIdx);
        this.questions[targetIdx].options.splice(optionIdx, 1);
      },
      onUpdateImage(questionId, file) {
        console.log(file);
        let targetIdx = this.questions.findIndex(question => {
          return question.index === questionId;
        });
        this.questions[targetIdx].image = file;
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