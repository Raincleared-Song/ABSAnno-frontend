<template>
  <a-layout id="components-layout-top-side">
    <a-layout-content>
      <a-layout style="padding: 24px 0; background: #fff">

        <!-- 左侧边栏 -->
        <a-layout-sider width="300" style="background: #fff">
          <a-menu mode="inline" style="height: 100%">
            <a-menu-item key="1" @click="addJudgementQuestion">添加判断题</a-menu-item>
            <a-sub-menu>
              <span slot="title">选择题</span>
              <a-menu-item key="2" @click="addSingleChoiceQuestion">添加单选题</a-menu-item>
              <a-menu-item key="3" @click="addMultipleChoiceQuestion">添加多选题</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="4" @click="addTextEditQuestion">添加文字题</a-menu-item>
          </a-menu>
        </a-layout-sider>

        <!-- 题目预览区 -->
        <a-layout-content style="margin: 10px 40px">
          <h2>编辑任务</h2>
          <div style="margin: 20px">
            任务名称：<a-input palceholder="your mission title" v-model.trim="mission_description" />
          </div>
          <div style="margin: 20px">
            任务至少标注次数：<a-input-number v-model.trim.number="minimum_total_annotation" />
          </div>

          <!-- 提交成功的消息框 -->
          <a-modal
              title="Success!"
              :visible="modal.visible"
              @ok="$router.push('/ground')"
              @cancel="onCancelModal"
              closable="false">
            <div style="margin: 20px">任务提交成功！</div>
            <div style="margin: 20px">是否返回广场？</div>
          </a-modal>

          <!-- 底部分页栏和提交按钮 -->
          <div style="margin: 20px auto">
            <a-pagination
                v-model="nowQuestionIndex"
                :total="questions.length"
                :page-size="1" />
          </div>
          <a-button
              v-show="questions.length > 0 || nowQuestion != null"
              :disabled="modal.submitted"
              type="primary" @click="submit">
            submit
          </a-button>
        </a-layout-content>

      </a-layout>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "create_mission"
}
</script>

<style scoped>

</style>