<template>
  <div id="app">
    <My-Table :columns="columns" :request-api="getTableList" :show-summary="true" :init-param="initParam">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary">新增用户</el-button>
        <el-button type="primary" plain>批量添加用户</el-button>
        <el-button type="primary" plain>导出用户数据</el-button>
        <el-button type="primary" plain>To 子集详情页面</el-button>
        <el-button type="danger" plain> 批量删除用户 </el-button>
      </template>
      <template #usernameHeader> 111222 </template>
      <template #username>22223</template>
      <template #status> {{ 2222 }}</template>
      <!-- createTime -->
      <template #createTime> 3434 </template>
      <!-- 表格操作 -->
      <template #append>
        <span style="color: var(--el-color-primary)"
          >我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span
        >
      </template>
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
        { type: "selection", width: 80 },
        { type: "index", label: "#", width: 80 },
        { type: "expand", label: "Expand", width: 100 },
        {
          prop: "base",
          label: "基本信息",
          _children: [
            { prop: "username", label: "用户姓名", width: 110, search: { el: "input" } },
            { prop: "user.detail.age", label: "年龄", width: 100 },
            {
              prop: "gender",
              label: "性别",
              width: 100,
              enum: [],
              search: { el: "select", props: { filterable: true } },
              fieldNames: { label: "genderLabel", value: "genderValue" },
            },
            {
              prop: "details",
              label: "详细资料",
              _children: [
                { prop: "idCard", label: "身份证号" },
                { prop: "email", label: "邮箱" },
                { prop: "address", label: "居住地址" },
              ],
            },
          ],
        },
        {
          prop: "status",
          label: "用户状态",
          tag: true,
          enum: [],
          search: { el: "input" },
          fieldNames: { label: "userLabel", value: "userStatus" },
        },
        { prop: "createTime", label: "创建时间", width: 200 },
        { prop: "operation", label: "操作", fixed: "right", width: 230 },
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
                  id: "556266056916010838",
                  username: "郑刚",
                  gender: 2,
                  user: {
                    detail: {
                      age: 25,
                    },
                  },
                  idCard: "556266056916010838",
                  email: "v.pyd@aoywpsvt.et",
                  address: "吉林省 辽源市",
                  createTime: "2008-12-01 05:25:29",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                },
                {
                  id: "223620455558232746",
                  username: "汤芳",
                  gender: 2,
                  user: {
                    detail: {
                      age: 27,
                    },
                  },
                  idCard: "223620455558232746",
                  email: "s.euugwoj@epbyksy.ir",
                  address: "安徽省 巢湖市",
                  createTime: "2021-05-16 22:19:15",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                },
                {
                  id: "555327618771732072",
                  username: "萧军",
                  gender: 1,
                  user: {
                    detail: {
                      age: 15,
                    },
                  },
                  idCard: "555327618771732072",
                  email: "i.roriwqu@qgyzx.is",
                  address: "四川省 资阳市",
                  createTime: "1977-03-08 20:55:59",
                  status: 0,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                },
                {
                  id: "886152951545713882",
                  username: "阎强",
                  gender: 1,
                  user: {
                    detail: {
                      age: 11,
                    },
                  },
                  idCard: "886152951545713882",
                  email: "d.ukcvtk@sns.iq",
                  address: "山西省 运城市",
                  createTime: "2022-09-23 19:14:33",
                  status: 0,
                  avatar: "https://i.imgtg.com/2023/01/16/QR57a.jpg",
                },
                {
                  id: "266283592036271523",
                  username: "夏磊",
                  gender: 2,
                  user: {
                    detail: {
                      age: 13,
                    },
                  },
                  idCard: "266283592036271523",
                  email: "w.qdjqskwwl@ombpfqh.mn",
                  address: "浙江省 绍兴市",
                  createTime: "1976-01-11 23:54:26",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                },
                {
                  id: "860933215054793089",
                  username: "萧杰",
                  gender: 2,
                  user: {
                    detail: {
                      age: 13,
                    },
                  },
                  idCard: "860933215054793089",
                  email: "v.gdmewbfv@xvrqbuqi.tc",
                  address: "四川省 自贡市",
                  createTime: "1996-11-20 23:11:38",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                },
                {
                  id: "973451128055198123",
                  username: "崔艳",
                  gender: 1,
                  user: {
                    detail: {
                      age: 16,
                    },
                  },
                  idCard: "973451128055198123",
                  email: "p.fhbgompis@mmnrler.am",
                  address: "西藏自治区 拉萨市",
                  createTime: "1987-04-24 06:39:58",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                },
                {
                  id: "035123866498939836",
                  username: "康静",
                  gender: 1,
                  user: {
                    detail: {
                      age: 11,
                    },
                  },
                  idCard: "035123866498939836",
                  email: "i.khvuimj@grdth.ad",
                  address: "西藏自治区 阿里地区",
                  createTime: "2021-08-31 02:05:42",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
                },
                {
                  id: "243637404250470323",
                  username: "吴静",
                  gender: 1,
                  user: {
                    detail: {
                      age: 26,
                    },
                  },
                  idCard: "243637404250470323",
                  email: "i.ndny@mboelv.kn",
                  address: "四川省 阿坝藏族羌族自治州",
                  createTime: "2023-03-09 22:18:44",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRa0s.jpg",
                },
                {
                  id: "528683741727413816",
                  username: "易军",
                  gender: 2,
                  user: {
                    detail: {
                      age: 14,
                    },
                  },
                  idCard: "528683741727413816",
                  email: "r.arlcompct@tkhnp.vu",
                  address: "广西壮族自治区 柳州市",
                  createTime: "2006-10-08 15:43:22",
                  status: 1,
                  avatar: "https://i.imgtg.com/2023/01/16/QRqMK.jpg",
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
