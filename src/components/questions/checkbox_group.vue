<!-- 这是一个选择题的页面 -->
<template>
  <div>
    <h2>多选题</h2>
    <div v-if="editable">
      <p>编辑题目：</p>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <p v-if="editable">编辑选项：</p>
    <div>
      <a-checkbox-group v-if="question.options.length"
                        v-model="checkedOptions" style="margin: 10px">
        <div v-for="option in question.options"
             :key="option.index" style="margin: 5px">
          <a-checkbox :disabled="editable" :value="option"
                      v-model="checkedOptions">{{ option }}</a-checkbox>
          <a-button v-if="editable" size="small"
                    @click="$emit('removeOption', question.id, option.index)">X</a-button>
        </div>
      </a-checkbox-group>
      <p v-else>No option added...</p>
    </div>
    <div v-if="editable">
      <a-input v-model="question.new_option"
               placeholder="add new option, press enter to commit."
               @keydown.enter="$emit('addOption', question.id, question.new_option)" />
    </div>
    <div v-else>
      <el-button @click="$emit('inputOk', index, checkedOptions)">next</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 做题者可编辑
      checkedOptions: []
    }
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
          type: 'select_multiple',
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
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>

