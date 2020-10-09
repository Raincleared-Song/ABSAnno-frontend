<template>
  <body id="root">

    <!-- 显示问题的区域 -->
    <div v-if="nowQuestion != null">
      <JudgementGroup
          v-if="nowQuestion.type === 'judgement_group'"
          @inputOk="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <RadioGroup
          v-else-if="nowQuestion.type === 'select_single'"
          @inputOk="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <CheckboxGroup
          v-else-if="nowQuestion.type === 'select_multiple'"
          @inputOk="onInputOk"
          :editable="false"
          :question="nowQuestion" />
      <TextEdit
          v-else-if="nowQuestion.type === 'text_edit'"
          @inputOk="onInputOk"
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
      totalNum: 0,    // 总题目数量
      questions: [],  // 问题列表
      answers: [],    // 答案列表
      nowQuestionIndex: 0,  // 从1开始
      nowQuestion: null     // 不要显式地去改，监听nowQuestionIndex来更改
    };
  },  // end of data
  methods: {
    // 发送题目答案
    onInputOk(index, userInput) {
      console.log("onInputOk");
      console.log(index, userInput);
      if (index === this.answers.length) {
        this.answers.push(userInput);
      } else if (index >= 0 && index < this.answers.length) {
        this.answers[index] = userInput;
      } else {
        alert("wrong question index");
      }
      let nextIndex = this.questions.length;
      if (index !== this.totalNum - 1) {
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
          this.nowQuestionIndex = this.questions.length;
        });
      } else {
        this.submit();
      }
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
    // console.log(this.nowQuestionIndex); // TODO: 0
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION, {
      id: this.missionId,
      num: 0,
      step: 0
    }, jsonObj => {
      let dataObj = getDataObj(jsonObj);
      this.totalNum = dataObj.total;
      this.questions.push({
        index: dataObj.ret,
        type: 'judgement_group',  // TODO: add more type
        description: dataObj.word
      });
      this.nowQuestionIndex = this.questions.length;
    });
  },  // end of created
  watch: {
    nowQuestionIndex(newVal) {
      this.nowQuestion = this.questions[newVal - 1];
    }
  }   // end of watch
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}
</script>

<style>
#root {
  padding: 50px 100px 50px 100px;
}
</style>