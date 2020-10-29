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
              @change="$refs.name.onFieldChange()"
              allow-clear />
        </a-form-model-item>

        <a-form-model-item
            ref="type"
            label="任务类型"
            prop="type">
          <a-select
              v-model="mission_info.type"
              @blur="$refs.type.onFieldBlur()"
              @change="$refs.type.onFieldChange()">
            <a-select-option value="judgement">判断题任务</a-select-option>
            <a-select-option value="choice">选择题任务</a-select-option>
            <a-select-option value="text">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item>
          <a-textarea
              v-model="mission_info.info" />
        </a-form-model-item>

        <a-form-model-item
            ref="min"
            label="标注次数下限"
            prop="min">
          <a-input-number
              v-model.trim.number="mission_info.min" />
        </a-form-model-item>

        <a-form-model-item
            ref="ddl"
            label="任务截止期限"
            prop="ddl">
          <a-date-picker
              v-model="mission_info.ddl" />
        </a-form-model-item>

        <a-form-model-item
            ref="tags"
            label="分发对象"
            prop="tags">
          <a-select
              v-model="mission_info.tags"
              mode="tags">
            <a-select-option :key="'student'">
              学生
            </a-select-option>
            <a-select-option :key="'teacher'">
              教师
            </a-select-option>
            <a-select-option :key="'me'">
              程序员
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
            ref="reward"
            label="悬赏金额"
            prop="reward">
          <a-input-number
              v-model.trim.number="mission_info.reward"/>
        </a-form-model-item>

        <a-form-model-item
            ref="retrieve"
            label="回收时限"
            prop="retrieve">
          <a-input-number
              v-model.trim.number="mission_info.retrieve"/>
        </a-form-model-item>

        <a-form-model-item
            ref="check_way"
            label="验收方式"
            prop="check_way">
          <a-select
              v-model="mission_info.check_way">
            <a-select-option :key="'auto'">
              自动回收
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <a-button
          type="dashed"
          @click="onEditClick"
          block>
        手动添加题目
      </a-button>

    </a-layout-content>
  </a-layout>
</template>

<script>

export default {
  name: "create_mission",
  data() {
    return {
      rules: {
        name: [{ required: true, message: 'Mission name cannot be null.', trigger: 'blur' }],
        type: [{ required: true, message: 'Mission type cannot be null.', trigger: 'blur' }],
        min: [{ required: true, message: 'Mission minimum annotation cannot be null.', trigger: 'blur' }],
        ddl: [{ required: true, message: 'Mission deadline cannot be null.', trigger: 'blur' }],
        reward: [{ required: true, message: 'Mission reward cannot be null.', trigger: 'blur' }],
        retrieve: [{ required: true, message: 'Mission retrieve time cannot be null.', trigger: 'blur' }],
        check_way: [{ required: true, message: 'Mission check way cannot be null.', trigger: 'blur' }]
      }
    };
  },
  props: {
    mission_info: {
      type: Object,
      default() {
        return {
          name: '',
          type: '',
          info: '',
          min: 10,
          ddl: null,
          tags: [],
          reward: '',
          retrieve: '',
          check_way: ''
        };
      }
    }
  },
  methods: {
    onEditClick() {
      this.$refs.mission_form.validate(valid => {
        if (valid) {
          this.$emit('submit-info');
        } else {
          this.$message.warning("error submit");
        }
      });
    }
  }
}
</script>

<style>

</style>
