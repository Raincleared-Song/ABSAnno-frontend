<template>
  <body id="root">
    <div v-if="nowQuestion != null">
      <JudgementGroup
          v-if="nowQuestion.type === 'judgement_group'"
          :editable="false"
          :question="nowQuestion" />
      <RadioGroup
          v-else-if="nowQuestion.type === 'select_single'"
          :editable="false"
          :question="nowQuestion" />
      <CheckboxGroup
          v-else-if="nowQuestion.type === 'select_multiple'"
          :editable="false"
          :question="nowQuestion" />
      <TextEdit
          v-else-if="nowQuestion.type === 'text_edit'"
          :editable="false"
          :question="nowQuestion" />
    </div>
    <p v-else>该任务内还没有问题</p>
    <a-button-group>
      <a-button @click="lastQuestion">上一题</a-button>
      <a-button @click="nextQuestion">下一题</a-button>
    </a-button-group>
    <br>
    <a-button>
      <router-link to="/ground">返回广场</router-link>
    </a-button>
    <br>
    <a-button @click="submit">提交本题</a-button>
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
      nowQuestion: {
        id: 0,
        type: 'judgement_group',
        description: "清华是不是世一大？"
      }
    }
  },
  methods: {
    lastQuestion() {},
    nextQuestion() {},
    submit() {
      let _ans;

      // TODO: finish the rest kinds of questions
      if (this.nowQuestion.type === 'judgement_group') {
        _ans = [1];
      }

      connectBackend(API.POST_SINGLE_QUESTION, {
        user_id: 0, // TODO: get user_id from cookie
        mission_id: 0, // TODO: get mission_id
        ans: _ans
      }, function (jsonObj) {
        console.log(jsonObj);
      });
      this.nextQuestion();  // 提交后自动跳到下一题
    }
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