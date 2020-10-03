<template>
  <div>
    <h2>判断题</h2>
    <div v-if="editable">
      <p>编辑题目：</p>
      <input v-model="question.description"><br>
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <input type="radio" name="judgement" value="1" :disabled="editable">True<br>
    <input type="radio" name="judgement" value="0" :disabled="editable">False<br>
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
          type: 'judgement_group',
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

<style></style>

