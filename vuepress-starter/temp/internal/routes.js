/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "D:\\test\\pro-my-ui\\vuepress-starter\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-1ac5d586",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1ac5d586").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-d4201978",
    path: "/component/table/table.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-d4201978").then(next)
    },
  },
  {
    name: "v-52daa784",
    path: "/component/installation/installation.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-52daa784").then(next)
    },
  },
  {
    name: "v-1af3893e",
    path: "/component/test/test.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1af3893e").then(next)
    },
  },
  {
    name: "v-4b5fb13e",
    path: "/component/form/form.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-4b5fb13e").then(next)
    },
  },
  {
    name: "v-1c28f104",
    path: "/component/quickstart/quickstart.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-1c28f104").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]