<template>
  <div>
    <a-descriptions
        title="用户信息"
        :column="1">
      <a-descriptions-item label="用户积分">
        {{ this.userScore }}
      </a-descriptions-item>
      <a-descriptions-item label="用户信誉">
        {{ this.userWeight }}
      </a-descriptions-item>
      <a-descriptions-item label="完成任务">
        {{ this.userAnsNum }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import API from "@/utils/API";
import getBackend from "@/utils/getBackend";

export default {
  name: "basic_info",
  data() {
    return {
      userScore: '',
      userWeight: '',
      userAnsNum: ''
    };
  },  // end of data
  created() {
    console.log('basic_info get');
    getBackend(API.GET_USER.path, {
      method: 'user'
    }, jsonObj => {
      console.log(jsonObj);
      if (jsonObj.code === 201) {
        const dataObj = getDataObj(jsonObj);
        this.userScore = dataObj.score;
        this.userWeight = dataObj.weight;
        this.userAnsNum = dataObj.num;
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