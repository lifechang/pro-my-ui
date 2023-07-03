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
              label: "a:",
              value: "name",
              el: "input",
            },
          ],
          [
            {
              label: "b:",
              value: "sex",
              el: "select",
              enum: [
                {
                  label: "男",
                  value: 1,
                },
                {
                  label: "女",
                  value: 0,
                },
              ],
            },
          ],
          [
            {
              label: "责任人:",
              value: "list",
              el: "towLevel",
              multiple: true,
              formList: [
                [
                  {
                    label: "age:",
                    value: "age",
                    el: "input",
                  },
                  {
                    label: "detail:",
                    value: "sex.one",
                    el: "input",
                  },
                ],
                [
                  {
                    label: "ccc:",
                    value: "ccc",
                    el: "input",
                  },
                  {
                    label: "detail:",
                    value: "detail",
                    el: "input",
                  },
                ],
              ],
            },
            {
              label: "责任人:",
              value: "list2",
              el: "towLevel",
              formList: [
                [
                  {
                    label: "age2:",
                    value: "age2",
                    el: "input",
                  },
                  {
                    label: "detail2:",
                    value: "list2.detail2.aaa",
                    el: "input",
                  },
                  {
                    label: "detail3:",
                    value: "list2.detail3",
                    el: "input",
                  },
                  {
                    label: "detail2:",
                    value: "list2.detail2.bbb",
                    el: "input",
                  },
                ],
              ],
            },
          ],
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
        name: "1",
        sex: 0,
        list: [
          {
            age: 18,
            sex: {
              one: "啊啊啊",
            },
            ccc: "ccc",
            detail: "111",
          },
          {
            age: 20,
            sex: "啥地方",
            ccc: "asdasdas",
            detail: "",
          },
        ],
        list2: [
          {
            age2: 20,
            list2: {
              detail2: {
                aaa: "111",
                bbb: "22",
              },
              detail3: "2333",
            },
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
