<template>
  <div class="row-container">
    <div class="row-box">
      <!-- 拿到每一行 -->
      {{ CurProps }}
      <el-row v-for="(items, index) in RowList.formList" :key="index" :gutter="RowList.gutter">
        <!-- 拿到每一行每一个 -->
        <el-col v-bind="RowList.cols" v-for="(item, itemIndex) in items" :key="itemIndex" :span="setSpan(items, item, RowData)">
          {{  index }} - 99

          <template v-if="getShow(RowData, item)">
            <slot v-if="item.el === 'custom' && !item.label" :name="item.parentValue ? `${[item.parentValue]}.${[item.value]}` : item.value" :data="RowData" :item="item" />
            <el-form-item v-bind="{ ...item, ...item.props }" v-else-if="item.el === 'towLevel'" :prop="item.value">
              <!-- {{ CurProps }} -->
              <!-- {{  item.multiple ? item.parentValue ? RowData[item.parentValue][itemIndex][item.value]?.length : RowData[item.value]?.length : 1  }} -->
              <Row v-for="(even, evenIndex) in item.multiple ? item.parentValue ? RowData[item.parentValue][itemIndex][item.value]?.length : RowData[item.value]?.length : 1" :key="evenIndex" :RowList="isTowLevel(item)" :EvenIndex="evenIndex" :CurProps="item.el === 'towLevel' ?  setaaa(item, itemIndex, evenIndex) : item.value" :RowData="RowData">
                <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
                  <slot :name="slot" :data="scope" :index="evenIndex" :parentItem="isTowLevel(item)"></slot>
                </template>
              </Row>
              <i v-if="item.multiple" :style="{ marginLeft: $attrs['label-width'] ? $attrs['label-width'] : '5rem' }" @click="addItemList(item, RowData, itemIndex)" class="el-icon-plus myIcon add"></i>
            </el-form-item>
            <el-form-item v-bind="{ ...item, ...item.props }" :prop="item.parentValue ? `${CurProps}.${[item.value]}` : item.value" v-else>
              <slot v-if="item.el === 'custom' && item.label" :name="item.parentValue ? `${[item.parentValue]}.${[item.value]}` : item.value" :data="RowData" :item="item" />
              <SearchFormItem v-else :column="handle(item)" :EvenIndex="EvenIndex" :CurProps="item.parentValue ? `${CurProps}.${[item.value]}` : item.value" :search-param="RowData"></SearchFormItem>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </div>
    <div class="del-box">
      <i class="el-icon-minus myIcon del" v-if="RowList.multiple && RowData[this.RowList.value]?.length > 1" @click="delItemList(RowData)"></i>
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
    CurProps: {
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // setaaa() {
    //   return (item, index, eve) => {
    //     console.log(item, index, eve, this.CurProps, `${this.CurProps}.${item.value}.${eve}`, 'qqq');
    //     return item.parentValue ? `${this.CurProps}.${item.value}.${eve}` : `${item.value}.${index}`;
    //   }
    // },
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
        // console.log(val, val.formList?.flat(2));
        val.formList?.flat(Infinity).forEach((v) => {
          v.towLevel = true;
          v.parentValue = val.value;
        });
        return val;
      };
    },
    getShow() {
      return function (data, val) {
        if (_.isBoolean(val.isHidden)) {
          return !val.isHidden;
        } else if (_.isFunction(val.isHidden)) {
          return !val.isHidden(data, val);
        }
        return true;
      }
    }
  },
  mounted() {
    // console.log(this.RowList, this.EvenIndex, this.RowData);
  },
  methods: {
    setaaa(item, index, eve) {
      console.log(item, index, eve, this.CurProps, 'qqq');
      console.log(item.parentValue ? `${this.CurProps}.${item.value}.${eve}` : `${item.value}.${index}`)
      return item.parentValue ? `${this.CurProps}.${item.value}.${eve}` : `${item.value}.${index}`;
    },
    addItemList(item, data, evenIndex) {
      console.log(item, data, evenIndex, this.CurProps);
      let value = this.CurProps.split('.').reduce((acc, cur) => acc && acc[cur], data);
      console.log(value, 'aa')
      if (item.parentValue) {
        console.log(111)
        value[item.value].push({})
      } else {
        data[item.value].push({})
        // this.$set(data[item.value], evenIndex, {})
        console.log(22)
      }
      console.log(data)
      // 获取新增数据结构
      // let newObj = {};
      // for (let v of item.formList) {
      //   for (let v2 of v) {
      //     if (v2.value.includes(".")) {
      //       _.merge(
      //         newObj,
      //         v2.value.split(".").reduceRight((obj, next) => ({ [next]: obj }), v2.el === 'switch' ? true : undefined)
      //       );
      //     } else {
      //       _.merge(newObj, { [v2.value]: v2.el === 'switch' ? true : '' });
      //     }
      //   }
      // }
      // // Vue.observable变为响应式对象
      // if (item.el === 'towLevel') {
      //   this.$set(data[item.value], evenIndex, Vue.observable(newObj));
      // } else {
      //   this.$set(data[item.value], data[item.value]?.length, Vue.observable(newObj));
      // }
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
