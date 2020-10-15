<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="300" style="background: #fff">
          <a-menu mode="inline" style="height: 100%">
            <a-menu-item key="1" @click="missionType = 'judgement'">添加判断题任务</a-menu-item>
            <a-menu-item key="2" @click="missionType = 'checkbox'">添加选择题任务</a-menu-item>
            <a-menu-item key="3" @click="missionType = 'text'">添加文字题任务</a-menu-item>
          </a-menu>
        </a-layout-sider>

        <!-- 任务预览区 -->
        <a-layout-content style="margin: 10px 40px">
          <h2>编辑任务</h2>
          <div>
            <span>任务名称：</span>
            <a-input
                v-model.trim="missionDescription"
                palceholder="your mission title" />
          </div>
          <div>任务类型：{{ missionType }}</div>
          <div>
            <span>任务至少标注次数：</span>
            <a-input-number
                v-model.trim.number="minimumTotalAnnotation" />
          </div>
          <div>
            <span>任务截止期限：</span>
            <a-date-picker v-model="missionDdl" />
          </div>
          <div>
            <span>分发对象：</span>
            <a-select
                v-model="selectedTags"
                mode="multiple">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option>
            </a-select>
          </div>

          <a-upload-dragger
              name="file"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p>
              Click or drag file to this area to upload
            </p>
          </a-upload-dragger>

          <a-button type="primary">
            <router-link to="/edit">手动添加题目</router-link>
          </a-button>

        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "create_mission",
  props: [
    "username",
    "id"
  ],
  data() {
    return {
      missionType: "",
      missionDescription: "",
      minimumTotalAnnotation: 10,
      missionDdl: null,
      selectedTags: []
    }
  }
}
</script>

<style scoped>
  div {
    margin: 20px;
  }
</style>