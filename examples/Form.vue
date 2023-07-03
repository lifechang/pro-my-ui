<template>
  <div id="app">
    <MyForm ref="myForm" :setFormData="setFormData" :setFormConfig="setFormConfig">
      <template #txt>
        <div>111</div>
      </template>
      <!-- <template #empty>
        <div>111</div>
      </template> -->
    </MyForm>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      setFormConfig: {
        gutter: 0,
        formList: [
          [
            {
              label: "活动名称:",
              value: "name",
              el: "input",
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
              props: { type: "datetimerange", valueFormat: "yyyy-MM-dd HH:mm:ss" },
            },
          ],
          [
            {
              label: "参加人员:",
              value: "list",
              el: "towLevel",
              multiple: true,
              formList: [
                [
                  {
                    label: "姓名:",
                    value: "name",
                    el: "input",
                  },
                  {
                    label: "状态:",
                    value: "info.status",
                    el: "switch",
                    props: {
                      'active-text': "参加",
                      'inactive-text': "未参加"
                    }
                  },
                ],
                [
                  {
                    label: "城市:",
                    value: "city",
                    span: 16,
                    el: "select",
                    enum: async () => {
                      let res = await new Promise((resolve) => {
                        resolve([{ name: '上海', key: 1 }, { name: '北京', key: 1 }])
                      })
                      console.log(res);
                      return res
                    },
                    fieldNames: {
                      label: 'name',
                      vlaue: 'key',
                    }
                  }
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
                    label: "姓名:",
                    value: "name",
                    span: 8,
                    el: "input",
                  },
                  {
                    label: "手机号:",
                    value: "detail.info.phone",
                    span: 16,
                    el: "input",
                  },
                ],
              ],
            },
          ],
          [{
            label: '活动地址',
            value: 'address',
            el: 'input'
          }]
        ],
        formBtn: [
          {
            name: "保存",
            type: "primary",
            callBack: (data) => {
              console.log(data);
            },
          },
          {
            name: "取消",
            type: "info",
            callBack: () => {
              console.log(this.$refs.myForm.formData);
            },
          },
        ],
      },
      setFormData: {
        name: "表单验证",
        time: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
        list: [
          {
            name: '',
            info: {
              status: true,
            },
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
