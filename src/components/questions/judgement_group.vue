<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>判断题</h2>

    <!-- 题目描述区 -->
    <div v-if="editable" style="margin: 10px">
      <p>编辑题目：</p>
      <a-textarea
          v-model="question.description"
          placeholder="你的问题描述" />
    </div>
    <div v-else>
      <p style="margin: 10px 5px">{{ this.question.description }}</p>
    </div>

    <!-- 图片区 -->
    <div v-if="has_image">
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
  props: [
      'question',
      'editable',
      'has_image'
  ],  // end of props
  methods: {
    onChangeImage(file) {
      this.$emit('updateImage', this.question.index, file);
    }
  }
}
</script>

<style>

</style>