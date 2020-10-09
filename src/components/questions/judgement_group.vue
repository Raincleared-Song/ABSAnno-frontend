<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>判断题</h2>
    <div v-if="editable" style="margin: 10px">
      <p>编辑题目：</p>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <a-radio-group
        :disabled="editable"
        v-model="question.answer"
        style="margin: 10px">
      <a-radio value="1">True</a-radio>
      <a-radio value="0">False</a-radio>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default() {
        return {
          index: 0,
          type: 'judgement',
          // 出题者可编辑
          description: "",
          // 做题者可编辑
          answer: ""
        }
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  }   // end of props
}
</script>

<style>
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>

