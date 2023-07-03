<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
    collapsedRows: {
      type: Number,
      default: 1,
    },
    gap: {
      type: [Number, Array],
      default: 0,
    },
  },
  computed: {
    // 注入 cols
    gridCols() {
      if (typeof this.cols === "object") {
        return this.cols[this.breakPoint] ?? this.cols;
      }
      return this.cols;
    },
    // 设置间距
    gridGap() {
      if (typeof this.gap === "number") {
        return `${this.gap}px`;
      }
      if (Array.isArray(this.gap)) {
        return `${this.gap[1]}px ${this.gap[0]}px`;
      }
      return "unset";
    },
    // 设置 style
    style() {
      return {
        display: "grid",
        gridGap: this.gridGap,
        gridTemplateColumns: `repeat(${this.gridCols}, minmax(0, 1fr))`,
      };
    },
  },
  watch: {
    // 断点变化时 执行 findIndex
    breakPoint() {
      if (this.collapsed) {
        this.findIndex();
      }
    },
    // 监听 collapsed
    collapsed(val) {
      if (val) {
        return this.findIndex();
      }
      this.hiddenIndex = -1;
    },
  },
  data() {
    return {
      breakPoint: "xl",
      hiddenIndex: -1,
    };
  },
  provide() {
    return {
      // 注入响应式断点
      breakPoint: this.breakPoint,
      // 注入 gap 间距
      gap: Array.isArray(this.gap) ? this.gap[0] : this.gap,
      // 注入要开始折叠的 index
      shouldHiddenIndex: () => this.hiddenIndex,
      // 注入 cols
      cols: () => this.gridCols,
    };
  },
  beforeMount() {
    this.collapsed && this.findIndex();
  },
  methods: {
    // 寻找需要开始折叠的字段 index
    findIndex() {
      let fields = [];
      let suffix = null;
      this.$slots.default.forEach((slot) => {
        // suffix
        if (slot.key !== undefined && !slot.componentOptions?.propsData?.suffix) {
          fields.push(slot);
        }
        // slot children
        if (slot.key === undefined && slot.componentOptions?.propsData?.suffix === "") {
          suffix = slot;
        }
      });

      // 计算 suffix 所占用的列
      let suffixCols = 0;
      if (suffix) {
        suffixCols =
          (suffix.componentOptions?.propsData[this.breakPoint]?.span ?? suffix.componentOptions?.propsData?.span ?? 1) +
          (suffix.componentOptions?.propsData[this.breakPoint]?.offset ??
            suffix.componentOptions?.propsData?.offset ??
            0);
      }
      try {
        let find = false;
        fields.reduce((prev = 0, current, index) => {
          prev +=
            (current.componentOptions?.propsData[this.breakPoint]?.span ??
              current.componentOptions?.propsData?.span ??
              1) +
            (current.componentOptions?.propsData[this.breakPoint]?.offset ??
              current.componentOptions?.propsData?.offset ??
              0);
          if (Number(prev) > this.collapsedRows * this.gridCols - suffixCols) {
            this.hiddenIndex = index;
            find = true;
            throw "find it";
          }
          return prev;
        }, 0);
        if (!find) {
          this.hiddenIndex = -1;
        }
      } catch (e) {
        // console.warn(e, 1);
      }
    },
    // 监听屏幕变化
    resize(e) {
      let width = e.target.innerWidth;
      switch (Boolean(width)) {
        case width < 768:
          this.breakPoint = "xs";
          break;
        case width >= 768 && width < 992:
          this.breakPoint = "sm";
          break;
        case width >= 992 && width < 1200:
          this.breakPoint = "md";
          break;
        case width >= 1200 && width < 1920:
          this.breakPoint = "lg";
          break;
        case width >= 1920:
          this.breakPoint = "xl";
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.resize({ target: { innerWidth: window.innerWidth } });
    window.addEventListener("resize", this.resize);
  },
  activated() {
    this.resize({ target: { innerWidth: window.innerWidth } });
    window.addEventListener("resize", this.resize);
  },
  unmounted() {
    window.removeEventListener("resize", this.resize);
  },
  deactivated() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>
<style lang="scss" scoped></style>
