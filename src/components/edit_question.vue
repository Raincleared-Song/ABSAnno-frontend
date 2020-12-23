<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="230" style="background: #fff">
          <div style="margin: 20px">
            任务名称：{{ mission_info.name }}
          </div>
          <a-divider />
          <div style="margin: 20px">
            任务类型：{{ missionType() }}
          </div>
          <a-divider />
          <div style="margin: 20px">
            任务简介：{{ mission_info.info === ''? '未填写': mission_info.info }}
          </div>
          <a-divider />
          <div style="margin: 20px">
            是否图片任务：{{ mission_info.has_image? '是': '否' }}
          </div>
          <a-divider />
          <div style="margin: 20px">
            任务模版：{{ mission_info.template? '分栏': '上下' }}
          </div>
        </a-layout-sider>

        <i style="{ width: 1px, color: #8c939d }" />

        <!-- 题目预览区 -->
        <a-layout-content style="margin: 10px 40px">
          <div v-if="nowQuestion != null">
            <choice_group
                v-if="mission_info.type === 'chosen'"
                @addOption="addOption"
                @removeOption="removeOption"
                :editable="true"
                :has_image="mission_info.has_image"
                :question="nowQuestion"
                :template="0" />
            <text_edit
                v-else-if="mission_info.type === 'fill'"
                :editable="true"
                :has_image="mission_info.has_image"
                :question="nowQuestion"
                :template="0" />
            <p v-else>{{ mission_info.type }}</p>
          </div>
          <a-empty v-else :description="false" />

          <!-- 底部分页栏和提交按钮 -->
          <div style="margin: 20px auto">
            <a-pagination
                v-model="nowQuestionIndex"
                @change="switchTo"
                :total="questions.length"
                :default-current="10"
                :page-size="1"
                :hide-on-single-page="true" />
          </div>
          <a-space style="{ width: 100% }">
            <a-button
                @click="addQuestion"
                style="{ width: 50% }">
              添加题目<a-icon type="plus" />
            </a-button>
            <a-button
                @click="removeQuestion"
                :disabled="questions.length === 0 || nowQuestion == null"
                style="{ width: 50% }">
              删除题目<a-icon type="minus" />
            </a-button>
          </a-space>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import text_edit from "@/components/questions/text_edit";
import choice_group from "@/components/questions/choice_group";

let nowId = 0;

export default {
  name: "edit_question",
  components: {
    choice_group: choice_group,
    text_edit: text_edit
  },  // end of components
  data() {
    return {
      nowQuestionIndex: this.questions.length, // 为了配合导航条，这个变量是从1开始的！
      nowQuestion: null
    };
  },  // end of data
  props: [
      'mission_info',
      'questions'
  ],  // end of props
  methods: {
    // 增加题目
    addQuestion() {
      if (this.mission_info.type === 'chosen') {
        this.addChosenQuestion();
      } else if (this.mission_info.type === 'fill') {
        this.addTextEditQuestion();
      } else {
        this.$message.warning("You haven't select mission type yet!", 1);
      }
    },
    removeQuestion() {
      let prevIndex = this.nowQuestionIndex;
      if (this.nowQuestionIndex > 1)
        this.nowQuestionIndex--;
      else if (this.questions.length === 1)
        this.nowQuestionIndex = 0;
      this.questions.splice(prevIndex - 1, 1);
      console.log(this.nowQuestionIndex);
    },
    addChosenQuestion() {
      this.questions.push({
        index: nowId++,
        type: 'chosen',
        description: "",
        options: [],
        new_option: "",
        answer: "",
        has_pre_ans: false,
        image: undefined
      });
      this.nowQuestionIndex = this.questions.length;
    },
    addTextEditQuestion() {
      this.questions.push({
        index: nowId++,
        type: 'fill',
        description: "",
        answer: "",
        has_pre_ans: false,
        image: undefined
      });
      this.nowQuestionIndex = this.questions.length;
    },
    switchTo(index) {
      if (index > 0 && index <= this.questions.length)
        this.nowQuestionIndex = index;
    },
    // 返回题型的中文名称
    missionType() {
      if (this.mission_info.type === 'chosen') {
        return '选择题';
      } else if (this.mission_info.type === 'fill') {
        return '文字描述题';
      }
    },
    // 这3个方法处理子组件触发的事件
    addOption(questionId, newOption) {
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
    }
  },  // end of methods
  watch: {
    nowQuestionIndex: {
      handler: function(newVal) {
        this.nowQuestion = this.questions[newVal - 1];
      },
      immediate: true
    },
    questions: {
      handler(newVal) {
        this.nowQuestion = newVal[this.nowQuestionIndex - 1];
      },
      deep: true
    }
  }   // end of watch
}
</script>

<style>
</style>