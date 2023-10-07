<template>
  <div class="table-box">
    <!-- 查询表单 card -->
    <SearchForm
      :search="search"
      :reset="reset"
      :columns="searchColumns"
      :search-param="searchParam"
      :search-col="searchCol"
      v-show="isShowSearch"
    >
      <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
        <slot :name="slot" :row="scope.row" :data="scope.searchParam"></slot>
      </template>
    </SearchForm>
    <!-- 表格内容 card -->
    <div
      :class="{
        'my-card':
          $attrs['no-card'] === '' || $attrs['noCard'] === '' ? '' : 'my-card',
      }"
      class="table-main no-card"
    >
      <!-- 表格头部 操作按钮 -->
      <div class="table-header">
        <div class="header-button-lf">
          <slot
            name="tableHeader"
            :selectedListIds="selectedListIds"
            :selectedList="selectedList"
          />
        </div>
        <div v-if="toolButton" class="header-button-ri">
          <slot name="toolButton">
            <el-button
              v-if="showToolButton('refresh')"
              icon="el-icon-refresh"
              circle
              @click="getTableList"
            />
            <el-button
              v-if="showToolButton('search') && searchColumns?.length"
              icon="el-icon-search"
              circle
              @click="isShowSearch = !isShowSearch"
            />
          </slot>
        </div>
      </div>
      <!-- 表格主体 -->
        <el-table
          ref="tableRef"
          v-bind="$attrs"
          :data="processTableData"
          :border="border"
          :row-key="rowKey"
          @selection-change="selectionChange"
        >
          <!-- 默认插槽 -->
          <slot></slot>
          <template v-for="(item, index) in columns">
            <!-- selection || index || expand -->
            <el-table-column
              v-bind="item"
              :align="item.align || 'center'"
              :key="`${index}`"
              :reserve-selection="item.type == 'selection'"
              v-if="
                item.type &&
                ['selection', 'index', 'expand'].includes(item.type)
              "
            >
              <template #default="scope" v-if="item.type == 'expand'">
                <component :is="item.render" v-bind="scope" v-if="item.render">
                </component>
                <slot :name="item.type" v-bind="scope" v-else></slot>
              </template>
            </el-table-column>

            <!-- other -->
            <TableColumn
              v-if="!item.type && item.prop && item.isShow"
              :key="`${index}`"
              :column="item"
            >
              <template
                v-for="slot in Object.keys($scopedSlots)"
                #[slot]="scope"
              >
                <slot :name="slot" :row="scope.row"></slot>
              </template>
            </TableColumn>
          </template>
          <!-- 插入表格最后一行之后的插槽 -->
          <template #append>
            <slot name="append"> </slot>
          </template>
          <!-- 表格无数据情况 -->
          <template #empty>
            <div class="table-empty">
              <slot name="empty">
                <el-empty :image-size="170"></el-empty>
              </slot>
            </div>
          </template>
        </el-table>
      <!-- 分页组件 -->
      <slot name="pagination">
        <el-pagination
          v-if="pagination"
          :background="true"
          :current-page="pageable.pageNum"
          :page-size="pageable.pageSize"
          :page-sizes="[10, 25, 50, 100]"
          :total="pageable.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
import { handleProp } from "./util";

