<template>
  <div class="card-container">

    <router-view
        :mission_info="mission"
        :questions="questions"
        @on-submit-info="onSubmitInfo"
        @on-submit-questions="submit"
    />
    <a-steps
        v-model="current"
        v-if="showSteps"
        type="navigation"
        :style="{ marginBottom: '60px', boxShadow: '0px -1px 0 0 #e8e8e8 inset' }">
      <a-step title="编辑任务信息" disabled />
      <a-step title="编辑/上传题目" disabled />
    </a-steps>

  </div>
</template>

<script>
import API from "@/utils/API";
import postBackend from "@/utils/postBackend";

export default {
  name: "mission_field",
  props: [
    "username",
    "id"
  ],
  data() {
    return {
      mission: {
        name: '',
        type: '',
        min: 10,
        ddl: undefined,
        tags: []
      },
      questions: [],
      current: 0,
      showSteps: true
    };
  },
  methods: {
    onSubmitInfo(missionInfo) {
      this.$router.push('/mission/edit');
    },
    // 向后端发送数据
    submit() {
      console.log(1111);
      let submitObj = {
        name: this.mission.name,
        question_form: this.mission.type,
        question_num: this.questions.length.toString(),
        mission_tags: this.mission.tags,
        // user_id: this.id.toString(),
        total: this.mission.min.toString()
      };
      submitObj.question_list = this.questions.map(element => {
        if (this.mission.type === 'judgement')
          return { contains: element.description };
      });
      console.log(submitObj);
      postBackend(API.POST_NEW_MISSION, submitObj, jsonObj => {
        console.log(jsonObj);
        this.$message.success("提交成功！即将返回首页！");
        this.$router.push("/ground");
      });
    },
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/mission/create') {
        this.current = 0;
        this.showSteps = true;
      } else if (newVal === '/mission/edit') {
        this.current = 1;
        this.showSteps = true;
      } else if (newVal === '/mission/upload') {
        this.showSteps = false;
      }
    }
  }
}
</script>

<style scoped>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>