<template>
  <div id="root">
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
    <a-button @click="submit">提交</a-button>
  </div>
</template>

<script>
import JudgementGroup from "@/components/questions/judgement_group";
import TextEdit from "@/components/questions/text_edit";
import RadioGroup from "@/components/questions/radio_group";
import CheckboxGroup from "@/components/questions/checkbox_group";

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
        type: 'select_multiple',
        description: "这个软工作业是谁做的？",
        options: ['scy', 'wjw', 'xyq', 'ljj', 'zyz']
      }
    }
  },
  methods: {
    lastQuestion() {},
    nextQuestion() {},
    submit() {}
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