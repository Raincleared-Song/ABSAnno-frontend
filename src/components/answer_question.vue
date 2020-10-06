<template>
  <body id="root">
    <div v-if="nowQuestion != null">
      <JudgementGroup
          v-if="nowQuestion.type === 'judgement_group'"
          :editable="false"
          :user-value="nowQuestion.userInput"
          :question="nowQuestion" />
      <RadioGroup
          v-else-if="nowQuestion.type === 'select_single'"
          :editable="false"
          :user-value="nowQuestion.userInput"
          :question="nowQuestion" />
      <CheckboxGroup
          v-else-if="nowQuestion.type === 'select_multiple'"
          :editable="false"
          :user-value="nowQuestion.userInput"
          :question="nowQuestion" />
      <TextEdit
          v-else-if="nowQuestion.type === 'text_edit'"
          :editable="false"
          :user-value="nowQuestion.userInput"
          :question="nowQuestion" />
    </div>
    <p v-else>该任务内还没有问题</p>
    <a-button-group>
      <a-button @click="lastQuestion">上一题</a-button>
      <a-button @click="nextQuestion">下一题</a-button>
    </a-button-group>
    <a-button>
      <router-link to="/ground">返回广场</router-link>
    </a-button>
    <a-button @click="submit">提交任务</a-button>
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
  },
  data() {
    return {
      id: 0,
      questions: [],
      nowQuestion: null
    }
  },
  methods: {
    // 从后端获取数据
    lastQuestion() {
      if (this.nowQuestion.index === 0)
        alert("No more question.");
      let prevIndex = this.nowQuestion.index;
      getBackend(API.GET_SINGLE_QUESTION, {
        id: this.id,
        num: prevIndex,
        step: -1
      }, jsonObj => {
        if (jsonObj == null)
          alert("No more question.");
        let dataObj = getDataObj(jsonObj);
        // console.log(jsonObj);
        // console.log(dataObj);
        this.nowQuestion = {
          index: dataObj.ret,
          type: 'judgement_group',  // TODO: add more type
          description: dataObj.word,
          userInput: ''
        };
      });
      if (this.nowQuestion.index >= this.questions.length)
        this.questions.push(this.nowQuestion);
      else
        this.showQuestionAtIndex(this.nowQuestion.index);
    },
    // 从后端获取数据
    nextQuestion() {
      let prevIndex = this.nowQuestion.index;
      getBackend(API.GET_SINGLE_QUESTION, {
        id: this.id,
        num: prevIndex,
        step: 1
      }, jsonObj => {
        if (jsonObj == null)
          alert("No more question.");
        // console.log(jsonObj);
        let dataObj = getDataObj(jsonObj);
        // console.log(dataObj);
        this.nowQuestion = {
          index: dataObj.ret,
          type: 'judgement_group',  // TODO: add more type
          description: dataObj.word,
          userInput: ''
        };
      });
      if (this.nowQuestion.index >= this.questions.length)
        this.questions.push(this.nowQuestion);
      else
        this.showQuestionAtIndex(this.nowQuestion.index);
    },
    // 向后端发送数据
    submit() {
      // TODO: finish the rest kinds of questions
      let _ans = this.questions.map((question, index) => {
        if (question.type === 'judgement_group') {
          return question.checkedOption.toString();
        } else if (question.type === 'select_single') {
          return question.checkedOption.toString(); // TODO: modify string format
        } else if (question.type === 'select_multiple') {
          return question.checkedOptions.toString();  // TODO: modify string format
        } else if (question.type === 'text_edit') {
          return question.inputText.toString(); // TODO: modify string format
        }
      });
      console.log(_ans);
      postBackend(API.POST_SINGLE_QUESTION, {
        user_id: "1", // TODO: get user_id from cookie
        mission_id: this.id.toString(),
        ans: _ans
      }, jsonObj => {
        console.log(jsonObj);
      });
    }
  },
  created() {
    let name = this.$route.path;
    this.id = Number(name.slice(10,));
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION, {
      id: this.id,
      num: 0,
      step: 0
    }, jsonObj => {
      if (jsonObj == null)
        alert("No more question.");
      // console.log(jsonObj);
      let dataObj = getDataObj(jsonObj);
      // console.log(dataObj);
      this.nowQuestion = {
        index: dataObj.ret,
        type: 'judgement_group',  // TODO: add more type
        description: dataObj.word,
        userInput: ''
      };
    });
    if (this.nowQuestion != null)
      this.questions.push(this.nowQuestion);
  }
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
  padding: 50px;
}
a-button {
  margin: 20px;
}
</style>