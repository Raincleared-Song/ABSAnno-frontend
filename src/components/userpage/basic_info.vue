<template>
  <div>
    <a-descriptions
        title="用户信息"
        :column="1">
      <a-descriptions-item label="金币值">
        {{ this.userCoin }}
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
      userCoin: -1,
      userWeight: -1,
      userAnsNum: -1
    };
  },  // end of data
  mounted: function() {
    console.log('basic_info get');
    getBackend(API.GET_USER.path, {
      method: 'user'
    }, jsonObj => {
      console.log(jsonObj);
      if (jsonObj.code === 201) {
        const dataObj = getDataObj(jsonObj);
        this.userCoin = dataObj.coin;
        this.userWeight = dataObj.weight;
        this.userAnsNum = dataObj.num;
        this.$emit('change-avatar', dataObj.avatar);
      }
    });
  }   // mounted
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}
</script>

<style scoped>

</style>