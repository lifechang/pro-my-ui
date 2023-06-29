<template>
  <el-form ref="formRef" v-bind="$attrs" :model="formData">
    <el-row
      v-for="(items, index) in formConfig.formList"
      :key="index"
      :gutter="formConfig.gutter"
    >
      <el-col
        v-for="item in items"
        :key="item.key"
        :span="item.span || 24 / items.length"
      >
        <template v-if="!item.noShow">
          <slot
            v-if="item.el === 'custom'"
            :name="item.value"
            :data="formData[item.value]"
          />

          <el-form-item v-bind="item" v-else>
            <SearchFormItem
              :column="item"
              :search-param="formData"
            ></SearchFormItem>
          </el-form-item>
        </template>
      </el-col>
    </el-row>
    <el-col>
      <slot name="footBtn">
        <el-form-item v-if="formConfig.formBtn">
          <div v-for="btn in formConfig.formBtn" :key="btn.name">
            <el-button :type="btn.type" @click="btn?.callBack(formData)">{{
              btn.name
            }}</el-button>
          </div>
        </el-form-item>
      </slot>
    </el-col>
  </el-form>
</template>

<script>
import { deepClone } from "./util.js";
import SearchFormItem from "@UI/MyForm/src/formItem.vue";

export default {
  name: "MyForm",
  components: {
    SearchFormItem,
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
  methods: {
    onSubmit() {
      console.log(this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "UI/css/form.scss";
</style>
