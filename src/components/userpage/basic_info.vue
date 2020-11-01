<template>
  <div>
    <a-descriptions title="用户信息">
      <a-descriptions-item label="用户名">
        {{ this.username }}
      </a-descriptions-item>
      <a-descriptions-item label="用户积分">
        {{ this.user_score }}
      </a-descriptions-item>
      <a-descriptions-item label="用户信誉">
        {{ this.user_weight }}
      </a-descriptions-item>
      <a-descriptions-item label="用户答题数量/完成任务数">
        {{ this.user_ans_num }}
      </a-descriptions-item>
      <a-descriptions-item label="Credit">
        Credit
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import API from "@/utils/API";
import getBackend from "@/utils/getBackend";

export default {
  name: "basic_info",
  method: {
    parseUserInfo(data) {
      console.log(data.name, data.num, data.weight, data.score)
      this.user_name = data.name
      this.user_ans_num = data.num
      this.user_weight = data.weight
      this.user_score = data.score
    },
    parseHistory(data) {
      console.log(data)
      this.answerListData = []
      for (let i = 0; i < data.total_num; ++i) {
        console.log(data.mission_list[i])
        let d = new Date()
        d.setTime(data.mission_list[i].ret_time)
        this.answerListData.push({
          qName: data.mission_list[i].name,
          qUser: data.mission_list[i].user,
          qClass: data.mission_list[i].question_form,
          qTime: d.toLocaleString(),
        })
      }
    }
  },  // end of methods
  created() {
    getBackend(API.GET_USER_INFO, {
      method: 'user'
    }, jsonObj => {
      if (jsonObj.code === 201) {
        let dataObj = getDataObj(jsonObj);
        this.parseUserInfo(dataObj);
      }
    });
  }
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}
</script>

<style scoped>

</style>