<!-- 这是个文字输入题页面 -->
<template>
  <div>
    <h2>文字编辑题</h2>
    <div v-if="editable">
      <div
          style="margin: 15px 10px 10px 10px">
        编辑题目：
      </div>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <div
        style="margin: 15px 10px 10px 10px">
      答题区：
    </div>
    <div>
      <a-textarea :read-only="editable" v-model="question.answer" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "text_edit",
    props: [
        'question',
        'editable',
        'has_image'
    ]   // end of props
  }
</script>

<style>
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>