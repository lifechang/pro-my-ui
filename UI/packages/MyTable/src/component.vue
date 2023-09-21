<template>
  <component :is="`el-${config.edit.el || 'input'}`"  v-bind="{
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }" @blur="myBlur" v-model="_searchParam[config.edit.key || config.prop]">
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
    blur: {
      type: Function
    }
  },
  computed: {
    _searchParam() {
      return this.searchParam;
    },
    placeholder() {
      const search = this.config?.edit;
      const placeholder = search?.placeholder ?? (search?.el?.includes("input") ? "请输入" : "请选择");
      return { placeholder };
    },
    clearable() {
      const search = this.config?.edit;
      return search?.clearable ?? (search?.defaultValue === null || search?.defaultValue === undefined);
    },
  },
  methods: {
    myBlur() {
      this.$emit('myBlur')
    }
  }
};
</script>

<style lang="scss" scoped></style>
