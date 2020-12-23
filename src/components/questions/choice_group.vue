<!-- 这是个判断题的页面 -->
<template>
  <a-layout>
    <a-layout-content>
      <h2>选择题</h2>
      <!-- 题目描述区 -->
      <div v-if="editable" style="margin: 10px">
        <div style="margin: 10px">编辑题目：</div>
        <a-textarea
            v-model="question.description"
            placeholder="Your question..."/>
      </div>
      <div v-else>
        <p style="margin: 10px 5px; font-size: large; font-family: 'Times New Roman', serif">
          {{ this.question.description }}
        </p>
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
              <i class="el-icon-plus"/>
              <span style="margin: 0 10px">点击上传图片</span>
            </a-button>
          </el-upload>
          <div v-else>
            <i class="el-icon-picture-outline"/>
            <span style="margin: 0 30px 0 10px">{{ question.image.name }}</span>
            <a-button
                @click="onRemoveImage"
                size="small" shape="circle">
              <a-icon type="delete"/>
            </a-button>
          </div>
        </div>
        <div v-else>
          <el-image
              :src="question.image.url"
              fit="contain"
              style="width: 720px; height: 540px" />
        </div>
      </div>

      <!-- 选项区 -->
      <div v-if="editable && template === 0" style="margin: 15px 10px; width: 100%;">
        <span><strong>编辑选项：</strong></span>
        <span style="margin: 0 50px 0 0; text-align: right">
          设置预设答案
          <a-switch
              v-model="question.has_pre_ans"
              checked-children="yes"
              un-checked-children="no"/>
        </span>
      </div>
      <div v-if="template === 0">
        <a-radio-group
            v-if="question.options.length"
            :disabled="editable && (!question.has_pre_ans)"
            v-model="question.answer"
            style="margin: 10px">
          <span
              v-for="(option, index) in question.options"
              :key="index"
              style="margin: 5px">
            <a-radio
                :value="optionCode[index]" class="choice-box"
                style="padding: 2px 10px; font-size: large; font-family: 'Hiragino Sans GB', serif">
              {{ option }}
            </a-radio>
            <a-button
                v-if="editable"
                size="small"
                @click="$emit('removeOption', question.index, index)">
              <a-icon type="delete"/>
            </a-button>
          </span>
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
            @keydown.enter="$emit('addOption', question.index, question.new_option)"/>
      </div>
    </a-layout-content>

    <a-layout-sider
        v-if="template === 1"
        style="padding: 80px 10px 10px 10px">
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
              :value="optionCode[index]" class="choice-box"
              style="padding: 2px 10px; font-size: large; font-family: 'Hiragino Sans GB', serif">
            {{ option }}
          </a-radio>
          <br>
        </div>
      </a-radio-group>
    </a-layout-sider>

  </a-layout>
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
      'has_image',
      'template'
  ],  // end of props
  methods: {
    onChangeImage(file) {
      console.log(file)
      const isImg = file.name.endsWith('.jpeg') ||
                    file.name.endsWith('.png') ||
                    file.name.endsWith('.jpg') ||
                    file.name.endsWith('.gif') ;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        console.log(file.type)
        this.$message.error('Please upload image!', 1);
      } else if (!isLt2M) {
        this.$message.error('Please upload a smaller image!', 1);
      } else {
        this.question.image = file;
      }
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
.ant-layout {
  background: #ffffff;
}
.ant-layout-sider {
  background: #ffffff;
}
.choice-box:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>