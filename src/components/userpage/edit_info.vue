<template>
  <div style="padding: 24px 0;">
    <h3>编辑个人信息</h3>

    <!-- 编辑信息表单区 -->
    <a-form-model
        ref="user_info"
        :model="user_info"
        :label-col="{ span: 3 }">

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
          label="偏好题目类型"
          prop="question_form">
        <a-checkbox-group
            v-model="user_info.question_form"
            :options="questionForms" />
      </a-form-model-item>

      <a-form-model-item
          label="偏好题目数量"
          prop="question_num">
        <a-row>
          <a-col :span="12">
            <a-slider range
                :min="1" :max="100" />
          </a-col>
          <a-col :span="4">
            <a-input-number
                :min="1" :max="100" />
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>

    <!-- 按钮区域 -->
    <div class="buttons">
      <a-button-group>
        <a-button
            @click="cancel"
        >Cancel
        </a-button>
        <a-button
            @click="submit"
            type="primary"
        >Submit
        </a-button>
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
        username: '',
        question_form: '',
        question_num: 0
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
    },
    cancel() {
      this.$emit('cancel-edit');
    }
  },  // end of methods
  created: function () {
    // this.change(0);
  }   // end of created
}
</script>

<style scoped>

</style>