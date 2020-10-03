<template>
  <div>
    <h2>判断题</h2>
    <p>编辑题目：</p>
    <input v-model="question.description"><br>
    <input type="radio" name="judgement" value="1">True<br>
    <input type="radio" name="judgement" value="0">False<br>
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
          type: 'tof_group',
          description: ""
        }
      }
    }
  }
}
</script>

<style></style>

