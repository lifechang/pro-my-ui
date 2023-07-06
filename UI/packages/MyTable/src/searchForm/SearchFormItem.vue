<template>
  <component
    :is="column.search.render || `el-${column.search.el}`"
    v-bind="{
      ...handleSearchProps,
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }"
    v-model="_searchParam[column.search.key || handleProp(column.prop)]"
    :data="[]"
    @input="setInput"
    @change="setChange"
    :options="['cascader', 'select-v2'].includes(column.search.el) ? columnEnum : []"
  >
    <template v-if="column.search.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.search.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <!-- <slot v-else></slot> -->
  </component>
</template>

<script>
import { handleProp } from "../util";
export default {
  props: {
    column: {
      type: Object,
    },
    searchParam: {
      type: Object,
    },
  },
  inject: ["enumMap"],
  computed: {
    _searchParam() {
      return this.searchParam;
    },
    // 判断 fieldNames 设置 label && value && children 的 key 值
    fieldNames() {
      return {
        label: this.column.fieldNames?.label ?? "label",
        value: this.column.fieldNames?.value ?? "value",
        children: this.column.fieldNames?.children ?? "children",
      };
    },
    // 接收 enumMap (el 为 select-v2 需单独处理 enumData)
    columnEnum() {
      let enumData = this.enumMap.get(this.column.prop);
      if (!enumData) {
        return [];
      }
      if (this.column.search?.el === "select-v2" && this.column.fieldNames) {
        enumData = enumData.map((item) => {
          return {
            ...item,
            label: item[this.fieldNames.label],
            value: item[this.fieldNames.value],
          };
        });
      }
      return enumData;
    },
    // 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
    handleSearchProps() {
      const label = this.fieldNames.label;
      const value = this.fieldNames.value;
      const children = this.fieldNames.children;
      const searchEl = this.column.search?.el;
      let searchProps = this.column.search?.props ?? {};
      // if (searchEl === "tree-select") {
      //   searchProps = {
      //     ...searchProps,
      //     props: { ...searchProps.props, label, children },
      //     nodeKey: value,
      //   };
      // }
      if (searchEl === "cascader") {
        searchProps = {
          ...searchProps,
          props: { ...searchProps.props, label, value, children },
        };
      }
      return searchProps;
    },
    // 处理默认 placeholder
    placeholder() {
      const search = this.column.search;
      if (["datetimerange", "daterange", "monthrange"].includes(search?.props?.type) || search?.props?.isRange) {
        return {
          rangeSeparator: "至",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
        };
      }
      const placeholder = search?.props?.placeholder ?? (search?.el?.includes("input") ? "请输入" : "请选择");
      return { placeholder };
    },
    // 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
    clearable() {
      const search = this.column.search;
      return search?.props?.clearable ?? (search?.defaultValue === null || search?.defaultValue === undefined);
    },
  },
  methods: {
    handleProp,
    setInput() {
      this.column.search.props?.onInput && this.column.search.props?.onInput()
      this.$forceUpdate()
    },
    setChange() {
      this.column.search.props?.onChange && this.column.search.props?.onChange()
      this.$forceUpdate()
    }
  },
};
</script>
<style lang="scss" scoped></style>
