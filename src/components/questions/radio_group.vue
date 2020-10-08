<!-- 这是一个选择题的编辑页面 -->

<template>
  <div>
    <h2>单选题</h2>
    <div v-if="editable">
      <p>编辑题目：</p>
      <input type="text" v-model="question.description"><br>
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <p v-if="editable">编辑选项：</p>
    <div>
      <div v-if="question.options.length">
        <div
            v-for="option in question.options"
            :key="option.index">
          <input type="radio" name="radio"
                 :disabled="editable" :value="option"
                 v-model="checkedOption">
          <label>{{ option }}</label>
          <button v-if="editable" @click="$emit('removeOption', question.id, option.index)">X</button>
        </div>
      </div>
      <p v-else>No option added...</p>
    </div>
    <div v-if="editable">
      <input
          v-model="question.new_option"
          @keydown.enter="$emit('addOption', question.id, question.new_option)"><br>
    </div>
    <div v-else>
      <el-button @click="$emit('inputOk', index, checkedOption)">next</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 做题者可编辑
        checkedOption: null
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
            type: 'select_single',
            // 出题者可编辑
            description: "",
            options: [],
            new_option: "",
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
label {
  margin: 2px;
}
</style>

