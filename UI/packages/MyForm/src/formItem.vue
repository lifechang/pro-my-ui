<template>
  <component
    :is="column.render || `el-${column.el}`"
    v-bind="{
      ...handleSearchProps,
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }"
    v-model.trim="_searchParam[column.key || column.value]"
    :data="[]"
    :options="['cascader', 'select-v2'].includes(column.el) ? [] : []"
  >
    <template v-if="column.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in column.enum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script>
export default {
  props: {
    column: {
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
      let enumData = this.enumMap.get(this.column.value);
      if (!enumData) {
        return [];
      }
      if (this.column?.el === "select-v2" && this.column.fieldNames) {
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
      const searchEl = this.column?.el;
      let searchProps = this.column?.props ?? {};
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
      const search = this.column;
      if (
        ["datetimerange", "daterange", "monthrange"].includes(
          search?.props?.type
        ) ||
        search?.props?.isRange
      ) {
        return {
          rangeSeparator: "至",
          startPlaceholder: "开始时间",
          endPlaceholder: "结束时间",
        };
      }
      const placeholder =
        search?.props?.placeholder ??
        (search?.el?.includes("input") ? "请输入" : "请选择");
      return { placeholder };
    },
    // 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
    clearable() {
      const search = this.column;
      return (
        search?.props?.clearable ??
        (search?.defaultValue === null || search?.defaultValue === undefined)
      );
    },
  },
  methods: {},
};
</script>
