<template>
  <div class="card-container">
    <a-tabs default-active-key="1">

      <a-tab-pane key="1" tab="手动添加任务">
        <router-view
            :mission_info="mission"
            :questions="questions"
            @submit-info="onSubmitInfo"
            @submit-questions="submit" />
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
import upload_mission from "@/components/upload_mission";
import postFile from "@/utils/postFile";

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
        info: '',
        min: 10,
        ddl: '',
        tags: [],
        reward: 0,
        retrieve: '',
        check_way: '',
        has_image: false
      },
      questions: [],
      current: 0
    };
  },
  methods: {
    onSubmitInfo() {
      this.$router.push('/mission/edit');
    },
    // 向后端发送数据
    submit() {
      // 题目的基本信息
      let submitObj = {
        name: this.mission.name,
        question_form: this.mission.has_image? this.mission.type + '-image': this.mission.type,
        question_num: this.questions.length.toString(),
        mission_tags: this.mission.tags,
        info: this.mission.info,
        total: this.mission.min.toString(),
        reward: this.mission.reward.toString(),
        deadline: this.mission.ddl.toString(),
        retrieve_time: this.mission.retrieve.toString(),
        check_way: this.mission.check_way
      };
      submitObj.question_list = this.questions.map(question => {
        if (this.mission.type === 'judgement') {
          return { contains: question.description };
        } else if (this.mission.type === 'choice') {
          return {
            contains: question.description,
            options: question.options.join(',')
          };
        } else if (this.mission.type === 'text') {
          return { contains: question.description };
        }
      });
      console.log(submitObj);

      // 题目的图片信息
      let imageList = this.questions.map(question => {
        return question.image !== undefined? question.image: null;
      });
      console.log(imageList);

      // 向后端发送
      let formData = new FormData();
      formData.append('info', JSON.stringify(submitObj));
      formData.append('image', imageList);
      postFile(API.POST_NEW_MISSION.path, formData, jsonObj => {
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