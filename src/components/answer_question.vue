<template>
  <body id="root">
    <!-- 显示问题的区域 -->
    <div v-if="nowQuestion != null">
      <JudgementGroup
          v-if="nowQuestion.type === 'judgement'"
          :editable="false"
          :question="nowQuestion"
          :has_image="nowQuestion.has_image" />
      <CheckboxGroup
          v-else-if="nowQuestion.type === 'choice'"
          :editable="false"
          :question="nowQuestion"
          :has_image="nowQuestion.has_image" />
      <TextEdit
          v-else-if="nowQuestion.type === 'text'"
          :editable="false"
          :question="nowQuestion"
          :has_image="nowQuestion.has_image" />
    </div>
    <a-empty v-else :description="false" />

    <!-- 答题进度条 -->
    <a-steps :current="nowQuestionIndex" style="margin: 40px">
      <a-step v-for="n in totalNum" :key="n" :title="nowQuestion.type" />
    </a-steps>

    <!-- 按钮区域 -->
    <div align="center">
      <a-space :size="20">
        <a-button
            :disabled="nowQuestionIndex === 0"
            @click="switchToPrev">
          <a-icon type="arrow-left" />上一题
        </a-button>
        <a-button
            :disabled="this.questions.length < totalNum"
            @click="submit" type="primary">
          提交任务<a-icon type="check" />
        </a-button>
        <a-button
            :disabled="nowQuestionIndex === totalNum - 1"
            @click="switchToNext">
          下一题<a-icon type="arrow-right" />
        </a-button>
        <a-button
            @click="returnSquare">
          返回广场<a-icon type="rollback" />
        </a-button>
      </a-space>
    </div>
  </body>
</template>

<script>
import JudgementGroup from "@/components/questions/judgement_group";
import TextEdit from "@/components/questions/text_edit";
import CheckboxGroup from "@/components/questions/checkbox_group";
import getBackend from "@/utils/getBackend";
import postBackend from "@/utils/postBackend";
import API from "@/utils/API";

export default {
  name: "answer_question",
  components: {
    JudgementGroup: JudgementGroup,
    CheckboxGroup: CheckboxGroup,
    TextEdit: TextEdit
  },  // end of components
  data() {
    return {
      missionId: 0,
      totalNum: 0,    // 总题目数量
      questions: [],  // 问题列表
      nowQuestionIndex: -1, // 从0开始
      nowQuestion: null     // 不要显式地去改，监听nowQuestionIndex来更改
    };
  },  // end of data
  props:[
    "username",
    "id",
  ],
  methods: {
    // 向后端发送数据
    submit() {
      let answers = this.questions.map(question => {
        if (question.type === 'choice') {
          return question.answer.join('|');
        } else {
          return question.answer;
        }
      });
      console.log(answers);
      postBackend(API.POST_SINGLE_QUESTION.path, {
        mission_id: this.missionId.toString(),
        ans: answers
      }, jsonObj => {
        if (jsonObj.code === 201) {
          this.$message.success("提交成功，返回广场！");
          this.$router.push("/ground");
        } else {
          this.$message.error("Try later!");
        }
      });
    },
    // 下一题
    switchToNext() {
      let nextIndex = this.nowQuestionIndex + 1;
      if (nextIndex === this.questions.length) {
        // 下一题未加载，从后端获取
        getBackend(API.GET_SINGLE_QUESTION.path, {
          id: this.missionId,
          num: nextIndex,
          step: 0
        }, jsonObj => {
          if (jsonObj.code === 201) {
            console.log(jsonObj);
            let dataObj = getDataObj(jsonObj);
            let newQuestion = getNewQuestion(dataObj);
            this.questions.push(newQuestion);
            this.nowQuestionIndex = this.questions.length - 1;
          } else {
            this.$message.error("Try later!");
          }
        });
      } else {
        // 下一题已经加载过了
        this.nowQuestionIndex += 1;
      }
    },
    // 上一题
    switchToPrev() {
      this.nowQuestionIndex -= 1;
    },
    // 返回广场
    returnSquare() {
      this.$router.push("/ground");
    }
  },  // end of methods
  created: function() {
    let name = this.$route.path;
    this.missionId = Number(name.slice(10,));
    // 从后台申请数据加载
    getBackend(API.GET_SINGLE_QUESTION.path, {
      id: this.missionId,
      num: 0,
      step: 0
    }, jsonObj => {
      if (jsonObj.code === 201) {
        let dataObj = getDataObj(jsonObj);
        this.totalNum = dataObj.total;
        let newQuestion = getNewQuestion(dataObj);
        console.log(newQuestion);
        this.questions.push(newQuestion);
        this.nowQuestionIndex = this.questions.length - 1;
      } else {
        this.$message.error("Try later!");
      }
    });
  },  // end of created
  watch: {
    nowQuestionIndex(newVal) {
      this.nowQuestion = this.questions[newVal];
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
    type: dataObj.type !== undefined? dataObj.type: 'judgement',
    description: dataObj.word,
    answer: "",
    has_image: false
  };
  // 对于含有图片的题
  const type_list = newQuestion.type.split('-');
  if (type_list.length === 2 && type_list[1] === 'image') {
    newQuestion.type = type_list[0];
    newQuestion.has_image = true;
  }
  // 对于选择题
  if (newQuestion.type === 'choice') {
    newQuestion.options = dataObj.options.split('||');
    newQuestion.answer = [];
  }
  return newQuestion;
}
</script>

<style>
#root {
  padding: 50px 150px;
}
</style>