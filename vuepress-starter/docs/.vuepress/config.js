const path = require("path");

module.exports = {
  title: "pro-my-ui",
  description: "网站描述",
  base: "/pro-my-ui/",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 增加一个自定义的 favicon(网页标签的图标)
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("core-js/library/fn", "core-js/features");
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@all": path.resolve(__dirname, "../../../UI/packages/"),
        "@component": path.resolve(__dirname, "../component"),
      },
    },
  },
  themeConfig: {
    nav: [
      // { text: "前端算法", link: "/algorithm/" }, // 内部链接 以docs为根目录
      // { text: "博客", link: "http://obkoro1.com/" }, // 外部链接
      // // 下拉列表
      // {
      //   text: "GitHub",
      //   items: [
      //     { text: "GitHub地址", link: "https://github.com/OBKoro1" },
      //     {
      //       text: "算法仓库",
      //       link: "https://github.com/OBKoro1/Brush_algorithm",
      //     },
      //   ],
      // },
    ],
    sidebar: [
      {
        title: "开发指南", // 一级菜单名称
        collapsable: false, // false为默认展开菜单, 默认值true是折叠,
        sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
        children: [
          "/component/installation/installation.md",
          "/component/quickstart/quickstart.md",
        ],
      },
      {
        title: "组件",
        collapsable: false,
        sidebarDepth: 0,
        children: [
          "/component/table/table.md",
          // '/component/test/test.md'
        ],
      },
    ],
  },
  plugins: ["demo-container"], // 配置插件
  markdown: {},
};
