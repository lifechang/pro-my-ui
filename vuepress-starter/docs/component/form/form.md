---
title: MyForm表单
---

# MyForm 表单

## 基本用法

::: demo 适用广泛的基础单选

```html
<template>
  <div>
    <MyForm
      ref="myForm"
      :setFormData="setFormData"
      :setFormConfig="setFormConfig"
      :rules="setFormConfig.rules"
    >
      <template #[`list2.name`]="{ scope }">
        <div>
          我是插槽{{
          scope.data.data[scope.parentItem.value][scope.index][scope.data.item.value]
          }}
        </div>
      </template>
      <template #address="{ scope }">
        <div>{{ scope.data[scope.item.value] }}707办公室</div>
      </template>
    </MyForm>
    <div>-</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        setFormConfig: {
          gutter: 0,
          // cols: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
          rules: {
            name: [
              { required: true, message: "请输入活动名称1", trigger: "blur" },
            ],
          },
          formList: [
            [
              {
                label: "活动名称：",
                value: "name",
                el: "input",
                props: {
                  rules: [
                    {
                      required: true,
                      message: "请输入活动名称2",
                      trigger: "blur",
                    },
                  ],
                },
              },
            ],
            [
              {
                label: "活动区域:",
                value: "region",
                el: "select",
                span: 8,
                enum: [
                  {
                    label: "区域一",
                    value: "shanghai",
                  },
                  {
                    label: "区域二",
                    value: "beijing",
                  },
                ],
              },
              {
                label: "活动时间:",
                value: "time",
                span: 16,
                el: "date-picker",
                props: {
                  type: "datetimerange",
                  valueFormat: "yyyy-MM-dd HH:mm:ss",
                },
              },
            ],
            [
              {
                label: "参加人员:",
                value: "list",
                el: "towLevel",
                multiple: true,
                props: {
                  rules: [
                    {
                      required: true,
                      message: "请输入活动名称",
                      trigger: "blur",
                    },
                  ],
                },
                formList: [
                  [
                    {
                      label: "姓名:",
                      value: "name",
                      el: "input",
                      props: {
                        rules: [
                          {
                            required: true,
                            message: "请输入姓名",
                            trigger: "blur",
                          },
                        ],
                      },
                    },
                    {
                      label: "状态:",
                      value: "info.status",
                      el: "switch",
                      props: {
                        "active-text": "参加",
                        "inactive-text": "未参加",
                      },
                    },
                  ],
                  [
                    {
                      label: "城市:",
                      value: "city",
                      span: 16,
                      el: "select",
                      enum: () => {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve({
                              data: [
                                {
                                  name: "1111",
                                  key: "11",
                                },
                                {
                                  name: "222",
                                  key: "222",
                                },
                              ],
                            });
                          }, 3000);
                        });
                      },
                      fieldNames: {
                        label: "name",
                        value: "key",
                      },
                    },
                  ],
                ],
              },
              {
                label: "负责人:",
                value: "list2",
                el: "towLevel",
                formList: [
                  [
                    {
                      // label: "姓名:",
                      value: "name",
                      span: 8,
                      el: "custom",
                    },
                    {
                      label: "手机号:",
                      value: "detail.info.phone",
                      span: 16,
                      el: "input",
                      props: {
                        rules: [
                          {
                            required: true,
                            message: "请输入活动名称",
                            trigger: "blur",
                          },
                        ],
                      },
                    },
                  ],
                ],
              },
            ],
            [
              {
                label: "活动地址：",
                value: "address",
                el: "custom",
              },
            ],
          ],
          formBtn: [
            {
              name: "保存",
              type: "primary",
              callBack: async (data) => {
                let res = await this.$refs.myForm.validate();
                console.log(data);
              },
            },
            {
              name: "取消",
              type: "info",
              callBack: async (data) => {
                await this.$refs.myForm.resetFields();
              },
            },
          ],
        },
        setFormData: {
          name: "表单验证",
          time: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
          list: [
            {
              name: "",
              info: {
                status: true,
              },
              // city: "",
            },
          ],
          list2: [
            {
              name: "小明",
              detail: {
                info: {
                  phone: "",
                },
              },
            },
          ],
        },
      };
    },
  };
</script>
```

:::

### ProForm(属性)

::: tip
使用 v-bind="$attrs" 通过属性透传将 ProForm 组件属性全部透传到 el-form 上，所以支持 el-form 的所有 Props 属性。在此基础上，还扩展了以下属性：
:::
| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| ------------ | :--------------------------------------------------------------------------------------: | ----------- | -------- | ------------------------------------- |
| setFormData | 表单数据对象(应定义数据初始字段) | Object | true | — |
| setFormConfig | 表单列表结构 | 二维数组 | true | — |
| formBtn | 表单底部按钮 | Array | — | — |
| gutter | 栅格间隔 | number | — | 0 |
| cols | 栅格布局 | Object | — | — |

### setFormConfig(表单列表结构)

::: tip
结构为二维数组(支持二级动态表单)，例: [[{label: '姓名', value: "name"}], [{label: '年龄'}, {label: '详情'}]], 使用 v-bind="$attrs" 通过属性透传将 对象属性全部透传到 el-form-item 和 该对象组件上，所以支持 el-form-item 的所有 Props 属性。 对象属性如下：
:::
| 参数 | 说明 | 类型 | 是否必传 | 默认值 |
| ------------ | :--------------------------------------------------------------------------------------: | ----------- | -------- | ------------------------------------- |
| label | 标签文本 | string | true | — |
| value | 组件绑定字段名(支持连级) 例：'detail.name' | string | true | — |
| el | element 组件名(input/select/switch) 支持(插槽 custom, 二级表单 towLevel) | string | true | — |
| cols | 栅格布局 | Object | — | — |
