<template>
  <div id="app">
    <MyForm ref="myForm" :setFormData="setFormData" :setFormConfig="setFormConfig" :rules="setFormConfig.rules">
      <template #[`list2.name`]="{ scope }">
        <div>我是插槽{{ scope.data.data[scope.parentItem.value][scope.index][scope.data.item.value] }}</div>
      </template>
      <template #address="{ scope }">
        <div>{{ scope.data[scope.item.value] }}707办公室1</div>
      </template>
    </MyForm>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      setFormData: {
        region: '',
        name: "",
        name1: '',
        comboDesc1: '',
        time: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
        list: [
          {
            name: "",
            info: {
              status: false,
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
        comboDesc: '',
        isLink: true
      },
      setFormConfig: {
        gutter: 0,
        // cols: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
        rules: {
          name: [{ required: true, message: "请输入活动名称1", trigger: "blur" }],
        },
        formList: [
          [
            {
              label: "活动名称：",
              value: "name",
              el: "input",
              props: {
                rules: [{ required: true, message: "请输入活动名称2", trigger: "blur" }],
              },
            },
          ],
          [
            {
              label: "活动区域:",
              value: "region",
              el: "select",
              isHidden: (aa) => {
                return aa.name === ''
              },
              props: {
                change: (a) => {
                  console.log(a)
                }
              },
              span: 6,
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
              el: "date-picker",
              props: { type: "datetimerange", valueFormat: "yyyy-MM-dd HH:mm:ss" },
            },
            {
              label: "1122：",
              value: "name1",
              span: 5,
              el: "input",
            },
          ],
          [
            {
              label: "参加人员:",
              value: "list",
              el: "towLevel",
              multiple: true,
              props: {
                rules: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
              },
              formList: [
                [
                  {
                    label: "姓名:",
                    value: "name",
                    el: "input",
                    props: {
                      rules: [{ required: true, message: "请输入姓名", trigger: "blur" }],
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
          ],
          [
            {
              label: '套餐描述1：',
              value: 'comboDesc1',
              el: 'radio-group',
              enum: [
                {
                  label: "啊啊啊啊啊啊啊啊",
                  value: "11",
                },
                {
                  label: "ffffd",
                  value: "112",
                }
              ],
              props: {
              }
            }
          ],
          [
            {
              label: '套餐描述1：',
              value: 'comboDesc2',
              render: 'my-tree-select',
              enum: [
                {
                  id: 1,
                  label: "重庆",
                  enum: [
                    {
                      id: 2,
                      label: "渝北区",
                    },
                  ],
                },
                {
                  id: 3,
                  label: "北京",
                  children: [
                    { id: 4, label: "海淀区" },
                    { id: 5, label: "朝阳区" },
                  ],
                },
                {
                  id: 6,
                  label: "四川",
                  children: [
                    {
                      id: 7,
                      label: "成都",
                      children: [{ id: "8", label: "成华区" }],
                    },
                  ],
                },
              ],
              props: {
                a: '1',
                  props: {
                    children: "children",
                    label: "label",
                  },
              }
            }
          ],
          [
            {
              label: '套餐描述1：',
              value: 'comboDesc3',
              el: 'cascader',
              enum: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
              props: {
                a: '1',
                  props: {
                    children: "children",
                    label: "label",
                  },
              }
            }
          ],
          [
            {
              label: '套餐描述：',
              value: 'comboDesc',
              el: 'input',
              props: {
                type: 'textarea',
                rows: '3',
                rules: [
                  {
                    required: true,
                    message: '请输入套餐描述',
                    trigger: 'blur'
                  }
                ]
              }
            }
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
              console.log(this.$refs.myForm.RefForm());
            },
          },
        ],
      },
    };
  },
  async mounted() {
    let res = await new Promise((resolve) => {
      resolve({
        data: [
          { name: "上海", key: 1 },
          { name: "北京", key: 2 },
        ],
      });
    });
    // this.setFormConfig.formList[2][0].formList[1][0].enum = res.data;
  },
  methods: {},
};
</script>
