<template>
  <div class="row-container">
    <div class="row-box">
      <!-- 拿到每一行 -->
      <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
        <!-- 拿到每一行每一个 -->
        <el-col v-bind="RowList.cols" v-for="(item, itemIndex) in items" :key="itemIndex" :span="setSpan(items, item, RowData)">
          <template v-if="getShow(RowData, item)">
            <slot v-if="item.el === 'custom' && !item.label" :CurProps="CurProps" :name="setSlotName(item)" :data="RowData" :item="item" />
            <el-form-item v-bind="{ ...item, ...item.props }" v-else-if="item.formList && item.formList.length" :prop="item.value">
              <template v-for="(even, evenIndex) in item.multiple ? item.parentValue ? RowData[item.parentValue][EvenIndex || itemIndex][item.value]?.length : RowData[item.value]?.length : 1">
                <Row :key="evenIndex" :RowList="isTowLevel(item)" :EvenIndex="evenIndex" :CurProps="setProps(item, evenIndex)" :RowData="RowData">
                  <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
                    <slot :name="slot" :data="scope" :index="evenIndex" :parentItem="isTowLevel(item)"></slot>
                  </template>
                </Row>
              </template>
              <i v-if="item.multiple" :style="{ marginLeft: $attrs['label-width'] ? $attrs['label-width'] : '5rem' }" @click="addItemList(item, RowData)" class="el-icon-plus myIcon add"></i>
              <!-- <el-button v-if="item.multiple" type="primary" @click="addItemList(item, RowData)">新增</el-button> -->
            </el-form-item>
            <el-form-item v-bind="{ ...item, ...item.props }" :prop="item.parentValue ? `${CurProps}.${[item.value]}` : item.value" v-else>
              <slot v-if="item.el === 'custom' && item.label" :CurProps="CurProps" :name="setSlotName(item)" :data="RowData" :item="item" />
              <SearchFormItem v-else :column="handle(item)" :EvenIndex="EvenIndex" :CurProps="item.parentValue ? `${CurProps}.${[item.value]}` : item.value" :search-param="RowData"></SearchFormItem>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </div>
      <div class="del-box" style="margin-left: 10px;">
        <i class="el-icon-minus myIcon del" v-if="isShowMinus" @click="delItemList"></i>
        <!-- <el-button type="danger" v-if="isShowMinus" @click="delItemList">删除</el-button> -->
      </div>
  </div>
</template>

<script>
import SearchFormItem from "./formItem.vue";
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
    CurProps: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    setSpan() {
      return function (items, item, data) {
        let show = this.getShow(data, item)
        let itemsLength = items.filter((v) => this.getShow(data, v)).length
        let RemainingNum = 24 - items.filter((v) => !this.getShow(data, v)).reduce((a, b) => a + b.span || 0, 0)
        if (itemsLength === items.length) {
          return item.span ?? (RemainingNum / itemsLength)
        } else {
          return show ? (item.span ?? (RemainingNum / itemsLength)) : 0
        }
      }
    },
    isTowLevel: () => {
      return (val) => {
        val.formList?.flat(Infinity).forEach((v) => {
          v.parentValue = val.value;
        });
        return val;
      };
    },
    getShow() {
      return function (data, val) {
        if (_.isFunction(val.isHidden)) {
          return !val.isHidden(data, val);
        } else {
          return !val.isHidden
        }
      }
    },
    isShowMinus() {
      const lastDotIndex = this.CurProps.lastIndexOf(".");
      const beforeLastDot = this.CurProps.substring(0, lastDotIndex);
      const value = beforeLastDot.split('.').reduce((acc, cur) => acc && acc[cur], this.RowData);
      return this.RowList.multiple && value.length > 1
    },
    setSlotName() {
      return function (item) {
        let name = this.CurProps.split('.').filter((v, index) => index % 2 === 0)
        return [...name, item.value].join('.')
      }
    }
  },
  mounted() {
    //
  },
  methods: {
    setProps(item, eve) {
      if (item.formList) {
      return item.parentValue ? `${this.CurProps}.${item.value}.${eve}` : `${item.value}.${eve}`;
      } else {
        return item.value
      }
    },
    setData(item) {
      let newObj = {};
      for (let v of item.formList) {
        for (let v2 of v) {
          if (v2.formList) {
            _.merge(newObj, { [v2.value]: Array(this.RowData[item.value][0][v2.value].length).fill(this.setData(v2)) });
          } else {
          if (v2.value.includes(".")) {
            _.merge(
              newObj,
              v2.value.split(".").reduceRight((obj, next) => ({ [next]: obj }), v2.el === 'switch' ? true : undefined)
            );
          } else {
            _.merge(newObj, { [v2.value]: v2.el === 'switch' ? true : '' });
          }
          }
        }
      }
      return newObj
    },
    addItemList(item, data) {
      let value = this.CurProps.split('.').reduce((acc, cur) => acc && acc[cur], data);
      let aaa = this.setData(item)
      if (item.parentValue) {
        value[item.value].push({})
      } else {
        data[item.value].push(aaa)
      }
      // if (item.el === 'towLevel') {
      //   this.$set(data[item.value], evenIndex, Vue.observable(newObj));
      // } else {
      //   this.$set(data[item.value], data[item.value]?.length, Vue.observable(newObj));
      // }
    },
    delItemList() {
      const lastDotIndex = this.CurProps.lastIndexOf(".");
      const beforeLastDot = this.CurProps.substring(0, lastDotIndex);
      const afterLastDot = this.CurProps.substring(lastDotIndex + 1);
      const value = beforeLastDot.split('.').reduce((acc, cur) => acc && acc[cur], this.RowData);
      value.splice(afterLastDot, 1);
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
