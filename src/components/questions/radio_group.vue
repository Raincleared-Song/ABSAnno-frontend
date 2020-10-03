<!-- 这是一个选择题的编辑页面 -->

<template>
  <div>
    <h2>单选题</h2>
    <p>编辑题目：</p>
    <input type="text" v-model="question.description"><br>
    <p>编辑选项：</p>
    <div>
      <div v-if="question.options.length">
        <ul>
        <div
            v-for="option in question.options"
            :key="option.index">
          <input type="radio" name="radio">{{ option }}
          <button @click="$emit('removeOption', question.id, option.index)">X</button>
        </div>
        </ul>
      </div>
      <p v-else>No option added...</p>
    </div>
    <input
        v-model="question.new_option"
        @keydown.enter="$emit('addOption', question.id, question.new_option)"><br>
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
            type: 'select_single',
            description: "",
            options: [],
            new_option: ""
          }
        }
      }
    }
  }
</script>

<style></style>

