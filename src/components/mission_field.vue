<template>
  <div>
    {{ this.id }}
    <router-view
        :mission_info="mission"
        :questions="questions"
        @on-submit-info="onSubmitInfo"
        @on-submit-questions="submit"
    />
    <a-steps
        v-model="current" type="navigation"
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
      current: 0
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
      if (newVal === '/mission/create')
        this.current = 0;
      else if (newVal === '/mission/edit')
        this.current = 1;
    }
  }
}
</script>

<style scoped>
</style>