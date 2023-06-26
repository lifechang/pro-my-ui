<template>
  <div id="app">
    <My-Table
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary">新增用户</el-button>
        <el-button type="primary" plain>批量添加用户</el-button>
        <el-button type="primary" plain>导出用户数据</el-button>
        <el-button type="primary" plain>To 子集详情页面</el-button>
        <el-button type="danger" plain> 批量删除用户 </el-button>
      </template>
      <template #usernameHeader> 111222 </template>
      <template #aaa> {{ 2222 }}</template>
      <!-- createTime -->
      <template #createTime> 3434 </template>
      <!-- 表格操作 -->
      <template #operation>
        <el-button type="primary" link>删除</el-button>
      </template>
    </My-Table>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      columns: [
        { type: "selection", fixed: "left", width: 80 },
        { type: "index", label: "#", width: 80 },
        { type: "expand", label: "Expand", width: 100 },
        {
          prop: "username",
          label: "用户姓名",
          search: { el: "input" },
        },
        {
          prop: "gender",
          label: "性别",
          // 字典数据
          // enum: genderType,
          // 字典请求不带参数
          enum: [],
          // 字典请求携带参数
          // enum: () => getUserGender({ id: 1 }),
          search: { el: "select", props: { filterable: true } },
          fieldNames: { label: "genderLabel", value: "genderValue" },
        },
        {
          // 多级 prop
          prop: "user.detail.age",
          label: "年龄",
          search: { el: "select", props: { filterable: true } },
        },
        { prop: "idCard", label: "身份证号", search: { el: "input" } },
        { prop: "email", label: "邮箱" },
        { prop: "address", label: "居住地址" },
        {
          prop: "status",
          label: "用户状态",
          enum: [],
          search: { el: "input", props: { filterable: true } },
          fieldNames: { label: "userLabel", value: "userStatus" },
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
              valueFormat: "YYYY-MM-DD HH:mm:ss",
            },
            defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
          },
        },
        { prop: "operation", label: "操作", fixed: "right", width: 330 },
      ],
      // 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
      initParam: {
        // name: '',
        // limit: 10,
        // page: 1,
        // status: 1
      },
    };
  },
  methods: {
    getTableList() {
      return new Promise(function (resolve) {
        // 异步操做
        setTimeout(function () {
          resolve({
            data: {
              list: [
                {
                  username: "2323",
                  gender: 1,
                  user: {
                    detail: {
                      age: 18,
                    },
                  },
                  idCard: 4645665,
                  createTime: "aaaaa",
                  email: "2",
                  address: "asdgggggggggggggggggg",
                },
              ],
              pageNum: 1,
              pageSize: 10,
              total: 35,
            },
          });
        }, 2000);
      });
    },
  },
};
</script>

<style></style>
