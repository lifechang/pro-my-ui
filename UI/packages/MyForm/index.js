import Form from "./src/index.vue";
Form.install = function (Vue) {
  Vue.component(Form.name, Form);
};
export default Form;
