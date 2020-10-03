<!-- 这是个文字输入题编辑页面 -->
<template>
  <div>
    <h2>文字编辑题</h2>
    <p>编辑题目：</p>
    <input type="text" v-model="question.description"><br>
  </div>
</template>

<script>
  export default {
    props: {
      question: {
        type: Object,
        default() {
          return {
            id: 0,
            type: 'text_edit',
            description: ""
          }
        }
      }
    }
  }
</script>