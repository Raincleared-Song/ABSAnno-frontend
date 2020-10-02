<template>
  <div>
    <div>
      <div class="left">
        <ul>
          <li @click="addTrueOrFalseQuestion">添加判断题</li>
          <li @click="addSingleChoiceQuestion">添加单选题</li>
          <li @click="addMultipleChoiceQuestion">添加多选题</li>
          <li @click="addTextEditQuestion">添加文字题</li>
        </ul>
      </div>
      <div
              class="right"
              v-if="nowQuestion != null">
        <TOFGroup
                v-if="nowQuestion.type === 'tof_group'"
                :key="nowQuestion.id"
                :question="nowQuestion" />
        <SelectGroup
                v-else-if="nowQuestion.type === 'select_single' || nowQuestion.type === 'select_multiple'"
                @addOption="addOption"
                @removeOption="removeOption"
                :key="nowQuestion.id"
                :question="nowQuestion" />
        <TextEdit
                v-else-if="nowQuestion.type === 'text_edit'"
                :key="nowQuestion.id"
                :question="nowQuestion" />
      </div>
      <p v-else>请点击左侧标签添加问题</p>
    </div>
    <button
            v-show="questions.length > 0 || nowQuestion != null"
            @click="submit">
      submit
    </button>
    <div class="bottom-page">
      <ul>
        <li
                v-for="n in questions.length"
                @click="showQuestionAtIndex(n - 1)"
                :class="{colored: questions[n - 1] === nowQuestion}"
                :key="n"> {{ n }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TOFGroup from "@/components/tof_group"

  import TextEdit from "@/components/text_edit";
  import SelectGroup from "@/components/select_group";

  let nowId = 0;

  export default {
    components: {
      TOFGroup: TOFGroup,
      TextEdit: TextEdit,
      SelectGroup: SelectGroup
    },
    data() {
      return {
        questions: [],
        nowQuestion: null
      }
    },
    methods: {
      addTrueOrFalseQuestion() {
        this.nowQuestion = {
          id: nowId++,
          type: 'tof_group',
          description: ""
        }
        this.questions.push(this.nowQuestion);
      },
      addSingleChoiceQuestion() {
        this.nowQuestion = {
          id: nowId++,
          type: 'select_single',
          description: "",
          options: [],
          new_option: ""
        }
        this.questions.push(this.nowQuestion);
      },
      addMultipleChoiceQuestion() {
        this.nowQuestion = {
          id: nowId++,
          type: 'select_multiple',
          description: "",
          options: [],
          new_option: ""
        }
        this.questions.push(this.nowQuestion);
      },
      addTextEditQuestion() {
        this.nowQuestion = {
          id: nowId++,
          type: 'text_edit',
          description: ""
        }
        this.questions.push(this.nowQuestion);
      },
      submit() {},
      showQuestionAtIndex(index) {
        if (index >= 0 && index < this.questions.length)
          this.nowQuestion = this.questions[index];
      },
      // 这两个方法处理子组件触发的事件
      addOption(questionId, newOption) {
        console.log(questionId);
        let targetIdx = this.questions.findIndex(question => {
          return question.id === questionId;
        });
        this.questions[targetIdx].options.push(newOption);
        this.questions[targetIdx].new_option = "";
      },
      removeOption(questionId, optionIdx) {
        let targetIdx = this.questions.findIndex(question => {
          return question.id === questionId;
        });
        this.questions[targetIdx].options.splice(optionIdx, 1);
      }
    }
  }
</script>

<style>
  .left {
    float: left;
    width: 200px;
    height: 100%;
  }
  .right {
    margin-left: 200px;
    padding: 10px;
  }
  .bottom-page {
    white-space: nowrap;
    float: bottom;
  }
  .bottom-page li {
    margin: 20px;
    display: inline-block;
    list-style: none;
  }
  .colored {
    color: #3a8ee6;
  }
</style>