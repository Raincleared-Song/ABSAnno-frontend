<!-- 这是一个选择题的页面 -->
<template>
  <div>
    <h2>多选题</h2>
    <div v-if="editable">
      <div style="margin: 15px 10px 5px 10px">
        编辑题目：
      </div>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>
    <div
        v-if="editable"
        style="margin: 15px 10px">
      编辑选项：
    </div>
    <div>
      <a-checkbox-group
          v-if="question.options.length" :disabled="editable"
          v-model="question.answer" style="margin: 10px">
        <div
            v-for="(option, index) in question.options"
            :key="index" style="margin: 5px">
          <a-checkbox :value="option">{{ option }}</a-checkbox>
          <a-button ghost
              v-if="editable" size="small"
              @click="$emit('removeOption', question.id, index)">
            <a-icon type="delete" />
          </a-button>
        </div>
      </a-checkbox-group>
      <div
          v-else style="margin: 10px">
        No option added...
      </div>
    </div>
    <div v-if="editable">
      <a-input
          v-model="question.new_option"
          placeholder="add new option, press enter to commit."
          @keydown.enter="$emit('addOption', question.id, question.new_option)" />
    </div>
  </div>
</template>

<script>
export default {
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
          type: 'choice',
          // 出题者可编辑
          description: "",
          options: [],
          new_option: "",
          // 做题者可编辑
          answer: []
        }
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  }   // end of props
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

