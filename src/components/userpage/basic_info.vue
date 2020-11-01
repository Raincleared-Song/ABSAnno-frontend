<template>
  <div>
    <a-descriptions
        title="用户信息"
        :column="2"
        bordered>
      <a-descriptions-item label="用户名">
        {{ this.username }}
      </a-descriptions-item>
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
      userScore: '未登录',
      userWeight: '未登录',
      userAnsNum: '未登录'
    };
  },  // end of data
  props: [
    'username',
    'power'
  ],  // end of props
  method: {

  },  // end of methods
  created() {
    getBackend(API.GET_USER, { method: 'user' },
        jsonObj => {
      if (jsonObj.code === 201) {
        let dataObj = getDataObj(jsonObj);
        this.userScore = dataObj.coin;
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