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
        <CustomComponent v-show="isShow(scope, column)" :config="column" :searchParam="scope.row" @myBlur="onShow(scope, column, false)"></CustomComponent>
        <div v-show="!isShow(scope, column)" @click.stop="onShow(scope, column, true)">{{ scope.row[column.edit.key || column.prop] }}</div>
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
        <template v-else-if="$scopedSlots[column.prop]">
          <slot :name="column.prop" :row="scope.row" />
        </template>
        <div v-else>
          {{ renderCellData(column, scope) }}
        </div>
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
import { filterEnum, formatValue, handleRowAccordingToProp } from "./util";
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
        // console.log(column, scope.row[`${column.edit.key || column.prop}Show`]);
        // console.log(column.edit?.lineShow ? true : scope.row[`${column.edit.key || column.prop}Show`]);
        return column.edit?.lineShow ? true : scope.row[`${column.edit.key || column.prop}Show`]
      }
    }
  },
  methods: {
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
      let key = `${column.edit.key || column.prop}Show`
      if (key) {
        this.$set(scope.row, key, type)
        console.log(scope, column, type, 1);
      } else {
        this.$set(scope.row, 'show', type)
        console.log(scope, column, type, 2);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
