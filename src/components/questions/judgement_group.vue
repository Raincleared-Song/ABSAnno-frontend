<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>判断题</h2>

    <!-- 题目描述区 -->
    <div v-if="editable" style="margin: 10px">
      <p>编辑题目：</p>
      <a-textarea v-model="question.description" placeholder="your question" />
    </div>
    <div v-else>
      <p>{{ this.question.description }}</p>
    </div>

    <!-- 图片区 -->
    <div v-if="editable">
      <el-upload
          ref="upload_img"
          action="#"
          :limit="1"
          :auto-upload="false"
          :on-change="onChangeImage"
          style="margin: 0 auto">
        <div slot="file" slot-scope="{file}">
          <el-image
              class="el-upload-list__item-thumbnail"
              :src="file.src" />
        </div>
      </el-upload>
    </div>
    <div v-else>
      <el-image
          :src="question.image" />
    </div>

    <!-- 选项区 -->
    <a-radio-group
        :disabled="editable"
        v-model="question.answer"
        style="margin: 10px">
      <a-radio value="1">True</a-radio>
      <a-radio value="0">False</a-radio>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default() {
        return {
          index: 0,
          type: 'judgement',
          // 出题者可编辑
          description: "",
          // 做题者可编辑
          answer: ""
        }
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },  // end of props
  methods: {
    onChangeImage(file) {
      this.$emit('updateImage', this.id, file);
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

