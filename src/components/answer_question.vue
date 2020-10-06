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
import connectBackend from "@/utils/communications";
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
      questions: [],
      nowQuestion: null,
      id:0,
    }
  },
  methods: {
    lastQuestion() {
      if (this.nowQuestion.index === 0)
        alert("No more question.");
      let prevIndex = this.nowQuestion.index;
      connectBackend(API.GET_SINGLE_QUESTION, {
        id: 0,  // TODO: get mission id
        num: prevIndex,
        step: -1
      }, jsonObj => {
        this.nowQuestion = {
          index: prevIndex - 1,
          type: 'judgement_group',
          description: jsonObj.word,
          userInput: null
        };
      });
      if (this.nowQuestion.index >= this.questions.length)
        this.questions.push(this.nowQuestion);
    },
    nextQuestion() {
      let prevIndex = this.nowQuestion.index;
      connectBackend(API.GET_SINGLE_QUESTION, {
        id: 0,  // TODO: get mission id
        num: prevIndex,
        step: 1
      }, jsonObj => {
        if (jsonObj == null)
          alert("No more question.");
        this.nowQuestion = {
          index: prevIndex + 1,
          type: 'judgement_group',
          description: jsonObj.word,
          userInput: null
        };
      });
      if (this.nowQuestion.index >= this.questions.length)
        this.questions.push(this.nowQuestion);
    },
    submit() {
      // TODO: finish the rest kinds of questions
      let _ans = this.questions.map((question, index) => {
        if (question.type === 'judgement_group') {
          return question.checkedOption;
        } else if (question.type === 'select_single') {
          return question.checkedOption;
        } else if (question.type === 'select_multiple') {
          return question.checkedOptions;
        } else if (question.type === 'text_edit') {
          return question.inputText;
        }
      });
      console.log(_ans);
      connectBackend(API.POST_SINGLE_QUESTION, {
        user_id: 1, // TODO: get user_id from cookie
        mission_id: 1, // TODO: get mission_id
        ans: _ans
      }, jsonObj => {
        console.log(jsonObj);
      });
    }
  },
  created: function () {
    let name = this.$route.path;
    this.id = Number(name.slice(10,));

    // 从后台申请数据加载
    connectBackend(API.GET_SINGLE_QUESTION, {
      id: 0,  // TODO: get mission id
      num: 0,
      step: 0
    }, jsonObj => {
      this.nowQuestion = {
        index: 0,
        type: 'judgement_group',  // TODO: add more type
        description: jsonObj.word,
        userInput: null
      }
    });
    if (this.nowQuestion != null)
      this.questions.push(this.nowQuestion);
  }
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