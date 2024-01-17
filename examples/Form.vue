<template>
  <div class="ay_container">
    <div class="ay_header">
      {{ id ? "编辑" : "新增" }}商品
      <a @click="$router.back()" href="javascript:;">
        <el-button size="small" type="primary" plain icon="el-icon-back">返 回</el-button>
      </a>
    </div>
    <div class="ay_main" style="padding: 20px">
      <MyForm ref="myForm" :setFormData="setFormData" label-width="110px" :setFormConfig="setFormConfig" :rules="setFormConfig.rules">
        <template #[`skus.sale_price`]="{ scope }">
          <el-input v-model="scope.data.data.skus[scope.index].sale_price" placeholder=""></el-input>
        </template>
        <template #[`skus.sku_attrs.attr_value`]="{scope}">
          {{ scope.data.data.data.skus[scope.index].sku_attrs }}2222
          <!-- <el-input v-model="scope.data.data.skus[scope.index].sale_price" placeholder=""></el-input> -->
        </template>
      </MyForm>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      setFormConfig: {
        gutter: 0,
        // cols: { xs: 24, sm: 12, md: 12, lg: 12, xl: 12 },
        rules: {
          title: [
            { required: true, message: "请输入活动名称1", trigger: "blur" },
          ],
        },
        formList: [
          [
            {
              label: "标题",
              value: "title",
              el: "input",
              props: {
                rules: [
                  {
                    required: true,
                    message: "请输入标题",
                    trigger: "blur",
                  },
                ],
              },
            },
            // {
            //   label: "副标题",
            //   value: "sub_title",
            //   el: "input",
            //   props: {
            //     rules: [
            //       {
            //         required: true,
            //         message: "请输入副标题",
            //         trigger: "blur",
            //       },
            //     ],
            //   },
            // },
          ],
          // [
          //   {
          //     label: "商品详情图",
          //     value: "sub_title",
          //     el: "input",
          //     props: {},
          //   },
          // ],
          // [
          //   {
          //     label: "商品描述",
          //     value: "sub_title",
          //     el: "input",
          //     props: {},
          //   },
          // ],
          // [
          //   {
          //     label: "商品类目:",
          //     value: "cats",
          //     el: "select",
          //     span: 8,
          //     enum: [
          //       {
          //         label: "区域一",
          //         value: "shanghai",
          //       },
          //       {
          //         label: "区域二",
          //         value: "beijing",
          //       },
          //     ],
          //   },
          // ],
          // [
          //   {
          //     label: "规格:",
          //     value: "attrs",
          //     el: "towLevel",
          //     multiple: true,
          //     formList: [
          //       [
          //         {
          //           label: "属性键key:",
          //           value: "attr_key",
          //           el: "input",
          //           props: {
          //             rules: [
          //               {
          //                 required: true,
          //                 message: "请输入姓名",
          //                 trigger: "blur",
          //               },
          //             ],
          //           },
          //         },
          //         {
          //           label: "属性值value:",
          //           value: "attr_value",
          //           el: "input",
          //           props: {
          //             rules: [
          //               {
          //                 required: true,
          //                 message: "请输入姓名",
          //                 trigger: "blur",
          //               },
          //             ],
          //           },
          //         },
          //       ],
          //     ],
          //   },
          // ],
          // [
          //   {
          //     label: "运费模版:",
          //     value: "express_info.template_id",
          //     el: "select",
          //     span: 8,
          //     enum: [
          //       {
          //         label: "区域一",
          //         value: "shanghai",
          //       },
          //       {
          //         label: "区域二",
          //         value: "beijing",
          //       },
          //     ],
          //   },
          // ],
          [
            {
              label: "skus:",
              value: "skus",
              el: "towLevel",
              multiple: true,
              formList: [
                [
                  {
                    label: "售卖价格:",
                    value: "sale_price",
                    el: "custom",
                    // props: {
                    //   rules: [
                    //     {
                    //       required: true,
                    //       message: "请输入姓名",
                    //       trigger: "blur",
                    //     },
                    //   ],
                    // },
                  },
                  {
                    label: "售卖数量:",
                    value: "stock_num",
                    el: "input",
                    props: {
                      rules: [
                        {
                          required: true,
                          message: "请输入姓名",
                          trigger: "blur",
                        },
                      ],
                    },
                  },
                  {
                    label: "sku编码:",
                    value: "sku_code",
                    el: "input",
                    props: {
                      rules: [
                        {
                          required: true,
                          message: "请输入姓名",
                          trigger: "blur",
                        },
                      ],
                    },
                  },
                ],
                [
                  {
                    label: "sku_attrs:",
                    value: "sku_attrs",
                    el: "towLevel",
                    multiple: true,
                    formList: [
                      [
                        {
                          label: "售卖价格:",
                          value: "attr_key",
                          el: "input",
                          isHidden: () => {
                            return false
                          },
                          props: {
                            rules: [
                              {
                                required: true,
                                message: "请输入姓名",
                                trigger: "blur",
                              },
                            ],
                          },
                        },
                        {
                          label: "售卖数量:",
                          value: "attr_value",
                          el: "custom",
                        },
                      ],
                    ],
                  },
                ],
              ],
            },
          ],
        ],
        formBtn: [
          {
            name: "保存",
            type: "primary",
            callBack: async (data) => {
              console.log(data);
            },
          },
          {
            name: "取消",
            type: "info",
            callBack: async (data) => {
              await this.$refs.myForm.resetFields();
            },
          },
        ],
      },
      setFormData: {
        title:
          "任天堂",
        // sub_title: "随时随地，一起趣玩。",
        // head_imgs: [
        //   "https://mmecimage.cn/p/wx37f38d59298839c3/HJE9eJaEc5bJk-eaArVdILSB7MMaHgdK2-JIn51nMQ",
        // ],
        // desc_info: {
        //   imgs: [
        //     "https://mmecimage.cn/p/wx37f38d59298839c3/HJE9eJaEc5bJk-eaArVdILSB7MMaHgdK2-JIn51nMQ",
        //   ],
        //   desc: "物美价廉",
        // },
        // cats: [
        //   {
        //     cat_id: "6033",
        //   },
        //   {
        //     cat_id: "6057",
        //   },
        //   {
        //     cat_id: "6091",
        //   },
        // ],
        // attrs: [
        //   {
        //     attr_key: "商品毛重",
        //     attr_value: "380g",
        //   },
        //   {
        //     attr_key: "商品产地",
        //     attr_value: "中国大陆",
        //   },
        // ],
        // express_info: {
        //   template_id: "47428464001",
        // },
        skus: [
          {
            sale_price: 1,
            stock_num: 222,
            sku_code: '111',
            sku_attrs: [
              {
                attr_key: "选择颜色",
                attr_value: "红蓝主机",
              },
              {
                attr_key: "选择套装",
                attr_value: "主机+保护套",
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
