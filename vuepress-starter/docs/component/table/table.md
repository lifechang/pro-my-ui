---
title: MyTable表格
---

# MyTable 表格

## 基本用法

::: demo 适用广泛的基础表格

```html
<template>
  <MyTable
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
    :dataCallback="dataCallback"
  >
    <!-- 表格 header 按钮 -->
    <template #tableHeader="scope">
      <el-button type="primary">新增用户</el-button>
    </template>
    <template #nameHeader="scope"> 插槽头部 </template>
    <template #province="scope">我国{{ scope.row.province }}</template>
    <template #[`${`user.detail.age`}Search`]="{data}">
      <el-switch
        v-model="data.age"
        active-text="全部"
        inactive-text="个人"
        @change="$forceUpdate()"
        >
      </el-switch>
    </template>
    <template #createTime="scope"> {{ scope.row.createTime }} </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" link>删除</el-button>
    </template>
  </MyTable>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          { type: "selection", fixed: "left", width: 80 },
          { type: "index", label: "#", width: 80 },
          {
            prop: "name",
            label: "姓名",
            search: { el: "input"  },
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
            search: { el: "select",  defaultValue: 0, props: { filterable: true, onChange: () => (alert('111')) } },
            fieldNames: { label: "genderLabel", value: "genderValue" },
          },
          {
            // 多级 prop
            prop: "user.detail.age",
            label: "年龄",
            search: { el: "custom", },
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
        console.log(params)
        return new Promise(function (resolve, reject) {
          // 异步操做
          setTimeout(function () {
            resolve({
              data: {
                list: [
                  {
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
                ],
                pageNum: 1,
                pageSize: 10,
                total: 3,
              },
            });
          }, 1000);
        });
      },
    },
  };
</script>
```

:::

<div class="all-table2">

### MyTable（属性）

::: tip
使用 v-bind="$attrs" 通过属性透传将 MyTable 组件属性全部透传到 el-table 上，所以我们支持 el-table 的所有 Props 属性。在此基础上，还扩展了以下 Props：
:::
| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| ------------ | :--------------------------------------------------------------------------------------: | ----------- | -------- | ------------------------------------- |
| columns | Table 组件会根据此字段渲染搜索表单与表格列 | ColumnProps | true | — |
| requestApi | 获取表格数据的请求 API | Function | — | — |
| requestAuto | 表格初始化是否自动执行请求 API | Boolean | — | true |
| dataCallback | 可对后台数据进行处理的函数 | Function | — | — |
| pagination | 是否显示分页组件：pagination 为 true 返回 list 表格数据和分页数据， 反之直接返回数组数据 | Boolean | — | true |
| initParam | 表格请求的初始化参数，该值变化会自动请求表格数据 | Object | — | {} |
| rowKey | 当表格数据多选时，所指定的 id | String | — | 'id' |
| searchCol | 表格搜索项每列占比配置 | Object | — | { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 } |

</div>

<div class="all-table2">

### Column 配置

::: tip
使用 v-bind="column" 通过属性透传将每一项 column 属性全部透传到 el-table-column 上，所以我们支持 el-table-column 的所有 Props 属性。在此基础上，还扩展了以下 Props：
:::
| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| ------------ | :------------------------: | ----------- | -------- | ----------- |
| prop | 对应列内容的字段名 | string | — | — |
| label | 显示的标题 | string | — | — |
| type | 对应列的类型 | string | — | selection / index / expand |
| prop | 对应列内容的字段名（注：如需调用事件方法 支持input/change） | string | — | — |
| search | 搜索项配置 | SearchProps | — | — |
| isShow | 列的显隐 | Boolean | — | true |
| enum | 可格式化单元格内容，还可以作为搜索框的下拉选项（字典可以为 API 请求函数，内部会自动执行） | Object / Function | — | — |
| isFilterEnum | 当前单元格值是否根据 enum 格式化（例如 enum 只作为搜索项数据，不参与内容格式化） | Boolean | — | true |
| fieldNames | 指定 label && value && children 的 key 值 | Object | — | — |
| headerRender | 自定义表头内容渲染 | Function(h, scope) | — | — |
| render | 自定义单元格内容渲染 | Function(h, scope) | — | — |

</div>

<div class="all-table2">

### 搜索项 配置（SearchProps）

::: tip
使用 v-bind="column.search.props“ 通过属性透传将 search.props 属性全部透传到每一项搜索组件上，所以我们支持 input、select、tree-select、date-packer、time-picker、time-select、switch 大部分属性，并在其基础上还扩展了以下 Props：
:::
| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| ------------ | :------------------------: | ----------- | -------- | ----------- |
| el | 当前项搜索框的类型，支持：input、input-number、selec、tree-select、cascader、date-packer、time-picker、time-select、switch | string | — | — |
| props | el 组件的属性会透传到该组件上 | Object | — | — |
| defaultValue | 搜索项默认值 | any | — | — |
| key | 当搜索项 key 不为 prop 属性时，可通过 key 指定 | String | — | — |
| order | 搜索项排序（从小到大） | Number | — | — |
| span | 搜索项所占用的列数，默认为 1 列 | Number | — | 1 |
| offset | 搜索字段左侧偏移列数 | Number | — | — |
| render | 自定义搜索内容渲染 | Function(h, scope) | — | — |

</div>

<div class="all-table1">

### MyTable 方法

::: tip
MyTable 组件暴露了 el-table 实例和一些组件内部的参数和方法：
:::
| 参数 | 说明 |
| ------------ | :------------------------: |
| element | el-table 实例，可以通过 this.$refs.element.方法名来调用 el-table 的所有方法 |
| tableData | 当前页面所展示的数据 |
| searchParam | 所有的搜索参数，不包含分页 |
| searchInitParam | 所有的搜索初始化默认的参数 |
| pageable | 当前表格的分页数据 |
| getTableList | 获取、刷新表格数据的方法（携带所有参数） |
| search | 表格查询方法，相当于点击搜索按钮 |
| reset | 重置表格查询参数，相当于点击重置按钮 |
| clearSelection | 清空表格所选择的数据 |
| enumMap | 当前表格使用的所有字典数据（Map 数据结构） |
| isSelected | 表格是否选中数据 |
| selectedList | 表格选中的数据列表 |
| selectedListIds | 表格选中的数据列表的 id |

</div>

<div class="all-table1">

### MyTable 插槽

::: tip
使用方法：
:::
| 插槽名 | 说明 |
| ---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------: |
| column.prop | 单元格的作用域插槽 |
| column.prop + "Header" | 表头的作用域插槽 |
| column.prop + "Search" | 自定义搜索的作用域插槽 <font color="#dd0000">(注：如需进行修改数据操作要调用$forceUpdate()方法)</font>  |
| pagination | 分页组件插槽 |
| empty | 当表格数据为空时自定义的内容 |
| append | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |

</div>
