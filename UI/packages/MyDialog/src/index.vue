<template>
  <el-dialog v-bind="{ 'close-on-click-modal': false, 'destroy-on-close': true, ...$attrs }" v-on="$listeners">
    <slot></slot>
    <span slot="footer" v-if="$attrs.noFooter !== ''">
      <slot v-if="Object.keys($slots).includes('footer')" name="footer"></slot>
      <div v-else>
        <el-button @click="$listeners?.onClose()">取 消</el-button>
        <el-button type="primary" @click="$listeners?.onOpen()">确 定</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "MyDialog",
  props: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
