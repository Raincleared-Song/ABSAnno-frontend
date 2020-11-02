<template>
  <div style="padding: 24px 0;">
    <h3>编辑个人信息</h3>

    <!-- 编辑信息表单区 -->
    <a-form-model
        ref="user_info"
        :model="user_info"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16, offset: 0 }">

      <a-form-model-item
          label="用户名"
          prop="username">
      <a-input v-model="user_info.username">
        <a-icon slot="prefix" type="user"/>
        <a-tooltip slot="suffix" title="You can change your username here">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
        </a-tooltip>
      </a-input>
      </a-form-model-item>

      <a-form-model-item
          label="题目类型"
          prop="question_form">
          <a-select
              mode="multiple"
              v-model="user_info.question_form"
              placeholder="你偏好的题目类型">
            <a-select-option
                v-for="form in questionForms"
                :key="form.value">
              {{ form.label }}
            </a-select-option>
          </a-select>
      </a-form-model-item>

      <a-form-model-item
          label="题目数量"
          prop="question_num">
        <a-row>
          <a-input-group compact>
            <a-input-number
                v-model="user_info.question_num[0]"
                :min="1" :max="user_info.question_num[1]"
                placeholder="min"
                text-align="center"
                size="small"
                style="width: 60px" />
            <a-input
                placeholder="~"
                disabled
                size="small"
                style=" width: 25px; border-left: 0; pointer-events: none"/>
            <a-input-number
                v-model="user_info.question_num[1]"
                :min="user_info.question_num[0]" :max="100"
                placeholder="max"
                text-align="center"
                size="small"
                style="width: 60px" />
          </a-input-group>
        </a-row>
        <a-row>
          <a-slider
              range
              v-model="user_info.question_num"
              :default-value="[5, 50]"
              :min="1" :max="100"
              :tip-formatter="formatter"
              :marks="{ 1: '1', 20: '20', 50: '50', 100: '100' }"  />
        </a-row>
      </a-form-model-item>
    </a-form-model>

    <!-- 按钮区域 -->
    <div class="buttons" style="margin: 10px auto">
      <a-button-group block>
        <a-button
            @click="cancel"
        >Cancel</a-button>
        <a-button
            @click="submit"
            type="primary"
        >Submit</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>

export default {
  name: "edit_info",
  props: [
    'username'
  ],  // end of props
  data() {
    return {
      user_info: {
        username: this.username,
        question_form: [],
        question_num: [5, 50]
      },
      questionForms: [
        { label: '判断题', value: 'judgement' },
        { label: '选择题', value: 'chosen' },
        { label: '文字题', value: 'text' }
      ]
    }
  },  // end of data
  methods: {
    submit() {
      // TODO: 向后端post个人信息
      this.$emit('submit-edit');
    },
    cancel() {
      this.$emit('cancel-edit');
    },
    formatter(value) {
      return `${value}`;
    },
  },  // end of methods
  mounted: function () {
    // TODO: 从后端get个人信息
  }   // end of mounted
}
</script>

<style scoped>

</style>