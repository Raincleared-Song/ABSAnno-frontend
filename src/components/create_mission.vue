<template>
  <a-layout style="padding: 24px 0; background: #fff;">

    <!-- 任务编辑区 -->
    <a-layout-content style="margin: 10px 40px;">
      <h1>编辑任务</h1>
      <a-form-model
          :model="form"
          :label-col="{ span: 4, offset: 1 }"
          :wrapper-col="{ span: 13 }">
        <a-form-model-item
            ref="missionDescription"
            label="任务名称"
            prop="name"
            style="margin: 0 10px;">
          <a-input
              v-model.trim="form.missionDescription"
              palceholder="your mission title"
              allow-clear />
        </a-form-model-item>
        <a-form-model-item
            ref="missionType"
            label="任务类型"
            prop="type" required>
          <a-select v-model="form.selectedTags">
            <a-select-option value="judgement">判断题任务</a-select-option>
            <a-select-option value="checkbox">选择题任务</a-select-option>
            <a-select-option value="text">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
            ref="minimumTotalAnnotation"
            label="任务至少标注次数"
            prop="min">
            <a-input-number
                v-model.trim.number="form.minimumTotalAnnotation" />
        </a-form-model-item>
        <a-form-model-item
            ref="missionDDL"
            label="任务截止期限"
            prop="ddl">
          <a-date-picker v-model="form.missionDDL" />
        </a-form-model-item>
        <a-form-model-item
            ref="selectedTags"
            label="分发对象"
            prop="tags">
          <a-select
              v-model="form.selectedTags"
              mode="multiple">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
              {{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <div>
        请上传文件或者
        <a-button type="link">
          <router-link to="/edit">
            手动添加题目
          </router-link>
        </a-button>
      </div>
      <a-upload-dragger
          name="file"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          style="margin: 10px 50px; height: 80%;">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p>
          Click or drag file to this area to upload
        </p>
      </a-upload-dragger>

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
      form: {
        missionType: "",
        missionDescription: "",
        minimumTotalAnnotation: 10,
        missionDDL: null,
        selectedTags: []
      }
    }
  }
}
</script>

<style>

</style>
