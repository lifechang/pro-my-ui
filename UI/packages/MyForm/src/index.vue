<template>
  <el-form
    ref="formRef"
    v-bind="{
      ...$attrs,
      'label-width': $attrs['label-width'] ? $attrs['label-width'] : '95px',
    }"
    :model="formData"
  >
    <Row v-bind="$attrs" :RowList="formConfig" :RowData="formData">
      <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
        <slot :name="slot" :scope="scope"></slot>
      </template>
    </Row>
    <el-col style="margin-top: 10px">
      <el-form-item v-if="formConfig.formBtn">
        <div style="display: inline-block; margin: 0 5px" v-for="btn in formConfig.formBtn" :key="btn.name">
          <el-button :type="btn.type" @click="btn?.callBack(formData)">{{ btn.name }}</el-button>
        </div>
      </el-form-item>
      <slot name="footBtn" :data="formData" v-else></slot>
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
      refForm: this.$refs.formRef,
      // formData: {},
      formConfig: {},
    };
  },
  computed: {
    formData() {
      return this.setFormData
    }
  },
  watch: {
    // formData() {
    //   this.setDataList();
    // },
    setFormConfig: {
      handler(val) {
        this.setDataList();
        this.formConfig = deepClone(val);
      },
      deep: true,
      immediate: true,
    },
    // setFormData: {
    //   handler(val) {
    //     console.log(val)
    //     this.formData = deepClone(val);
    //     console.log(this.formData)
    //   },
    //   deep: true,
    //   immediate: true,
    // },
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
                    v2.value.split(".").reduceRight((obj, next) => ({ [next]: obj }), undefined)
                  );
                } else {
                  _.merge(newObj, { [v2.value]: undefined });
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
    RefForm() {
      return this.$refs.formRef;
    },
    validate() {
      return this.$refs.formRef.validate();
    },
    resetFields() {
      return this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped></style>
