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
          <a-step title="编辑题目" disabled />
        </a-steps>
      </a-tab-pane>

      <a-tab-pane key="2" tab="上传压缩包">
        <upload_mission/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import API from "@/utils/API";
import upload_mission from "@/components/upload_mission";
import postFile from "@/utils/postFile";
import postBackend from "@/utils/postBackend";

export default {
  name: "mission_field",
  props: [
      'username',
      'id'
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
        reward: 5,
        retrieve: 24,
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
        question_form: this.mission.type + (this.mission.has_image ? '-image' : ''),
        question_num: this.questions.length.toString(),
        mission_tags: this.mission.tags.join('||'),
        info: this.mission.info,
        total: this.mission.min.toString(),
        reward: this.mission.reward.toString(),
        deadline: this.mission.ddl.format('YYYY-MM-DD').toString(),
        retrieve_time: this.mission.retrieve.toString(),
        check_way: this.mission.check_way
      };

      // 问题列表
      submitObj.question_list = this.questions.map(question => {
        let ret;
        if (this.mission.type === 'chosen') {
          ret = {
            contains: question.description,
            choices: question.options.join('||'),
            ans: question.answer
          };
        } else if (this.mission.type === 'text') {
          ret = {
            contains: question.description,
            ans: question.answer
          };
        }
        if (ret !== undefined && this.mission.has_image)
          ret.image_name = question.image.name;
        return ret;
      });

      console.log(submitObj.question_list);

      if (this.mission.has_image) {
        // 图片
        let formData = new FormData();
        formData.append('info', JSON.stringify(submitObj));
        this.questions.forEach(question => {
          formData.append('img_list', question.image.raw);
        });
        postFile(API.POST_NEW_MISSION.path, formData, jsonObj => {
          if (jsonObj.code === 201) {
            console.log(jsonObj);
            this.$message.success("Upload Success!", 1).then(() => {
              this.$router.push("/ground");
            });
          } else {
            console.log(jsonObj);
            this.$message.error("Upload Error! Try later!");
          }
        });
      } else {
        // 无图片
        postBackend(API.POST_NEW_MISSION.path, submitObj, jsonObj => {
          if (jsonObj.code === 201) {
            console.log(jsonObj);
            this.$message.success("Upload Success!", 1).then(() => {
              console.log(12345678);
              this.$router.push("/ground");
            });
          } else {
            console.log(jsonObj);
            this.$message.error("Upload Error! Try later!");
          }
        });
      }
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