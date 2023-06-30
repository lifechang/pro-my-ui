<template>
  <div id="app">
    <MyForm :setFormData="setFormData" :setFormConfig="setFormConfig" label-position="right" label-width="80px">
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
              formList: [
                {
                  label: "age:",
                  value: "list.age",
                  el: "input",
                },
                {
                  label: "detail:",
                  value: "list.detail",
                  el: "input",
                },
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
            callBack: (data) => {
              console.log(data);
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
            detail: "111",
          },
          {
            age: 20,
            detail: "222",
          },
        ],
      },
    };
  },
  methods: {},
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
