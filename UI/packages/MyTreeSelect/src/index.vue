<template>
  <el-select
    class="main-select-tree"
    ref="selectTree"
    v-model="selectValue"
    name="option 1"
  >
    <!-- otion 1 -->
    <el-option
      v-for="item in optionData($attrs.options)"
      :label="item.label"
      :value="item.value"
      :key="item.value"
      style="display: none"
    />

    <el-tree
      class="main-select-el-tree"
      ref="selectelTree"
      v-bind="$attrs"
      :data="$attrs.options"
      highlight-current
      @node-click="handleNodeClick"
      :expand-on-click-node="expandOnClickNode"
      default-expand-all
    />
  </el-select>
</template>

<script>
export default {
  name: "MyTreeSelect",
  data() {
    return {
      selectValue: "",
      expandOnClickNode: true,
    };
  },
  methods: {
    /**
     * 树形转平面的迭代方法
     * option 1的el-option需要此方法绑定数据
     */
    optionData(array, result = []) {
      array.forEach((item) => {
        result.push({label: item.label,value: item.id})
        if (item.children && item.children.length !== 0) {
          this.optionData(item.children, result)
        }
      })
      return JSON.parse(JSON.stringify(result))
    },
    // 点击节点的响应
    handleNodeClick(node) {
      this.selectValue = node.label;
      this.$emit("input", node.id);
      this.$refs.selectTree.blur();
    }
  }
};
</script>

<style lang="scss" scoped></style>
