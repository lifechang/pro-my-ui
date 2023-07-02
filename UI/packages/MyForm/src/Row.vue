<template>
  <div class="row-container">
    <div>
      <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
        <el-col v-for="(item) in items" :key="item.value" :span="item.span || 24 / items.length">
          <template v-if="!item.noShow">
            <slot v-if="item.el === 'custom'" :name="item.value" :data="RowData" />
            <el-form-item v-bind="item" v-else-if="item.el === 'towLevel'">
              <Row v-for="(even, evenIndex) in item.multiple ? RowData[item.value].length : 1" :key="evenIndex" :RowList="istowLevel(item)" :EvenIndex="evenIndex" :RowData="RowData">
              </Row>
              <i v-if="item.multiple" :style="{marginLeft: $attrs['label-width'] ? $attrs['label-width'] : '80px'}" @click="addItemList(item, RowData)" class="el-icon-plus myIcon add"></i>
            </el-form-item>
            <el-form-item v-bind="item" v-else>
              <SearchFormItem :column="item" :EvenIndex="EvenIndex" :search-param="RowData"></SearchFormItem>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </div>
    <div class="del-box">
      <i class="el-icon-minus myIcon del" v-if="RowList.multiple && RowData[this.RowList.value].length > 1" @click="delItemList(RowData)"></i>
    </div>
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
    addItemList(item, data) {
      this.$set(data[item.value], data[item.value].length, {})
    },
    delItemList(data) {
      data[this.RowList.value].splice(this.EvenIndex, 1)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "UI/css/form.scss";
</style>
