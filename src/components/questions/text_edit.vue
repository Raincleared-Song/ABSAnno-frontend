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
    <div>
      <input type="text" :readonly="editable" v-model="inputText"><br>
    </div>
    <div v-if="editable === false">
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