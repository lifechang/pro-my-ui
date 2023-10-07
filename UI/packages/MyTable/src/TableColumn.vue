<template>
  <el-table-column
    v-bind="column"
    :align="column.align || 'center'"
    :show-overflow-tooltip="
      column.showOverflowTooltip || column.prop !== 'operation'
    "
  >
    <template v-if="column._children">
      <TableColumn
        v-for="(even, evenIndex) in column._children"
        :key="evenIndex"
        :column="even"
      >
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <slot :name="slot" :row="scope.row"></slot>
        </template>
      </TableColumn>
    </template>

    <template slot-scope="scope">
      <template v-if="column.edit">
        <CustomComponent v-if="isShow(scope, column)" ref="CustomComponent" :config="column" :searchParam="scope.row" @myBlur="onShow(scope, column, false)"></CustomComponent>
        <div class="edInp" @click.stop="onShow(scope, column, true)">
          <el-input v-show="!isShow(scope, column)" v-model="scope.row[column.edit.key || column.prop]" placeholder="请输入"></el-input>
        </div>
      </template>
      <template v-else>
        <div v-if="column.render">
          <DxpandDom
            :render="column.render"
            :index="scope.$index"
            :column="column"
            :row="scope.row"
          ></DxpandDom>
        </div>
        <template v-else-if="$scopedSlots[handleProp(column.prop)]">
          <slot :name="handleProp(column.prop)" :row="scope.row" />
        </template>
        <template v-else>
          {{ renderCellData(column, scope) }}
        </template>
      </template>
    </template>
    <template slot="header" slot-scope="scope">
      <template v-if="column.headerRender">
        <DxpandDom
          :render="column.render"
          :index="scope.$index"
          :column="column"
          :row="scope.row"
        ></DxpandDom>
      </template>
      <template v-else-if="$scopedSlots[`${column.prop}Header`]">
        <slot :name="`${column.prop}Header`" :row="column" />
      </template>
      <template v-else>
        {{ column.label }}
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from "./util";
import CustomComponent from './component.vue';

export default {
  name: "TableColumn",
  components: {
    /** render函数渲染组件* */
    DxpandDom: {
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
    CustomComponent,
  },
  inject: ["enumMap"],
  props: {
    column: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isShow: () => {
      return (scope, column) => {
        return column.edit?.lineShow ? scope.row.show : scope.row[`${column.edit.key || column.prop}Show`]
      }
    },
  },
  methods: {
    handleProp,
    // 渲染表格数据
    renderCellData(item, scope) {
      return this.enumMap.get(item.prop) && item.isFilterEnum
        ? filterEnum(
            handleRowAccordingToProp(scope.row, item.prop),
            this.enumMap.get(item.prop),
            item.fieldNames
          )
        : formatValue(handleRowAccordingToProp(scope.row, item.prop));
    },
    onShow(scope, column, type) {
      if (column.edit.lineShow) {
          this.$set(scope.row, 'show', type)
      } else {
          this.$set(scope.row, `${column.edit.key || column.prop}Show`, type)
      }
      if (type) {
          this.$nextTick(() => {
            this.$refs.CustomComponent.myFocus()
          })
      }
    }
  },
};
</script>

<style lang="scss" scope>
.edInp {
  .el-input__inner {
      border: 0;
      background: transparent;
  }
}
@import "UI/css/table.scss";
</style>
