<template>
  <div>
    <div v-if="totalNum > 0">
      <a-list
          item-layout="vertical"
          size="medium"
          :pagination="pagination"
          :data-source="missionList">

        <a-list-item
            slot="renderItem"
            slot-scope="mission"
            key="mission.id">
          <a-list-item-meta
              :description="mission.info">
            <a slot="title">{{ mission.name }}</a>
          </a-list-item-meta>
          <img
              slot="extra"
              :src="type2src(mission)"
              width="270" alt=""/>
          <template
              slot="actions"
              v-for="{ type, text } in mission.actions">
            <span :key="type">
              <a-icon :type="type" theme="twoTone" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
        </a-list-item>
      </a-list>
      <a-back-top />
    </div>

    <a-empty v-else :description="'您还没有答题'" />
  </div>
</template>

<script>
import getBackend from "@/utils/getBackend";
import API from "@/utils/API";

export default {
  name: "history",
  data() {
    return {
      totalNum: 0, // 总共回答了多少道题
      missionList: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }
    }
  },  // end of data
  methods: {
    type2src(mission) {
      if (mission.question_form === 'judgement') {
        return "@/assets/ground/judgement2.jpg";
      } else if (mission.question_form === 'chosen') {
        return "@/assets/ground/choice2.jpg";
      }
      return "";
    }
  },  // end of methods
  created() {
    getBackend(API.GET_USER.path, {
      method: 'history'
    }, jsonObj => {
      if (jsonObj.code === 201) {
        const dataObj = getDataObj(jsonObj);
        this.totalNum = dataObj.total_num;
        this.missionList = dataObj.mission_list.map(mission => {
          return {
            id: mission.id,
            name: mission.name,
            question_form: mission.question_form,
            info: mission.info,
            actions: [
              { type: 'user', text: mission.user },
              { type: 'profile', text: mission.question_num },
              { type: 'clock-circle', text: mission.ret_time },
              { type: 'dollar', text: mission.reward }
            ]
          };
        });
      }
    });
  }   // end of created
}

function getDataObj(jsonObj) {
  let dataStr = jsonObj.data;
  dataStr = dataStr.replace(/'/g, '"');
  return JSON.parse(dataStr);
}
</script>

<style scoped>

</style>