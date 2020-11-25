<template>
  <div id="root">
    <!-- 显示问题的区域 -->
    <div v-if="nowQuestion != null">
      <choice_group
          v-if="nowQuestion.type === 'chosen'"
          :editable="false"
          :question="nowQuestion"
          :template="template"
          :has_image="nowQuestion.has_image" />
      <text_edit
          v-else-if="nowQuestion.type === 'fill'"
          :editable="false"
          :question="nowQuestion"
          :template="template"
          :has_image="nowQuestion.has_image" />
    </div>
    <a-empty v-else :description="false" />

    <!-- 答题翻页条 -->
    <a-pagination
        v-model="nowQuestionIndex"
        @change="switchTo"
        :page-size="1"
        :total="totalNum"
        :hide-on-single-page="true"
        style="margin: 40px" />

    <!-- 按钮区域 -->
    <div align="center">
      <a-space :size="20">
        <a-button
            :disabled="submitting"
            @click="submit" type="primary">
          提交任务<a-icon type="check" />
        </a-button>
        <a-button
            @click="$router.go(-1)">
          返回<a-icon type="rollback" />
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import text_edit from "@/components/questions/text_edit";
import choice_group from "@/components/questions/choice_group";
import getBackend from "@/utils/getBackend";
import postBackend from "@/utils/postBackend";
import API from "@/utils/API";

export default {
  name: "answer_question",
  components: {
    choice_group: choice_group,
    text_edit: text_edit
  },  // end of components
  data() {
    return {
      renew: Number(this.$route.params.renew) === 1,
      missionId: 0,
      totalNum: 0,    // 总题目数量
      questions: [],  // 问题列表
      nowQuestionIndex: 0, // 从 1 开始
      nowQuestion: null,    // 不要显式地去改，监听nowQuestionIndex来更改
      startTimer: 0,
      template: 0,
      submitting: false
    };
  },  // end of data
  props:[
      'username',
      'power',
      'avatar'
  ],
  methods: {
    // 向后端发送数据
    submit() {
      this.submitting = true;
      let answers = this.questions.map(question => {
        return question.answer === ''? ' ': question.answer;
      });
      console.log(answers);
      postBackend(API.POST_SINGLE_QUESTION.path, {
        method: this.renew? 'renew': 'submit',
        mission_id: this.missionId.toString(),
        ans: answers.join('||'),
        time: (new Date().getTime() - this.startTimer).toLocaleString()
      }, jsonObj => {
        if (jsonObj.code === 201) {
          this.submitting = false;
          this.$message.success(jsonObj.data, 1).then(() => {
            this.$router.go(-1);
          });
        } else {
          console.log(jsonObj.data);
          this.submitting = false;
          this.$message.error(jsonObj.data, 1);
        }
      });
    },
    // 跳转到某一题
    switchTo(num) {
      let targetIdx = this.questions.findIndex(question => {
        return question.index === num  - 1;
      });
      if (targetIdx === -1) {
        // 未加载，从后端获取
        getBackend(API.GET_SINGLE_QUESTION.path, {
          method: this.renew? 'renew': 'submit',
          id: this.missionId,
          num: String(num - 1),
          step: 0
        }, jsonObj => {
          if (jsonObj.code === 201) {
            let dataObj = getDataObj(jsonObj);
            let newQuestion = getNewQuestion(dataObj);
            this.questions.push(newQuestion);
            // this.nowQuestionIndex = num;
          } else {
            this.$message.error(jsonObj.data);
          }
          let nowIdx = this.questions.findIndex(question => {
            return question.index === this.nowQuestionIndex - 1;
          });
          this.nowQuestion = this.questions[nowIdx];
        });
      }
    }
  },  // end of methods
  created: function() {
    this.startTimer = new Date().getTime();
    this.missionId = Number(this.$route.params.id);
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION.path, {
      method: this.renew? 'renew': 'submit',
      id: this.missionId,
      num: 0,
      step: 0
    }, jsonObj => {
      if (jsonObj.code === 201) {
        let dataObj = getDataObj(jsonObj);
        this.totalNum = dataObj.total;
        let newQuestion = getNewQuestion(dataObj);
        this.template = Number(dataObj.template);
        console.log(newQuestion);
        this.questions.push(newQuestion);
        this.nowQuestionIndex = 1;
      } else {
        this.$message.error(jsonObj.data);
      }
    });
  },  // end of created
  watch: {
    nowQuestionIndex: {
      handler: function (newVal) {
        let targetIdx = this.questions.findIndex(question => {
          return question.index === newVal - 1;
        });
        console.log(newVal, targetIdx);
        console.log(this.questions);
        this.nowQuestion = this.questions[targetIdx];
      },
      immediate: true
    }
  }   // end of watch
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}

function getNewQuestion(dataObj) {
  let newQuestion = {
    index: dataObj.ret,
    type: dataObj.type || 'chosen',
    description: dataObj.word,
    answer: "",
    has_image: false,
    has_pre_ans: false
  };
  // 对于含有图片的题
  const type_list = newQuestion.type.split('-');
  if (type_list.length === 2 && type_list[1] === 'image') {
    newQuestion.type = type_list[0];
    newQuestion.has_image = true;
    newQuestion.image = { url: dataObj.image_url };
    console.log(dataObj.image_url);
  }
  // 对于选择题
  if (newQuestion.type === 'chosen') {
    newQuestion.options = dataObj.choices.split('||');
  }
  return newQuestion;
}
</script>

<style>
#root {
  padding: 50px 150px;
}
</style>