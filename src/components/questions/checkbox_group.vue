<!-- 这是一个选择题的页面 -->
<template>
  <div>
    <h2>多选题</h2>
    <!-- 题目介绍区 -->
    <div v-if="editable">
      <div style="margin: 15px 10px 5px 10px">
        编辑题目：
      </div>
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
          :on-change="onChangeImage"
          :auto-upload="false"
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
    <div
        v-if="editable"
        style="margin: 15px 10px">
      编辑选项：
    </div>
    <div>
      <a-checkbox-group
          v-if="question.options.length" :disabled="editable"
          v-model="question.answer" style="margin: 10px">
        <div
            v-for="(option, index) in question.options"
            :key="index" style="margin: 5px">
          <a-checkbox :value="optionCode[index]">{{ option }}</a-checkbox>
          <a-button ghost
              v-if="editable" size="small"
              @click="$emit('removeOption', question.id, index)">
            <a-icon type="delete" />
          </a-button>
        </div>
      </a-checkbox-group>
      <div
          v-else style="margin: 10px">
        No option added...
      </div>
    </div>
    <div v-if="editable">
      <a-input
          v-model="question.new_option"
          placeholder="add new option, press enter to commit."
          @keydown.enter="$emit('addOption', question.id, question.new_option)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionCode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    };
  },
  props: [
      'question',
      'editable',
      'has_image'
  ],  // end of props
  methods: {
    onChangeImage(file) {
      this.$emit('updateImage', file);
    }
  }
}
</script>

<style>
label {
  margin: 2px;
}
p {
  margin-bottom: 5px;
  margin-top: 50px;
}
</style>

