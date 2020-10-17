<template>
  <router-view
      :form="mission_info"
      :questions="questions"
      @on-submit-info="$router.push('/mission/edit')"
  />
</template>

<script>
export default {
  name: "mission_field",
  props: [
    "username",
    "id"
  ],
  data() {
    return {
      mission_info: {
        name: '',
        type: '',
        min: 10,
        ddl: undefined,
        tags: []
      },
      questions: []
    };
  }
}
</script>

<style scoped>
</style>