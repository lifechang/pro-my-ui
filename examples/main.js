import Vue from "vue";
import App from "./Table.vue";

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
  Radio,
  RadioGroup,
  RadioButton,
  Tree,
  Cascader,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
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
Vue.use(Tree);
Vue.use(Cascader);
Vue.use(Empty);

import "../UI/css/button.scss";
import MyTable from "../UI/packages/MyTable";
import MyForm from "../UI/packages/MyForm";
import MyDialog from "../UI/packages/MyDialog";
import MyTreeSelect from "../UI/packages/MyTreeSelect";
Vue.use(MyTable);
Vue.use(MyForm);
Vue.use(MyDialog);
Vue.use(MyTreeSelect);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
