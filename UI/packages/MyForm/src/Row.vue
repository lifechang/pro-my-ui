<template>
  <div>
    <el-row v-for="(items, index) in formConfig.formList" :key="index" :gutter="formConfig.gutter">
      <el-col v-for="item in items" :key="item.key" :span="item.span || 24 / items.length">
        <template v-if="!item.noShow">
          <slot v-if="item.el === 'custom'" :name="item.value" :data="formData[item.value]" />
          <el-form-item v-bind="item" v-else>
            <SearchFormItem :column="item" :search-param="formData"></SearchFormItem>
          </el-form-item>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
