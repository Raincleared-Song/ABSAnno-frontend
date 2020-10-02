<template>
  <div>
    <h2>判断题</h2>
    <p>编辑题目：</p>
    <input v-model="question.description"><br>
    <ul type="radio">
      <li>True</li>
      <li>False</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['question']
  // props: {
  //   question: {
  //     type: String,
  //     id: Number,
  //     description: String
  //   }
  // }
}
</script>

<style></style>

