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
    <div v-if="has_image" style="margin: 20px 10px">
      <div v-if="editable">
        <el-upload
            ref="upload_img"
            list-type="picture-card"
            action="#"
            :limit="1"
            :auto-upload="false"
            :on-change="onChangeImage"
            :on-remove="onRemoveImage">
          <i class="el-icon-plus" />
        </el-upload>
      </div>
      <div v-else>
        <el-image
            :src="question.image" />
      </div>
    </div>

    <!-- 选项区 -->
    <div
        v-if="editable"
        style="margin: 15px 10px">
      编辑选项：
    </div>
    <div>
      <a-radio-group
          v-if="question.options.length"
          :disabled="editable"
          v-model="question.answer"
          style="margin: 10px">
        <div
            v-for="(option, index) in question.options"
            :key="index"
            style="margin: 5px">
          <a-radio :value="optionCode[index]">{{ option }}</a-radio>
          <a-button
              v-if="editable"
              size="small" ghost
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
    <div v-if="editable">
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
      image_url: '',
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
      console.log(this.question.index);
      this.image_url = file.url;
      this.$emit('updateImage', this.question.index, file);
    },
    onRemoveImage(file) {
      console.log('remove');
      this.image_url = '';
    }
  }
}
</script>

<style scoped>

</style>