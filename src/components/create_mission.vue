<template>
  <a-layout style="padding: 24px 0; background: #fff;">

    <!-- 任务编辑区 -->
    <a-layout-content style="margin: 10px 40px;">
      <h1>编辑任务</h1>
      <a-form-model
          ref="mission_form"
          :model="mission_info"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 15, offset: 1 }">

        <a-form-model-item
            ref="name"
            label="任务名称"
            prop="name">
          <a-input
              v-model.trim="mission_info.name"
              @blur="$refs.name.onFieldBlur()"
              allow-clear />
        </a-form-model-item>

        <a-form-model-item
            ref="type"
            label="任务类型"
            prop="type">
          <a-select
              v-model="mission_info.type"
              @blur="$refs.type.onFieldBlur()">
            <a-select-option value="chosen">选择题任务</a-select-option>
            <a-select-option value="text">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
            ref="has_image"
            label="是否图片任务"
            prop="has_image">
          <a-switch
              v-model="mission_info.has_image"
              @blur="$refs.has_image.onFieldBlur()"
              checked-children="是"
              un-checked-children="否" />
        </a-form-model-item>

        <a-form-model-item
            ref="info"
            label="任务简介"
            prop="info">
          <a-textarea
              v-model="mission_info.info"
              @blur="$refs.info.onFieldBlur()"
              allow-clear />
        </a-form-model-item>

        <a-form-model-item
            ref="min"
            label="标注次数下限"
            prop="min">
          <a-input-number
              v-model.trim.number="mission_info.min"
              @blur="$refs.min.onFieldBlur()" />
        </a-form-model-item>

        <a-form-model-item
            ref="ddl"
            label="任务截止期限"
            prop="ddl">
          <a-date-picker
              v-model="mission_info.ddl"
              @blur="$refs.ddl.onFieldBlur()"
              @change="$refs.ddl.onFieldChange()"
              format="YYYY-MM-DD"
              :disabled-date="disabledDate"
          >
          </a-date-picker>
        </a-form-model-item>

        <a-form-model-item
            ref="tags"
            label="分发对象"
            prop="tags">
          <a-select
              v-model="mission_info.tags"
              @blur="$refs.tags.onFieldBlur()"
              mode="tags">
            <a-select-option :key="'student'">
              学生
            </a-select-option>
            <a-select-option :key="'teacher'">
              教师
            </a-select-option>
            <a-select-option :key="'code-farmer'">
              程序员
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
            ref="reward"
            label="悬赏金额"
            prop="reward">
          <a-input-number
              v-model.trim.number="mission_info.reward"
              @blur="$refs.reward.onFieldBlur()" />
          <span class="ant-form-text">单位：金币</span>
        </a-form-model-item>

        <a-form-model-item
            ref="retrieve"
            label="回收时限"
            prop="retrieve">
          <a-input-number
              v-model.trim.number="mission_info.retrieve"
              @blur="$refs.retrieve.onFieldBlur()" />
          <span class="ant-form-text">单位：小时</span>
        </a-form-model-item>

        <a-form-model-item
            ref="check_way"
            label="验收方式"
            prop="check_way">
          <a-select
              v-model="mission_info.check_way"
              @blur="$refs.check_way.onFieldBlur()">
            <a-select-option :key="'auto'">
              自动验收
            </a-select-option>
            <a-select-option :key="'human'">
              手动验收（没写，不要选）
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <a-button
          type="dashed"
          @click="onEditClick"
          block>
        继续编辑题目
      </a-button>

    </a-layout-content>
  </a-layout>
</template>

<script>
import moment from 'moment';

export default {
  name: "create_mission",
  data() {
    return {
      rules: {
        name: [{ required: true, message: 'Mission name cannot be null.', trigger: 'blur' }],
        type: [{ required: true, message: 'Mission type cannot be null.', trigger: 'blur' }],
        has_image: [{ required: true, message: 'Has-Image cannot be null.', trigger: 'blur' }],
        min: [{ required: true, message: 'Mission minimum annotation cannot be null.', trigger: 'blur' }],
        ddl: [{ required: true, message: 'Mission deadline cannot be null.', trigger: ['blur', 'change'] }],
        reward: [{ required: true, message: 'Mission reward cannot be null.', trigger: 'blur' }],
        retrieve: [{ required: true, message: 'Mission retrieve time cannot be null.', trigger: 'blur' }],
        check_way: [{ required: true, message: 'Mission check way cannot be null.', trigger: 'blur' }]
      }
    };
  },  // end of data
  props: [
      'mission_info'
  ],  // end of props
  methods: {
    onEditClick() {
      this.$refs.mission_form.validate(valid => {
        if (valid) {
          this.$emit('submit-info');
        } else {
          this.$message.warning("error submit");
        }
      });
    },
    disabledDate(current) {
      return current < moment().endOf('day')
    }
  }
}
</script>

<style scoped>

</style>
