<template>
  <div id="app">
    <div style="
        width: 100%;
        height: 100%;
        flex-direction: column;
        box-sizing: border-box;
      ">
      <div style="height: 60px">1</div>
      <div style="display: flex; min-width: 800px; height: calc(100% - 60px)">
        <div style="min-width: 180px">
          <el-button type="primary" @click="$refs.ShowDialog.show = true">打开</el-button>
        </div>
        <MyTable :columns="columns" :requestApi="getTableList" :init-param="initParam" show-summary :dataCallback="dataCallback">
          <!-- 表格 header 按钮 -->
          <template #tableHeader>
            <el-button type="primary">新增用户</el-button>
          </template>
          <template #nameHeader> 插槽头部 </template>
          <template #province="scope">我国{{ scope.row.province }}</template>
          <template #ageSearch="{ data }">
            <el-switch v-model="data.age" active-text="全部" inactive-text="个人" @change="$forceUpdate()">
            </el-switch>
          </template>
          <template #createTime="scope"> {{ scope.row.createTime }} </template>
          <!-- 表格操作 -->
          <template #append>
            <span>我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span>
          </template>
          <template #operation>
            <el-button type="primary" link>删除</el-button>
          </template>
        </MyTable>
      </div>
    </div>
    <ShowDialog ref="ShowDialog"></ShowDialog>
  </div>
</template>

<script>
import ShowDialog from "./Dialog.vue";
export default {
  components: {
    ShowDialog
  },
  data() {
    return {
      columns: [
        { type: "selection", fixed: "left", width: 80 },
        { type: "index", label: "#", width: 80 },
        {
          prop: "name",
          label: "姓名",
          search: { el: "input" },
          render: (h, scope) => {
            let style = {
              color: "green",
            };
            let domProps = {
              innerHTML: scope.row.name,
            };
            return h("div", { style, domProps });
          },
        },
        {
          prop: "gender",
          label: "性别",
          // 字典数据
          // 字典请求不带参数(label/value)
          enum: [
            { genderLabel: "男", genderValue: 1 },
            { genderLabel: "女", genderValue: 0 },
          ],
          // 字典请求携带参数
          // enum: () => getUserGender({ id: 1 }),
          search: {
            el: "select",
            defaultValue: 0,
            props: { filterable: true, onChange: () => alert("111") },
          },
          fieldNames: { label: "genderLabel", value: "genderValue" },
        },
        {
          // 多级 prop
          prop: "user.detail.age",
          label: "年龄",
          search: { el: "custom" },
        },
        { prop: "province", label: "省份", search: { el: "input" } },
        { prop: "city", label: "市区" },
        { prop: "address", label: "地址" },
        {
          prop: "status",
          label: "用户状态",
          enum: [
            { label: "开启", value: 1 },
            { label: "关闭", value: 0 },
          ],
          search: { el: "select", props: { filterable: true } },
        },
        {
          prop: "createTime",
          label: "创建时间",
          width: 180,
          search: {
            el: "date-picker",
            span: 2,
            props: {
              type: "datetimerange",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
            },
            defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
          },
        },
        { prop: "operation", label: "操作", fixed: "right", width: 200 },
      ],
      // 如果表格需要初始化请求参数，直接定义传给 MyTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
      initParam: {
        // name: '',
        // limit: 10,
        // page: 1,
        // status: 1
      },
    };
  },
  methods: {
    dataCallback(res) {
      return {
        list: res.list,
        pageNum: res.pageNum,
        pageSize: res.pageSize,
        total: res.total,
      };
    },
    async getTableList(params) {
      return new Promise(function (resolve) {
        // 异步操做
        setTimeout(function () {
          resolve({
            data: {
              list: [
                {
                  id: '1',
                  date: "2016-05-03",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 18,
                    },
                  },
                },
                {
                  id: '2',
                  date: "2016-05-02",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 1,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 19,
                    },
                  },
                },
                {
                  id: '3',
                  date: "2016-05-04",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 20,
                    },
                  },
                },
                {
                  id: '4',
                  date: "2016-05-03",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 18,
                    },
                  },
                },
                {
                  id: '5',
                  date: "2016-05-02",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 1,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 19,
                    },
                  },
                },
                {
                  id: '6',
                  date: "2016-05-04",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 20,
                    },
                  },
                },
                {
                  id: '7',
                  date: "2016-05-03",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 18,
                    },
                  },
                },
                {
                  id: '8',
                  date: "2016-05-02",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 1,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 19,
                    },
                  },
                },
                {
                  id: '9',
                  date: "2016-05-03",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 0,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 18,
                    },
                  },
                },
                {
                  id: '10',
                  date: "2016-05-02",
                  name: "王小虎",
                  gender: 1,
                  province: "上海",
                  city: "普陀区",
                  address: "上海市普陀区金沙江路 1518 弄",
                  status: 1,
                  createTime: "2023-05-12 12:22:07",
                  user: {
                    detail: {
                      age: 19,
                    },
                  },
                }
              ],
              pageNum: 1,
              pageSize: 3,
              total: 10,
            },
          });
        }, 1000);
      });
    },
  },
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
