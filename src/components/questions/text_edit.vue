<!-- 这是个文字输入题编辑页面 -->
<template>
  <div>
    <h2>文字编辑题</h2>
    <div v-if="editable">
      <p>编辑题目：</p>
      <input type="text" v-model="question.description"><br>
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <p>答题区：</p>
    <input type="text" :readonly="editable"><br>
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
      },
      editable: {
        type: Boolean,
        default: false
      }
    }
  }
</script>