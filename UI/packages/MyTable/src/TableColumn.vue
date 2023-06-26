<template>
  <el-table-column
    v-bind="column"
    :align="column.align || 'center'"
    :show-overflow-tooltip="
      column.showOverflowTooltip || column.prop !== 'operation'
    "
  >
    <template #default="scope">
      <div v-if="column.render">
        <expandDom
          :render="column.render"
          :index="scope.$index"
          :column="column"
          :row="scope.row"
        ></expandDom>
      </div>
      <template v-else-if="$parent.$parent.$scopedSlots[column.prop]">
        <slot :name="column.prop" :row="scope.row" />
      </template>
      <div v-else>
        {{ renderCellData(column, scope) }}
      </div>
    </template>
    <template #header="scope">
      <template v-if="column.headerRender">
        <expandDom
          :render="column.render"
          :index="scope.$index"
          :column="column"
          :row="scope.row"
        ></expandDom>
      </template>
      <template
        v-else-if="$parent.$parent.$scopedSlots[`${column.prop}Header`]"
      >
        <slot :name="`${column.prop}Header`" :row="column" />
      </template>
      <template v-else>
        {{ column.label }}
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { filterEnum, formatValue, handleRowAccordingToProp } from "./util";

export default {
  components: {
    /** render函数渲染组件* */
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };
        if (ctx.props.column) {
          params.column = ctx.props.column;
        }
        return ctx.props.render(h, params);
      },
    },
  },
  inject: ['enumMap'],
  props: {
    column: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // 渲染表格数据
    renderCellData(item, scope) {
      return this.enumMap.get(item.prop) && item.isFilterEnum
        ? filterEnum(handleRowAccordingToProp(scope.row, item.prop), this.enumMap.get(item.prop), item.fieldNames)
        : formatValue(handleRowAccordingToProp(scope.row, item.prop));
    }
  }
}
</script>

<style lang="scss" scoped>
</style>