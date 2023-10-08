import Vue from "vue";
import App from "./Table1.vue";

import {
  Button,
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
  Switch,
  Dialog,
  Empty,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Button);
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
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Empty);

import "../UI/css/button.scss";
import MyTable from "../UI/packages/MyTable";
import MyForm from "../UI/packages/MyForm";
import MyDialog from "../UI/packages/MyDialog";
Vue.use(MyTable);
Vue.use(MyForm);
Vue.use(MyDialog);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
