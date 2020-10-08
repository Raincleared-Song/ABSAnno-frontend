<template>
  <body id="root">

    <!-- 显示问题的区域 -->
    <div v-if="nowQuestion != null">
      <JudgementGroup
          v-if="nowQuestion.type === 'judgement_group'"
          @input-ok="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <RadioGroup
          v-else-if="nowQuestion.type === 'select_single'"
          @input-ok="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <CheckboxGroup
          v-else-if="nowQuestion.type === 'select_multiple'"
          @input-ok="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <TextEdit
          v-else-if="nowQuestion.type === 'text_edit'"
          @input-ok="onInputOk"
          :editable="false"
          :question="nowQuestion" />
    </div>
    <a-empty v-else :description="false" />

    <!-- 按钮区域 -->
    <a-space>
      <a-button><router-link to="/ground">返回广场</router-link></a-button>
      <a-button @click="submit">提交任务</a-button>
    </a-space>
  </body>
</template>

<script>
import JudgementGroup from "@/components/questions/judgement_group";
import TextEdit from "@/components/questions/text_edit";
import RadioGroup from "@/components/questions/radio_group";
import CheckboxGroup from "@/components/questions/checkbox_group";
import getBackend from "@/utils/getBackend";
import postBackend from "@/utils/postBackend";
import API from "@/utils/API";

export default {
  components: {
    JudgementGroup: JudgementGroup,
    RadioGroup: RadioGroup,
    CheckboxGroup: CheckboxGroup,
    TextEdit: TextEdit
  },  // end of components
  data() {
    return {
      missionId: 0,
      questions: [],
      answers: [],
      nowQuestionIndex: 0,  // 从1开始
      nowQuestion: null
    };
  },  // end of data
  methods: {
    // 发送题目答案
    onInputOk(index, userInput) {
      if (index === this.answers.length) {
        this.answers.push(userInput);
      } else if (index >= 0 && index < this.answers.length) {
        this.answers[index] = userInput;
      } else {
        alert("wrong question index");
      }
      let nextIndex = this.questions.length;
      // TODO: deal with index out of mission/question range
      getBackend(API.GET_SINGLE_QUESTION, {
        id: this.missionId,
        num: nextIndex,
        step: 0
      }, jsonObj => {
        let dataObj = getDataObj(jsonObj);
        this.questions.push({
          index: dataObj.ret,
          type: 'judgement_group',  // TODO: add more type
          description: dataObj.word
        });
      });
      this.nowQuestionIndex = this.questions.length;
    },
    // 向后端发送数据
    submit() {
      console.log(this.answers);
      postBackend(API.POST_SINGLE_QUESTION, {
        user_id: "1", // TODO: get user_id from cookie
        mission_id: this.missionId.toString(),
        ans: this.answers
      }, jsonObj => {
        console.log(jsonObj);
      });
    }
  },  // end of methods
  created() {
    let name = this.$route.path;
    this.missionId = Number(name.slice(10,));
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION, {
      id: this.missionId,
      num: 0,
      step: 0
    }, jsonObj => {
      if (jsonObj == null)
        alert("No more question.");
      let dataObj = getDataObj(jsonObj);
      this.questions.push({
        index: dataObj.ret,
        type: 'judgement_group',  // TODO: add more type
        description: dataObj.word,
        userInput: ''
      });
    });
    this.nowQuestionIndex = this.questions.length;
  },  // end of created
  watch: {
    nowQuestionIndex(newVal) {
      this.nowQuestion = this.questions[newVal - 1];
    }
  }   // end of watch
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  console.log(dataStr);
  dataStr = dataStr.replace(/'/g, '"');
  console.log(dataStr);
  return JSON.parse(dataStr);
}
</script>

<style>
#root {
  padding: 50px 100px 50px 100px;
}
</style>