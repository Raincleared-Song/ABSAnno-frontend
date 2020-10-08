<template>
  <body id="root">
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
    <p v-else>该任务内还没有问题</p>
<!--    <a-button-group>-->
<!--      <a-button @click="lastQuestion">上一题</a-button>-->
<!--      <a-button @click="nextQuestion">下一题</a-button>-->
    <a-button><router-link to="/ground">返回广场</router-link></a-button>
    <a-button @click="submit">提交任务</a-button>
<!--    </a-button-group>-->
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
      missionId: 0,
      questions: [],
      answers: [],
      nowQuestion: null
    }
  },
  methods: {
    onInputOk(index, input) {
      if (index === this.answers.length)
        this.answers.push(input);
      let nextIndex = this.questions.length;
      getBackend(API.GET_SINGLE_QUESTION, {
        id: this.missionId,
        num: nextIndex,
        step: 0
      }, jsonObj => {
        let dataObj = getDataObj(jsonObj);
        this.nowQuestion = {
          index: dataObj.ret,
          type: 'judgement_group',  // TODO: add more type
          description: dataObj.word
        };
      });
      if (this.nowQuestion.index === this.questions.length)
        this.questions.push(this.nowQuestion);
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
  },
  created() {
    let name = this.$route.path;
    this.id = Number(name.slice(10,));
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION, {
      id: this.missionId,
      num: 0,
      step: 0
    }, jsonObj => {
      if (jsonObj == null)
        alert("No more question.");
      let dataObj = getDataObj(jsonObj);
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