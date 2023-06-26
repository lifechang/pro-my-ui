import MyTable from './MyTable'
import Button from './button'

const components = {
  MyTable,
  Button
}

const install = function (Vue) {
  if (install.installed) {
  return;
  }
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

const API = {
  install
}

export default API
