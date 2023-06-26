<template>
  <div v-show="isShow" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    span: {
      type: Number,
      default: 1,
    },
    suffix: {
      type: Boolean,
      default: false,
    },
    xs: {
      type: Object,
      default: undefined,
    },
    sm: {
      type: Object,
      default: undefined,
    },
    md: {
      type: Object,
      default: undefined,
    },
    lg: {
      type: Object,
      default: undefined,
    },
    xl: {
      type: Object,
      default: undefined,
    },
  },
  inject: ["breakPoint", "shouldHiddenIndex", "gap", "cols"],
  watch: {
    breakPoint: {
      handler() {
        if (this.$attrs.index || false) {
          this.isShow = !(
            this.listen !== -1 && parseInt(this.$attrs.index) >= Number(this.listen)
          );
        }
      },
      immediate: true
    },
    listenHiddenIndex: {
      handler(n) {
        if (this.$attrs.index || false) {
          this.isShow = !(
            n !== -1 && parseInt(this.$attrs.index) >= Number(n)
          );
        }
      },
      immediate: true,
    },
  },
  computed: {
    listenHiddenIndex() {
      return this.shouldHiddenIndex()
    },
    listenCols() {
      return this.cols()
    },
    style() {
      let span = this[this.breakPoint]?.span ?? this.span;
      let offset = this[this.breakPoint]?.offset ?? this.offset;
      if (this.suffix) {
        return {
          gridColumnStart: this.listenCols - span - offset + 1,
          gridColumnEnd: `span ${span + offset}`,
          marginLeft:
            offset !== 0
              ? `calc(((100% + ${this.gap}px) / ${span + offset}) * ${offset})`
              : "unset",
        };
      } else {
        return {
          gridColumn: `span ${span + offset > this.listenCols ? this.listenCols : span + offset
            }/span ${span + offset > this.listenCols ? this.listenCols : span + offset}`,
          marginLeft:
            offset !== 0
              ? `calc(((100% + ${this.gap}px) / ${span + offset}) * ${offset})`
              : "unset",
        };
      }
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
};
</script>