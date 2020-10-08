<!-- 这是个文字输入题页面 -->
<template>
  <div>
    <h2>文字编辑题</h2>
    <div v-if="editable">
      <p>编辑题目：</p>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <p>答题区：</p>
    <div>
      <a-textarea :read-only="editable" v-model="inputText" />
    </div>
    <div v-if="!editable">
      <el-button @click="$emit('inputOk', index, inputText)">next</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 做题者可编辑
        inputText: ""
      };
    },
    props: {
      index: {
        type: Number,
        default: -1
      },
      question: {
        type: Object,
        default() {
          return {
            id: 0,
            type: 'text_edit',
            // 出题者可编辑
            description: "",
          }
        }
      },
      editable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>