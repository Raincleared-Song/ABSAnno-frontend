<!-- 这是一个选择题的编辑页面 -->

<template>
  <div>
    <h2> {{ question.type === 'select_single'? '单选题': '多选题' }} </h2>
    <p>编辑题目：</p>
    <input v-model="question.description"><br>
    <p>编辑选项：</p>
    <div>
      <div v-if="question.options.length">
        <ul>
        <div
            v-for="option in question.options"
            v-bind:key="option.index">
          <li>
            {{ option }}
            <button @click="$emit('removeOption', question.id, option.index)">X</button>
          </li>
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
    props: ['question']
  }
</script>

<style></style>

