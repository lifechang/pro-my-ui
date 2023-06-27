<template>
  <div class="bg">
    <el-button type="">2222</el-button>
  </div>
</template>

<script>
export default {
  name: "MButton",
  props: {
    size: {
      type: String,
      default: "14px",
    },
    type: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>

<style lang="scss">
@import "UI/css/button.scss";
</style>