import SearchForm from "./searchForm/index.vue";
import TableColumn from "./TableColumn.vue";
export default {
  name: "MyTable",
  components: { TableColumn, SearchForm },
  props: {
    // 请求表格数据的 api ==> 非必传
    requestApi: {
      type: Function,
    },
    data: {
      type: Array,
    },
    // 是否自动执行请求 api ==> 非必传（默认为true）
    requestAuto: {
      type: Boolean,
      default: true,
    },
    // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    dataCallback: {
      type: Function,
    },
    // 列配置项  ==> 必传
    columns: {
      type: Array,
      default: () => [],
    },
    // 初始化请求参数 ==> 非必传（默认为{}）
    initParam: {
      type: Object,
      default: () => ({}),
    },
    // 是否需要分页组件 ==> 非必传（默认为true）
    pagination: {
      type: Boolean,
      default: true,
    },
    // 是否带有纵向边框 ==> 非必传（默认为true）
    border: {
      type: Boolean,
      default: true,
    },
    // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    rowKey: {
      type: String,
      default: "id",
    },
    // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
    searchCol: {
      type: [Number, Object],
      default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
    },
    // 是否显示表格功能按钮 ==> 非必传（默认为true）
    toolButton: {
      type: Boolean,
      default: true,
    },
    // 表格 api 请求错误监听 ==> 非必传
    requestError: {
      type: Function,
    }
  },
  computed: {
    // 分页查询参数(只包括分页和表格字段排序,其他排序方式可自行配置)
    pageParam: {
      get() {
        return {
          pageNum: this.pageable.pageNum,
          pageSize: this.pageable.pageSize,
        };
      },
      set(newVal) {
        console.log("我是分页更新之后的值", newVal);
      },
    },
    // 当前选中的所有 ids 数组
    selectedListIds() {
      let ids = [];
      this.selectedList?.forEach((item) => ids.push(item[this.rowKey]));
      return ids;
    },
    processTableData() {
      if (!this.data) {
        return this.tableData;
      }
      return this.data.slice(
        (this.pageable.pageNum - 1) * this.pageable.pageSize,
        this.pageable.pageSize * this.pageable.pageNum
      );
    },
    flatColumns() {
      return this.flatColumnsFunc(this.columns);
    },
  },
  watch: {
    // 监听页面 initParam 改化，重新获取表格数据
    initParam: {
      handler() {
        this.getTableList();
      },
      deep: true,
    },
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 分页数据
      pageable: {
        // 当前页数
        pageNum: 1,
        // 每页显示条数
        pageSize: 10,
        // 总条数
        total: 0,
      },
      // 查询参数(只包括查询)
      searchParam: {},
      // 初始化默认的查询参数
      searchInitParam: {},
      // 总参数(包含分页和查询参数)
      // flatColumns: [],
      // 总参数(包含分页和查询参数)
      totalParam: {},
      // 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
      map: new Map(),
      selectedList: [],
      // 是否显示搜索模块
      isShowSearch: true,
      // 过滤需要搜索的配置项
      searchColumns: [],
    };
  },
  provide() {
    return {
      enumMap: this.map,
    };
  },
  created() {
    // this.flatColumns = this.flatColumnsFunc(this.columns);
    this.setColums();
  },
  mounted() {
    this.requestAuto && this.getTableList();
    this.data && (this.pageable.total = this.data.length);
  },
  methods: {
    // 扁平化 columns
    flatColumnsFunc(columns = [], flatArr = []) {
      columns.forEach(async (col) => {
        if (col._children?.length) {
          flatArr.push(...this.flatColumnsFunc(col._children));
        }
        flatArr.push(col);

        // 给每一项 column 添加 isShow && isFilterEnum 默认属性
        col.isShow = col.isShow ?? true;
        col.isFilterEnum = col.isFilterEnum ?? true;
        // 设置 enumMap
        await this.setEnumMap(col);
      });
      return flatArr.filter((item) => !item._children?.length);
    },
    setColums() {
      // 过滤需要搜索的配置项 排序搜索表单项
      this.searchColumns = this.flatColumns
        .filter((item) => item.search?.el || item.search?.render)
        .sort((a, b) => a.search.order - b.search.order);

      // 设置搜索表单排序默认值 && 设置搜索表单项的默认值
      this.searchColumns.forEach((column, index) => {
        column.search.order = column.search?.order ?? index;
        if (
          column.search?.defaultValue !== undefined &&
          column.search?.defaultValue !== null
        ) {
          this.searchInitParam[column.search.key ?? handleProp(column.prop)] =
            column.search?.defaultValue;
          this.searchParam[column.search.key ?? handleProp(column.prop)] =
            column.search?.defaultValue;
        }
      });
    },
    // 更新分页信息
    updatePageable(resPageable) {
      Object.assign(this.pageable, resPageable);
    },
    async getTableList() {
      if (!this.requestApi) {
        return
      }
      try {
        // 先把初始化参数和分页参数放到总参数里面
        Object.assign(
          this.totalParam,
          this.initParam,
          this.pagination ? this.pageParam : {}
        );
        let { data } = await this.requestApi({
          ...this.searchInitParam,
          ...this.totalParam,
        });
        if (this.dataCallback) {
          data = this.dataCallback(data);
        }
        this.tableData = this.pagination ? data.list : data;
        // 解构后台返回的分页数据 (如果有分页更新分页信息)
        const { pageNum, pageSize, total } = data;
        this.pagination &&
          this.updatePageable({
            pageNum: pageNum || this.pageable.pageNum,
            pageSize: pageSize || this.pageable.pageSize,
            total,
          });
      } catch (error) {
        this.requestError && this.requestError(error)
      }
    },
    /**
     * @description 每页条数改变
     * @param {Number} val 当前条数
     * @return void
     * */
    handleSizeChange(val) {
      this.pageable.pageNum = 1;
      this.pageable.pageSize = val;
      this.getTableList();
    },
    /**
     * @description 当前页改变
     * @param {Number} val 当前页
     * @return void
     * */
    handleCurrentChange(val) {
      this.pageable.pageNum = val;
      this.getTableList();
    },
    async setEnumMap({ prop, enum: enumValue }) {
      // if (!col.enum) {
      //   return;
      // }
      // // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
      // if (typeof col.enum !== "function") {
      //   return this.map.set(col.prop, col.enum);
      // }
      // const { data } = await col.enum();
      // this.map.set(col.prop, data);

      if (!enumValue) {
        return;
      }

      // 如果当前 enumMap 存在相同的值 return
      if (
        this.map.has(prop) &&
        (typeof enumValue === "function" || this.map.get(prop) === enumValue)
      ) {
        return;
      }

      // 当前 enum 为静态数据，则直接存储到 enumMap
      if (typeof enumValue !== "function") {
        return this.map.set(prop, enumValue);
      }

      // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
      const { data } = await enumValue();
      this.map.set(prop, data);
    },
    // 多选操作
    selectionChange(rowArr) {
      this.selectedList = rowArr;
    },
    search() {
      this.pageable.pageNum = 1;
      this.updatedTotalParam();
      this.getTableList();
      this.$emit("search");
    },
    reset() {
      this.pageable.pageNum = 1;
      // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
      this.searchParam = { ...this.searchInitParam };
      this.updatedTotalParam();
      this.getTableList();
      this.$emit("reset");
    },
    /**
     * @description 更新查询参数
     * @return void
     * */
    updatedTotalParam() {
      this.totalParam = {};
      // 处理查询参数，可以给查询参数加自定义前缀操作
      let nowSearchParam = {};
      // 防止手动清空输入框携带参数（这里可以自定义查询参数前缀）
      for (let key in this.searchParam) {
        // * 某些情况下参数为 false/0 也应该携带参数
        if (
          this.searchParam[key] ||
          this.searchParam[key] === false ||
          this.searchParam[key] === 0
        ) {
          nowSearchParam[key] = this.searchParam[key];
        }
      }
      Object.assign(
        this.totalParam,
        nowSearchParam,
        this.isPageable ? this.pageParam : {}
      );
    },
    showToolButton(key) {
      return Array.isArray(this.toolButton)
        ? this.toolButton.includes(key)
        : this.toolButton;
    },
  },
};
</script>

<style lang="scss">
@import "UI/css/table.scss";
</style>
