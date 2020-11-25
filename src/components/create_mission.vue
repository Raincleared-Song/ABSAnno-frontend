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
            <a-select-option value="fill">文字描述题任务</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
            ref="has_image"
            label="是否图片任务"
            prop="has_image">
          <a-switch
              v-model="mission_info.has_image"
              @blur="$refs.has_image.onFieldBlur()"
              checked-children="yes"
              un-checked-children="no" />
        </a-form-model-item>

        <a-form-model-item
            label="任务封面">
          <a-upload
              v-if="!mission_info.has_cover"
              ref="upload_cover"
              class="img-uploader"
              action="#"
              :show-upload-list="false"
              :before-upload="onChangeCover">
            <a-button style="margin: 10px 0">
              <i class="el-icon-plus" />
              <span style="margin: 0 10px">点击上传封面</span>
            </a-button>
          </a-upload>
          <span v-else>
            <i class="el-icon-picture-outline" />
            <span style="margin: 0 30px 0 10px">{{ this.mission_info.cover.name }}</span>
            <a-button
                @click="onRemoveCover"
                size="small" shape="circle">
              <a-icon type="delete" />
            </a-button>
          </span>
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
            label="标注次数上限"
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
              :disabled-date="disabledDate" />
        </a-form-model-item>

        <a-form-model-item
            ref="tags"
            label="任务标签"
            prop="tags">
          <a-select
              v-model="mission_info.tags"
              @blur="$refs.tags.onFieldBlur()"
              mode="multiple">
            <a-select-option
                v-for="tag in tagsTotal"
                :key="tag">
              {{ tag }}
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
              手动验收
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
            ref="template"
            label="任务模版"
            prop="template">
          <a-select
              v-model="mission_info.template"
              @blur="$refs.template.onFieldBlur()">
            <a-select-option :key="0">上下排布</a-select-option>
            <a-select-option :key="1">分栏排布</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>

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
        check_way: [{ required: true, message: 'Mission check way cannot be null.', trigger: 'blur' }],
        template: [{ required: true, message: 'Mission template cannot be null.', trigger: 'blur' }]
      },
      tagsTotal: [
          "青年", "中年", "老年", "学生",
          "教师", "上班族", "研究者",
          "人脸识别", "图片识别", "文字识别",
          "AI写作", "翻译校对", "文本分析",
          "生活场景", "工作场景", "购物", "运动", "旅游",
          "动物", "道德准则", "地理", "科学", "心理学"
      ]
    };
  },  // end of data
  props: [
      'mission_info'
  ],  // end of props
  methods: {
    disabledDate(current) {
      return current < moment().endOf('day')
    },
    onChangeCover(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error('Please upload image!', 1);
        return false;
      } else if (!isLt2M) {
        this.$message.error('Please upload a smaller image!', 1);
        return false;
      } else {
        this.mission_info.has_cover = true;
        this.mission_info.cover = file;
        return false;
      }
    },
    onRemoveCover() {
      this.mission_info.has_cover = false;
      this.mission_info.cover = null;
    }
  },  // end of methods
  watch: {
    mission_info: {
      handler() {
        this.$refs.mission_form.validate(valid => {
          this.$emit('update-valid', valid);
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.img-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.img-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
