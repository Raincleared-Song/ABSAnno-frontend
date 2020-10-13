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
          <div style="margin: 20px">
            任务名称：
            <a-input
                v-model.trim="missionDescription"
                palceholder="your mission title" />
          </div>
          <div style="margin: 20px">
            任务至少标注次数：
            <a-input-number
                v-model.trim.number="minimumTotalAnnotation" />
          </div>

          <edit_question
              :username="'l18'"
              :id="5"
              :type="missionType"
              :mission_description="missionDescription"
              :minimum_total_annotation="minimumTotalAnnotation" />

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
import edit_question from "@/components/edit_question";
export default {
  name: "create_mission",
  components: {
    edit_question: edit_question
  },
  data() {
    return {
      missionType: "",
      missionDescription: "",
      minimumTotalAnnotation: 10,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>