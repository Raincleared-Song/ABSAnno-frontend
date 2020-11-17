<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>选择题</h2>

    <!-- 题目描述区 -->
    <div v-if="editable" style="margin: 10px">
      <div style="margin: 10px">编辑题目：</div>
      <a-textarea
          v-model="question.description"
          placeholder="Your question..." />
    </div>
    <div v-else>
      <p style="margin: 10px 5px">{{ this.question.description }}</p>
    </div>

    <!-- 图片区 -->
    <div v-if="has_image" style="margin: 10px 15px">
      <div v-if="editable">
        <el-upload
            v-if="!question.image"
            ref="upload_img"
            class="img-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onChangeImage">
          <a-button style="margin: 10px 0">
            <i class="el-icon-plus" />
            <span style="margin: 0 10px">点击上传图片</span>
          </a-button>
        </el-upload>
        <div v-else>
          <i class="el-icon-picture-outline" />
          <span style="margin: 0 30px 0 10px">{{ question.image.name }}</span>
          <a-button
              @click="onRemoveImage"
              size="small" shape="circle">
            <a-icon type="delete" />
          </a-button>
        </div>
      </div>
      <div v-else>
        <el-image :src="question.image.url" />
      </div>
    </div>

    <!-- 选项区 -->
    <div
        v-if="editable"
        style="margin: 15px 10px; width: 100%;">
      <span><strong>编辑选项：</strong></span>
      <span style="margin: 0 50px 0 0; text-align: right">
        设置预设答案
        <a-switch
            v-model="question.has_pre_ans"
            checked-children="yes"
            un-checked-children="no" />
      </span>
    </div>
    <div>
      <a-radio-group
          v-if="question.options.length"
          :disabled="editable && (!question.has_pre_ans)"
          v-model="question.answer"
          style="margin: 10px">
        <div
            v-for="(option, index) in question.options"
            :key="index"
            style="margin: 5px">
          <a-radio
              :value="optionCode[index]">
            {{ option }}
          </a-radio>
          <a-button
              v-if="editable"
              size="small"
              @click="$emit('removeOption', question.index, index)">
            <a-icon type="delete" />
          </a-button>
        </div>
      </a-radio-group>
      <div
          v-else style="margin: 10px">
        No option added...
      </div>
    </div>
    <div v-if="editable" style="margin: 5px 15px">
      <a-input
          v-model="question.new_option"
          placeholder="Add new option, press enter to commit."
          @keydown.enter="$emit('addOption', question.index, question.new_option)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "choice_group",
  data() {
    return {
      optionCode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    };
  },  // end of data
  props: [
      'question',
      'editable',
      'has_image'
  ],  // end of props
  methods: {
    onChangeImage(file) {
      this.question.image = file;
    },
    onRemoveImage() {
      console.log('remove');
      this.question.image = null;
    }
  },
  watch: {
    'question.has_pre_ans': function (newVal, oldVal) {
      if (newVal === false && oldVal === true)
        this.question.answer = "";
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