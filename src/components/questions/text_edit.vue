<!-- 这是个文字输入题页面 -->
<template>
  <div>
    <h2>文字编辑题</h2>

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
            ref="upload_img_text"
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

    <!-- 答题区 -->
    <div style="margin: 15px 10px 10px 10px"><strong>答题区：</strong></div>
    <div>
      <a-input
          :disabled="editable && (!question.has_pre_ans)"
          v-model="question.answer"
          style="margin: 10px" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "text_edit",
    props: {
      question: {
        type: Object,
        default() {
          return {
            id: 0,
            type: 'chosen',
            description: "",
            new_option: "",
            answer: "A||B",
            image: ""
          }
        }
      },
      editable: {
        type: Boolean,
        default: false
      },
      has_image: {
        type: Boolean,
        default: false
      }
    },  // end of props
    methods: {
      onChangeImage(file) {
        const isImg = file.name.endsWith('.jpeg') ||
            file.name.endsWith('.png') ||
            file.name.endsWith('.jpg');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImg) {
          this.$message.error('Please upload image!', 1);
        } else if (!isLt2M) {
          this.$message.error('Please upload a smaller image!', 1);
        } else {
          this.question.image = file;
        }
      },
      onRemoveImage() {
        this.question.image = null;
      }
    },  // end of methods
    watch: {
      'question.has_pre_ans': function (newVal, oldVal) {
        if (newVal === false && oldVal === true)
          this.question.answer = "";
      }
    }
  }
</script>

<style>
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>