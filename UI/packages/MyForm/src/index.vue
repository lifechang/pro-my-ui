<template>
  <el-form ref="formRef" v-bind="$attrs" :model="formData">
    <Row :RowList="formConfig" :RowData="formData"></Row>
    <el-col>
      <el-form-item v-if="formConfig.formBtn">
        <div style="display: inline-block; margin: 0 5px" v-for="btn in formConfig.formBtn" :key="btn.name">
          <el-button :type="btn.type" @click="btn?.callBack(formData)">{{ btn.name }}</el-button>
        </div>
      </el-form-item>
      <slot name="footBtn" v-else></slot>
    </el-col>
  </el-form>
</template>

<script>
import { deepClone } from "./util.js";
import Row from "@UI/MyForm/src/Row.vue";

export default {
  name: "MyForm",
  components: {
    Row,
  },
  props: {
    setFormData: {
      type: Object,
      default: () => ({}),
    },
    setFormConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
      formConfig: {},
    };
  },
  watch: {
    setFormData: {
      handler(val) {
        this.formData = deepClone(val);
      },
      deep: true,
      immediate: true,
    },
    setFormConfig: {
      handler(val) {
        this.formConfig = deepClone(val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
