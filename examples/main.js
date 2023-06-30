import Vue from "vue";
import App from "./Form.vue";

import {
  Button as aButton,
  Pagination,
  Input,
  Select,
  Option,
  Tooltip,
  Popover,
  Tabs,
  Table,
  TableColumn,
  DatePicker,
  Form,
  FormItem,
  Row,
  Col,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(aButton);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Tabs);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);

import "../UI/css/button.scss";
import Button from "../UI/packages/button";
import MyTable from "../UI/packages/MyTable";
import MyForm from "../UI/packages/MyForm";
Vue.use(Button);
Vue.use(MyTable);
Vue.use(MyForm);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
