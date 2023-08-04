<template>
  <MyDialog title="11aaa" width="500px" :visible="show" :before-close="onClose" @onOpen="onShow" @onClose="onClose">
    <div>123</div>
    <template #footer>
      <el-button @click="onClose">no</el-button>
      <el-button type="primary" @click="onShow">ok</el-button>
    </template>
  </MyDialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    onShow() {
      this.show = false
    },
    onClose() {
      this.show = false
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
