import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'pro-my-ui/dist/css/index.css';
import ProUI from 'pro-my-ui';

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(ElementUI)
    Vue.use(ProUI)
  }
}