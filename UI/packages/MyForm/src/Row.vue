<template>
  <div>
    <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
      <el-col v-for="(item) in items" :key="item.value" :span="item.span || 24 / items.length">
        <template v-if="!item.noShow">
          <slot v-if="item.el === 'custom'" :name="item.value" :data="RowData" />
          <el-form-item v-bind="item" v-else-if="item.el === 'towLevel'">
            <Row v-for="(even, evenIndex) in item.multiple ? RowData[item.value].length : 1" :key="evenIndex" :RowList="istowLevel(item, evenIndex)" :EvenIndex="evenIndex" :RowData="RowData">
            </Row>
            <div v-if="item.multiple" @click="addItemList(item, RowData)">新增</div>
          </el-form-item>
          <el-form-item v-bind="item" v-else>
            <SearchFormItem :column="item" :EvenIndex="EvenIndex" :search-param="RowData"></SearchFormItem>
          </el-form-item>
        </template>
      </el-col>
    </el-row>
    <div>1111</div>
  </div>
</template>

<script>
import SearchFormItem from "@UI/MyForm/src/formItem.vue";

export default {
  name: "Row",
  components: {
    SearchFormItem,
  },
  props: {
    RowList: {
      type: Object,
    },
    RowData: {
      type: Object,
    },
    EvenIndex: {
      type: Number
    }
  },
  computed: {
    istowLevel: () => {
      return (val, levelIndex) => {
        val.formList?.flat(2).forEach((v) => {
          v.towLevel = true
          v.parentValue = val.value
          v.levelIndex = levelIndex
        })
        return val
      }
    }
  },
  mounted() {
    // console.log(this.RowData, this.RowList);
  },
  methods: {
    addItemList(item, data) {
      console.log(data);
      data[item.value].push([{}])
    }
  }
};
</script>

<style lang="scss" scoped>
@import "UI/css/form.scss";
</style>
