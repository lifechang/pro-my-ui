<template>
  <div v-if="columns.length" class="card table-search">
    <el-form ref="formRef" :model="searchParam">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
          <el-form-item :label="`${item.label} :`">
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </GridItem>
        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" @click="search"> 搜索 </el-button>
            <el-button @click="reset"> 重置 </el-button>
            <el-button v-if="showCollapse" type="text" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? "展开" : "合并" }}
              <i :class="collapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
            </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<script>
import SearchFormItem from "./SearchFormItem.vue";
import Grid from "../grid/index.vue";
import GridItem from "../grid/gridItem.vue";

export default {
  name: "searchForm",
  components: {
    SearchFormItem,
    Grid,
    GridItem,
  },
  props: {
    // 搜索配置列
    columns: {
      type: Array,
      default: () => [],
    },
    // 搜索参数
    searchParam: {
      type: Object,
      default: () => ({}),
    },
    searchCol: {
      type: [Number, Object],
    },
    search: {
      type: Function,
    },
    reset: {
      type: Function,
    },
  },
  computed: {
    // 获取响应式断点
    breakPoint() {
      if (this.isMounted) {
        return this.$refs.gridRef?.breakPoint;
      } else {
        return "xl";
      }
    },
    // 判断是否显示 展开/合并 按钮
    showCollapse() {
      let show = false;
      this.columns.reduce((prev, current) => {
        prev +=
          (current.search[this.breakPoint]?.span ?? current.search?.span ?? 1) +
          (current.search[this.breakPoint]?.offset ?? current.search?.offset ?? 0);
        if (typeof this.searchCol !== "number") {
          if (prev >= this.searchCol[this.breakPoint]) {
            show = true;
          }
        } else if (prev >= this.searchCol) {
          show = true;
        }
        return prev;
      }, 0);
      return show;
    },
  },
  data() {
    return {
      // 是否默认折叠搜索项
      collapsed: true,
      // 获取响应式断点
      gridRef: undefined,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    // 获取响应式设置
    getResponsive(item) {
      return {
        span: item.search?.span,
        offset: item.search?.offset ?? 0,
        xs: item.search?.xs,
        sm: item.search?.sm,
        md: item.search?.md,
        lg: item.search?.lg,
        xl: item.search?.xl,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
