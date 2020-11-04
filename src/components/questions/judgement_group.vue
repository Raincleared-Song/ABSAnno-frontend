<!-- 这是个判断题的页面 -->
<template>
  <div>
    <h2>判断题</h2>

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
  data() {
    return {
      image_url: ''
    };
  },
  props: {
    question: {
      type: Object,
      default() {
        return {
          index: 0,
          type: 'chosen',
          description: "",
          answer: "",
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
  },
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