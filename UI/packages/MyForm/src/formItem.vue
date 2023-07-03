<template>
  <component
    :is="column.render || `el-${column.el}`"
    v-bind="{
      ...handleSearchProps,
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }"
    v-model.trim="_searchParam"
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
import _ from "lodash";
import { handleProp } from "./util";
export default {
  props: {
    column: {
      type: Object,
    },
    searchParam: {
      type: Object,
    },
    EvenIndex: {
      type: Number,
    },
  },
  data() {
    return {
      data: this.searchParam,
    };
  },
  computed: {
    _searchParam: {
      get() {
        return this.dealColumn(this.data, this.column.value, this.column.parentValue, "get");
      },
      set(val) {
        this.dealColumn(this.data, this.column.value, this.column.parentValue, "set", val);
      },
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
      const search = this.column;
      return search?.props?.clearable ?? (search?.defaultValue === null || search?.defaultValue === undefined);
    },
  },
  methods: {
    handleProp,
    dealColumn(row, key, parentKey, type, val) {
      // value数据参数不包含(.)的
      if (!key.includes(".")) {
        // 二级数据set, get
        if (parentKey) {
          if (type === "get") {
            return row[parentKey][this.EvenIndex][key];
          } else {
            this.$set(row[parentKey][this.EvenIndex], key, val);
          }
        }
        // 一级数据set, get
        if (!parentKey) {
          if (type === "get") {
            return row[key];
          } else {
            this.$set(row, key, val);
          }
        }
      }
      // value数据参数包含(.)的
      if (key.includes(".")) {
        // 二级数据get, set
        if (type === "get") {
          let res = key.split(".").reduce((pre, cur) => {
            pre = pre?.[cur];
            return pre;
          }, row[parentKey][this.EvenIndex]);
          return res;
        } else {
          let newObject = key.split(".").reduceRight((obj, next) => ({ [next]: obj }), val);
          _.merge(row[parentKey][this.EvenIndex], newObject);
        }
      }
    },
  },
};
</script>
