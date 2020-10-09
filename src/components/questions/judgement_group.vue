<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>判断题</h2>
    <div v-if="editable" style="margin: 10px">
      <p>编辑题目：</p>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <a-radio-group
        :disabled="editable"
        v-model="checkedOption"
        style="margin: 10px">
      <a-radio value="1">True</a-radio>
      <a-radio value="0">False</a-radio>
    </a-radio-group>
    <div v-if="editable === false">
      <el-button @click="commit">next</el-button>
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
  },  // end of data
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
  },  // end of props
  methods: {
    commit() {
      this.$emit('inputOk', this.question.index, this.checkedOption);
      console.log("click click");
    }
  }
}
</script>

<style>
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>

