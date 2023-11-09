import MyTable from "./MyTable";
import MyForm from "./MyForm";
import MyDialog from "./MyDialog";
import MyTreeSelect from "./MyTreeSelect";


const components = {
  MyTable,
  MyForm,
  MyDialog,
  MyTreeSelect
};

const install = function (Vue) {
  if (install.installed) {
    return;
  }
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });
};

const API = {
  install,
};

export default API;
