<template>
  <div class="row-container">
    <div class="row-box">
      <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
        <el-col
          v-bind="RowList.cols"
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          :span="item.span || 24 / items?.length"
        >
          <template v-if="!item.noShow">
            <slot
              v-if="item.el === 'custom' && !item.label"
              :name="item.parentValue ? `${[item.parentValue]}.${[item.value]}` : item.value"
              :data="RowData"
              :item="item"
            />
            <el-form-item v-bind="{ ...item, ...item.props }" v-else-if="item.el === 'towLevel'" :prop="item.value">
              <Row
                v-for="(even, evenIndex) in item.multiple ? RowData[item.value]?.length : 1"
                :key="evenIndex"
                :RowList="isTowLevel(item)"
                :EvenIndex="evenIndex"
                :RowData="RowData"
              >
                <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
                  <slot :name="slot" :data="scope" :index="evenIndex" :parentItem="isTowLevel(item)"></slot>
                </template>
              </Row>
              <i
                v-if="item.multiple"
                :style="{ marginLeft: $attrs['label-width'] ? $attrs['label-width'] : '80px' }"
                @click="addItemList(item, RowData)"
                class="el-icon-plus myIcon add"
              ></i>
            </el-form-item>
            <el-form-item
              v-bind="{ ...item, ...item.props }"
              :prop="item.parentValue ? `${[item.parentValue]}.${[EvenIndex]}.${[item.value]}` : item.value"
              v-else
            >
              <slot
                v-if="item.el === 'custom' && item.label"
                :name="item.parentValue ? `${[item.parentValue]}.${[item.value]}` : item.value"
                :data="RowData"
                :item="item"
              />
              <SearchFormItem
                v-else
                :column="handle(item)"
                :EvenIndex="EvenIndex"
                :search-param="RowData"
              ></SearchFormItem>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </div>
    <div class="del-box">
      <i
        class="el-icon-minus myIcon del"
        v-if="RowList.multiple && RowData[this.RowList.value]?.length > 1"
        @click="delItemList(RowData)"
      ></i>
    </div>
  </div>
</template>

<script>
import SearchFormItem from "./formItem.vue";
import Vue from "vue";
import _ from "lodash";

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
      type: Number,
    },
  },
  computed: {
    isTowLevel: () => {
      return (val) => {
        val.formList?.flat(2).forEach((v) => {
          v.towLevel = true;
          v.parentValue = val.value;
        });
        return val;
      };
    },
  },
  mounted() {
    // console.log(this.RowList);
  },
  methods: {
    addItemList(item, data) {
      // 获取新增数据结构
      let newObj = {};
      for (let v of item.formList) {
        for (let v2 of v) {
          if (v2.value.includes(".")) {
            _.merge(
              newObj,
              v2.value.split(".").reduceRight((obj, next) => ({ [next]: obj }), undefined)
            );
          } else {
            _.merge(newObj, { [v2.value]: undefined });
          }
        }
      }
      // Vue.observable变为响应式对象
      this.$set(data[item.value], data[item.value]?.length, Vue.observable(newObj));
    },
    delItemList(data) {
      data[this.RowList.value].splice(this.EvenIndex, 1);
    },
    // 处理select enum传递为接口情况
    handle(item) {
      if (item.el === "select" && typeof item.enum === "function") {
        item.enum().then((res) => {
          item.enum = res.data;
        });
      }
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "UI/css/form.scss";
</style>
