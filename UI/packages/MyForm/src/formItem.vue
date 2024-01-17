<template>
  <component :is="column?.render ?? `el-${column.el}`" v-bind="{
      ...handleSearchProps,
      ...placeholder,
      searchParam: _searchParam,
      clearable,
    }" v-on="handleSearchProps" v-model.trim="_searchParam" :data="[]" :options="['cascader', 'my-tree-select'].includes(column?.render ?? column.el) ? column.enum : []">
    <template v-if="column.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="column.el === 'select'">
      <component :is="`el-option`" v-for="(col, index) in column.enum" :key="index" :label="col[fieldNames.label]" :value="col[fieldNames.value]"></component>
    </template>
    <template v-if="column.el === 'radio-group'">
      <component :is="`el-radio`" v-for="(col, index) in column.enum" :key="index" :label="col[fieldNames.value]">{{ col[fieldNames.label] }}</component>
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
    EvenIndex: {
      type: Number,
    },
    CurProps: {
      type: String
    }
  },
  data() {
    return {
      data: this.searchParam,
    };
  },
  watch: {
    searchParam(val) {
      this.data = val;
    },
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
      return search?.props?.clearable;
    },
  },
  methods: {
    dealColumn(row, key, parentKey, type, val) {
      // console.log(this.CurProps, '11')
      let value = this.CurProps.split('.').reduce((acc, cur) => acc && acc[cur], row);
      if (type === 'get') {
        return value
      } else {
        if (this.CurProps.includes(".")) {
          let fields = this.CurProps.split('.')
          let result = fields.slice(0, fields.length - 1).join('.');
          let value1 = result.split('.').reduce((acc, cur) => acc && acc[cur], row);
          this.$set(value1, key, val)
        } else {
          this.$set(row, key, val)
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped></style>
