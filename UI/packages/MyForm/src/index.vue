<template>
  <el-form ref="formRef" v-bind="{
      ...$attrs,
      'label-width': $attrs['label-width'] ? $attrs['label-width'] : '80px',
    }" :model="formData">
    <Row v-bind="$attrs" :RowList="formConfig" :RowData="formData"></Row>
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
import Row from "./Row.vue";
import _ from "lodash";

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
    setFormConfig: {
      handler(val) {
        this.setDataList();
        this.formConfig = deepClone(val);
        console.log(this.formConfig);
      },
      deep: true,
      immediate: true,
    },
    setFormData: {
      handler(val) {
        this.formData = deepClone(val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setDataList() {
      for (let level of this.setFormConfig.formList) {
        for (let level2 of level) {
          if (level2.el === "towLevel" && !this.setFormData[level2.value]?.length) {
            let newObj = {};
            for (let v of level2.formList) {
              for (let v2 of v) {
                if (v2.value.includes(".")) {
                  _.merge(
                    newObj,
                    v2.value.split(".").reduceRight((obj, next) => ({ [next]: obj }), "")
                  );
                } else {
                  _.merge(newObj, { [v2.value]: "" });
                }
              }
            }
            Object.assign(this.setFormData, { [level2.value]: [newObj] });
          } else if (!this.setFormData[level2.value]) {
            Object.assign(this.setFormData, { [level2.value]: undefined });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
