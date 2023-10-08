<template>
  <component :is="`el-${config.edit.el || 'input'}`" ref="myInput" v-bind="{
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }" @blur="myBlur" :id="`myInput_${config.edit.key || config.prop}`" v-model="_searchParam[config.edit.key || config.prop]">
  </component>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
    },
    searchParam: {
      type: Object,
    },
  },
  computed: {
    _searchParam() {
      return this.searchParam;
    },
    placeholder() {
      const search = this.config?.edit;
      const placeholder = search?.placeholder ?? (!search?.el?.includes("input") ? "请选择" : "请输入");
      return { placeholder };
    },
    clearable() {
      const search = this.config?.edit;
      return search?.clearable ?? (search?.defaultValue === null || search?.defaultValue === undefined);
    },
  },
  methods: {
    myFocus() {
      document.getElementById(`myInput_${this.config.edit.key || this.config.prop}`).focus()
    },
    myBlur() {
      this.$emit('myBlur')
    }
  }
};
</script>

<style lang="scss" scoped></style>
