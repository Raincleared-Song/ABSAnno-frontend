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
    <input type="radio" name="judgement" value="1"
           :disabled="editable" v-model="checkedOption">
    <label>True</label><br>
    <input type="radio" name="judgement" value="0"
           :disabled="editable" v-model="checkedOption">
    <label>False</label><br>
    <div v-if="editable">
      <el-button @click="$emit('inputOk', question.index, checkedOption)">next</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 做题者可编辑
      checkedOption: ""
    };
  },
  props: {
    question: {
      type: Object,
      default() {
        return {
          index: 0,
          type: 'judgement_group',
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

<style></style>

