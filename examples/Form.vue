<template>
  <div id="app">
    <MyForm ref="myForm" :setFormData="setFormData" :setFormConfig="setFormConfig" :rules="setFormConfig.rules">
      <template #[`list2.name`]="{ scope }">
        <div>我是插槽{{ scope.data.data[scope.parentItem.value][scope.index][scope.data.item.value] }}</div>
      </template>
      <template #address="{ scope }">
        <div>{{ scope.data[scope.item.value] }}707办公室</div>
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
        name: "123",
        name1: '',
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
        comboDesc: ''
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
              // noShow: true,
              props: {
                change: (a) => {
                  this.setFormConfig.formList[1][1].noShow = a === 'shanghai'
                  console.log(a, )
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
              noShow: true,
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
