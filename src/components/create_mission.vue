<template>
  <a-layout style="padding: 24px 0; background: #fff;">

    <!-- 任务编辑区 -->
    <a-layout-content style="margin: 10px 40px;">
      <h1>编辑任务</h1>
      <a-form-model
          ref="mission_form"
          :model="form"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 15, offset: 1 }">
        <a-form-model-item
            ref="name"
            label="任务名称"
            prop="name">
          <a-input
              v-model.trim="form.name"
              @blur="() => { $refs.name.onFieldBlur(); }"
              @change="() => { $refs.name.onFieldChange(); }"
              allow-clear />
        </a-form-model-item>
        <a-form-model-item
            ref="type"
            label="任务类型"
            prop="type">
          <a-select
              v-model="form.type"
              @blur="$refs.type.onFieldBlur()"
              @change="$refs.type.onFieldChange()">
            <a-select-option value="judgement">判断题任务</a-select-option>
            <a-select-option value="checkbox">选择题任务</a-select-option>
            <a-select-option value="text">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
            label="标注次数下限" prop="min">
            <a-input-number
                v-model.trim.number="form.min" />
        </a-form-model-item>
        <a-form-model-item
            label="任务截止期限" prop="ddl">
          <a-date-picker v-model="form.ddl" />
        </a-form-model-item>
        <a-form-model-item
            label="分发对象" prop="tags">
          <a-select
              v-model="form.tags"
              mode="multiple">
            <a-select-option :key="1">
              学生
            </a-select-option>
            <a-select-option :key="2">
              教师
            </a-select-option>
            <a-select-option :key="3">
              程序员
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

      <div>
        请上传文件或者
        <a-button type="link" @click="onEditClick">
            手动添加题目
        </a-button>
      </div>
      <div style="margin: 20px;">
        <a-upload-dragger
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
          <p><a-icon type="inbox" /></p>
          <p>Click or drag file to this area to upload</p>
        </a-upload-dragger>
      </div>

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
        name: '',
        type: '',
        min: 10,
        ddl: undefined,
        tags: []
      },
      rules: {
        name: [{ required: true, message: 'Mission name cannot be null.', trigger: 'blur' }],
        type: [{ required: true, message: 'Mission type cannot be null.', trigger: 'blur' }],
        min: [{ required: false }],
        ddl: [{ required: false }],
        tags: [{ required: false }]
      }
    };
  },
  methods: {
    onEditClick() {
      this.$refs.mission_form.validate(valid => {
        if (valid) {
          this.$router.push(`/edit/${this.form.type}`);
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
