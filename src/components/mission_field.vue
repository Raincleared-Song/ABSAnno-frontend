<template>
  <div class="card-container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="手动添加任务">
        <router-view
            :mission_info="mission"
            :questions="questions"
            @on-submit-info="onSubmitInfo"
            @on-submit-questions="submit" />
        <a-steps
            v-model="current"
            type="navigation"
            :style="{ marginBottom: '60px', boxShadow: '0px -1px 0 0 #e8e8e8 inset' }">
          <a-step title="编辑任务信息" disabled />
          <a-step title="编辑/上传题目" disabled />
        </a-steps>
      </a-tab-pane>

      <a-tab-pane key="2" tab="上传压缩包">
        <upload_mission />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import API from "@/utils/API";
import postBackend from "@/utils/postBackend";
import upload_mission from "@/components/upload_mission";

export default {
  name: "mission_field",
  props: [
    "username",
    "id"
  ],
  components: {
    upload_mission: upload_mission
  },
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
      let submitObj = {
        name: this.mission.name,
        question_form: this.mission.type,
        question_num: this.questions.length.toString(),
        mission_tags: this.mission.tags,
        // user_id: this.id.toString(),
        total: this.mission.min.toString()
      };
      submitObj.question_list = this.questions.map(element => {
        if (this.mission.type === 'judgement') {
          return { contains: element.description };
        } else if (this.mission.type === 'choice') {
          return {
            contains: element.description,
            options: element.options.join('|')
          };
        } else if (this.mission.type === 'text') {
          return { contains: element.description };
        }
      });
      console.log(submitObj);
      postBackend(API.POST_NEW_MISSION, submitObj, jsonObj => {
        if (jsonObj.code === 201) {
          console.log(jsonObj);
          this.$message.success("Upload Success!");
          this.$router.push("/ground");
        } else {
          this.$message.error("Upload Error! Try later!");
        }
      });
    },
  },
  watch: {
    '$route.path': function (newVal) {
      if (newVal === '/mission/create') {
        this.current = 0;
      } else if (newVal === '/mission/edit') {
        this.current = 1;
      }
    }
  }
}
</script>

<style scoped>
.card-container {
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