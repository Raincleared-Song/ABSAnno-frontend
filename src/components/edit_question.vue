<template>
  <body>
    <div>
      <div class="left">
        <ul class="add-question">
          <li @click="addJudgementQuestion">添加判断题</li>
          <li @click="addSingleChoiceQuestion">添加单选题</li>
          <li @click="addMultipleChoiceQuestion">添加多选题</li>
          <li @click="addTextEditQuestion">添加文字题</li>
        </ul>
      </div>
      <div class="right"
          v-if="nowQuestion != null">
        <h2>编辑任务</h2>
        <p>
          任务名称：
          <input type="text" v-model.trim="mission_description">
        </p>
        <p>
          任务至少标注次数：
          <input type="text" v-model.trim.number="minimum_total_annotation">
        </p>
        <JudgementGroup
            v-if="nowQuestion.type === 'judgement_group'"
            :editable="true"
            :question="nowQuestion" />
        <RadioGroup
            v-else-if="nowQuestion.type === 'select_single'"
            @addOption="addOption"
            @removeOption="removeOption"
            :editable="true"
            :question="nowQuestion" />
        <CheckboxGroup
            v-else-if="nowQuestion.type === 'select_multiple'"
            @addOption="addOption"
            @removeOption="removeOption"
            :editable="true"
            :question="nowQuestion" />
        <TextEdit
            v-else-if="nowQuestion.type === 'text_edit'"
            :editable="true"
            :question="nowQuestion" />
        <p v-else>{{ nowQuestion.type }}</p>
      </div>
      <p v-else>请点击左侧标签添加问题</p>
    </div>
    <div class="bottom-page">
      <ul>
        <li @click="showQuestionAtIndex(questions.indexOf(nowQuestion) - 1)">上一题</li>
        <li
            v-for="n in questions.length"
            @click="showQuestionAtIndex(n - 1)"
            :class="{colored: questions[n - 1] === nowQuestion}"
            :key="n">{{ n }}</li>
        <li @click="showQuestionAtIndex(questions.indexOf(nowQuestion) + 1)">下一题</li>
      </ul>
    </div>
    <button
        v-show="questions.length > 0 || nowQuestion != null"
        @click="submit">
      submit
    </button>
  </body>
</template>

<script>
  import JudgementGroup from "@/components/questions/judgement_group";
  import TextEdit from "@/components/questions/text_edit";
  import RadioGroup from "@/components/questions/radio_group";
  import CheckboxGroup from "@/components/questions/checkbox_group";
  import API from "@/utils/API"
  import connectBackend from "@/utils/communications";

  let nowId = 0;

  export default {
    components: {
      JudgementGroup: JudgementGroup,
      TextEdit: TextEdit,
      RadioGroup: RadioGroup,
      CheckboxGroup: CheckboxGroup
    },
    data() {
      return {
        mission_description: "",
        minimum_total_annotation: 10,
        questions: [],
        nowQuestion: null
      }
    },
    methods: {
      addJudgementQuestion() {
        this.nowQuestion = {
          id: nowId++,
          type: 'judgement_group',
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
      showQuestionAtIndex(index) {
        if (index >= 0 && index < this.questions.length)
          this.nowQuestion = this.questions[index];
      },
      // 向后端发送数据
      submit() {
        let submitObj = {
          name: this.mission_description,
          question_form: "judgement", // TODO: add more question_form
          question_num: this.questions.length.toString(),
          user_id: "1",   // TODO: set user id
          total: this.minimum_total_annotation.toString()
        };
        submitObj.question_list = this.questions.map(element => {
          return { contains: element.description };
        });
        console.log(submitObj);
        connectBackend(API.POST_NEW_MISSION, submitObj, function (jsonObj) {
          console.log(jsonObj);
          alert("问题上传成功！");
          window.history.back(-1);
        });
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
  .add-question li {
    margin: 10px;
    list-style: none;
  }
  .colored {
    color: #3a8ee6;
  }
</style>