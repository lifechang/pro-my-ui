<template>
  <div>
    <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
      <el-col v-for="(item) in items" :key="item.value" :span="item.span || 24 / items.length">
        <template v-if="!item.noShow">
          <slot v-if="item.el === 'custom'" :name="item.value" :data="RowData" />
          <el-form-item v-bind="item" v-else-if="item.el === 'towLevel'">
            <Row :RowList="istowLevel(item)" :RowData="RowData"> </Row>
          </el-form-item>
          <el-form-item v-bind="item" v-else>
            <SearchFormItem :column="item" :even="index" :search-param="RowData"></SearchFormItem>
          </el-form-item>
        </template>
      </el-col>
    </el-row>
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
  },
  computed: {
    istowLevel: () => {
      return (val) => {
        val.formList?.flat(2).forEach((v) => {
          v.towLevel = true
          v.parentValue = val.value
        })
        return val
      }
    }
  },
  mounted() {

    // console.log(this.RowData, this.RowList);
  },
  methods: {
    // istowLevel(val) {
    //   console.log(val.formList.flat());
    //   val.formList?.flat(2).forEach((v) => {
    //     v.towLevel = true
    //   })
    //   return val
    // }
  }
};
</script>

<style lang="scss" scoped></style>
