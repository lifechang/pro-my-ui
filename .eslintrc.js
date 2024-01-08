// eslint配置文件，详细规则说明请参考eslint官方文档

module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    /* 开发环境下，可以忽略以下规则 */
    // 不允许使用 console
    "no-console": 1,
    // 不允许使用 alert confirm prompt
    "no-alert": 1,
    // "parser": "vue-eslint-parser",
    /* 开发环境下也不能忽略的规则 */
    // for 循环必须朝向正确方向
    "for-direction": 2,
    // Object.defineProperty 的 get 必须有返回值
    "getter-return": 2,
    // 禁止重复的异步函数（即 Promise 的执行函数是 async 函数）
    "no-async-promise-executor": 2,
    // 循环中禁止使用 await
    "no-await-in-loop": 2,
    // 条件表达式禁止赋值操作，例如 if (a = 1)
    "no-cond-assign": 2,
    // 条件表达式禁止使用常量作为判断条件，例如 if (true)
    "no-constant-condition": 2,
    // 禁止在正则表达式中出现控制字符
    "no-control-regex": 2,
    // 禁止使用 debugger
    "no-debugger": 2,
    // 函数不能有多个名字相同的参数
    "no-dupe-args": 2,
    // 对象不能有多个名字相同的键
    "no-dupe-keys": 2,
    // switch 不能有多个相同的 case
    "no-duplicate-case": 2,
    // 禁止空的语句块
    "no-empty": 2,
    // 禁止正则表达式出现空字符集，例如 /^abc[]/
    "no-empty-character-class": 2,
    // 禁止对 catch 的参数重新赋值
    "no-ex-assign": 2,
    // 禁止不必要的布尔转换，例如 let x = !!!x
    "no-extra-boolean-cast": 2,
    // 禁止出现多余的分号
    "no-extra-semi": 2,
    // 禁止对用 function 声明的函数（不包括匿名函数）重新赋值
    "no-func-assign": 2,
    // 禁止在 if while for 之类的嵌套语句块中使用 function 声明函数（不包括匿名函数）
    "no-inner-declarations": 2,
    // 禁止 RegExp 构造函数出现无效的正则表达式
    "no-invalid-regexp": 2,
    // 禁止不规则的空白，例如使用 ASCII = 160 的 NBSP 而不是 ASCII = 32 的空格
    "no-irregular-whitespace": 2,
    // 禁止使用 Unicode 字符作为正则表达式的内容
    "no-misleading-character-class": 2,
    // 禁止把全局对象当做函数使用，例如 let x = Array()
    "no-obj-calls": 2,
    // 禁止正则表达式出现多个空格
    "no-regex-spaces": 2,
    // 禁止稀疏数组，例如 [1, 2, 3, , 4, 5]
    "no-sparse-arrays": 2,
    // 禁止标准字符串中出现模板字符串的模板语句，例如 'value is ${value}'
    "no-template-curly-in-string": 1,
    // 禁止不合理的多行表达式，规则说明详见 ESLint 规则文档
    "no-unexpected-multiline": 2,
    // 禁止 return 之后还有其它语句
    "no-unreachable": 2,
    // 条件表达式的左边禁止使用否定，例如 if (!x === someValue)
    "no-unsafe-negation": 2,
    // 禁止不安全的 await
    "require-atomic-updates": 2,
    // 对 NaN 进行判断必须使用 isNaN 函数
    "use-isnan": 2,
    // typeof 判断的类型必须有意义
    "valid-typeof": 2,
    // 允许使用 var，但必须和 let const 一样遵循变量作用域的规则
    "block-scoped-var": 2,
    // 一个方法的复杂度不能超过 20，复杂度按照 if 分支，与或非运算等计算
    complexity: 1,
    // 不允许使用单行的 if else for 语句
    curly: 1,
    // 每个 switch 必须包含一个 default
    "default-case": 1,
    // (划重点) 请尽量使用 === 代替 ==  使用 !== 代替 !=
    eqeqeq: 2,
    // 禁止出现空的函数
    "no-empty-function": 2,
    // 禁止出现空的解构赋值语句，例如 let [] = [1, 2, 3, 4, 5, 6]
    "no-empty-pattern": 2,
    // 禁止使用 == 判断 null
    "no-eq-null": 2,
    // 禁止使用 eval 函数
    "no-eval": 2,
    // 禁止对原生类型做任何修改
    "no-extend-native": 2,
    // 禁止不合理的 bind 函数
    "no-extra-bind": 2,
    // 禁止含有语句块的 case 不带 break 或 return 中的任何一个
    "no-fallthrough": 2,
    // 禁止小数点左边或右边不带数字，例如 .2
    "no-floating-decimal": 2,
    // 禁止对原生对象赋值
    "no-global-assign": 2,
    // 禁止使用短符号转换类型，例如 123456 + ''
    "no-implicit-coercion": 1,
    // 禁止使用类似 eval 函数的方法
    "no-implied-eval": 2,
    // 循环变量如果是用 var 定义的，这个循环里就不能出现任何函数定义
    "no-loop-func": 2,
    // 禁止缩进以外使用多余的空格
    "no-multi-spaces": 1,
    // 禁止使用多行字符串，如果需要应该使用模板字符串代替
    "no-multi-str": 2,
    // 禁止创建包装类对象
    "no-new-wrappers": 2,
    // 禁止使用 __proto__ 属性
    "no-proto": 2,
    // 禁止重定义变量
    "no-redeclare": 2,
    // 有些对象的属性和方法已被弃用，禁止使用这些弃用的属性和方法
    "no-restricted-properties": 2,
    // 禁止在 return 中使用赋值语句
    "no-return-assign": 2,
    // 禁止 async 函数返回 await [some statement]
    "no-return-await": 2,
    // 禁止使用 Javascript:url 语句
    "no-script-url": 2,
    // 禁止自我赋值，例如 x = x
    "no-self-assign": 2,
    // 禁止自我比较，例如 x === x
    "no-self-compare": 2,
    // 禁止使用逗号表达式
    "no-sequences": 2,
    // 禁止循环变量永远不变
    "no-unmodified-loop-condition": 2,
    // 禁止没有意义的语句和难以理解的表达式，其中三元表达式除外
    "no-unused-expressions": [
      2,
      {
        allowTernary: true,
      },
    ],
    // 禁止不合理的 call 方法和 apply 方法
    "no-useless-call": 2,
    // 禁止不合理的 catch 语句
    "no-useless-catch": 2,
    // 禁止常量字符串相加，例如 'abcdef' + '123456'
    "no-useless-concat": 2,
    // 禁止不合理的转义字符
    "no-useless-escape": 2,
    // 禁止不必要的 return
    "no-useless-return": 2,
    // 禁止使用 void
    "no-void": 2,
    // 即使变量在不同的作用域内，也不能同名
    "no-shadow": 1,
    // 禁止非法的变量名字
    "no-shadow-restricted-names": 2,
    // 禁止没有定义就使用变量
    "no-undef": 2,
    // 禁止定义使用不到的变量
    "no-unused-vars": 1,
    // 禁止在变量定义之前就使用
    "no-use-before-define": 2,

    /* 以下是一些代码风格规则 */
    // 数组的括号换行要一致
    "array-bracket-newline": [1, "consistent"],
    // 除了末尾的花括号其它的不能独立成行
    "brace-style": 1,
    // 逗号不能在一行的最前面
    "comma-style": 2,
    // 必须用 that 作为 this 的替代，而且 that 只能用来替代 this
    "consistent-this": 2,
    // 调用函数时函数名和括号之间不能有空格
    "func-call-spacing": 1,
    // 函数参数的括号换行要一致
    "function-paren-newline": [1, "consistent"],
    // 不带花括号的箭头函数的函数体之前不能换行
    "implicit-arrow-linebreak": 2,
    // 缩进使用 4 个空格
    indent: [0, 4],
    // 要求对象必须以这个格式去写 {key: value}，冒号前面没有空格，冒号后面带一个空格
    "key-spacing": 1,
    // 要求 let if else for 之类的关键字和其它代码之间必须要有一个空格
    "keyword-spacing": 1,
    // 类成员之间必须要有一个空行
    "lines-between-class-members": 1,
    // 注释不能和代码写在同一行
    "no-inline-comments": 1,
    // 如果 else 里面只有 if，应该写成 else if
    // "no-lonely-if": 0,
    // 连续的空行不应该超过两行
    "no-multiple-empty-lines": 1,
    // 禁止使用 Object 构造函数
    "no-new-object": 2,
    // 如果某一行有代码或注释，这一行的末尾不能带有空格或 tab
    "no-trailing-spaces": [
      1,
      {
        skipBlankLines: true,
      },
    ],
    // 使用对象属性的点前后不能有空格，例如 this. name 就是不正确的
    "no-whitespace-before-property": 2,
    // 操作符 + - * / = 之类的不能在一行的最前面
    "operator-linebreak": 1,
    // 语句块的首尾不能是空行
    "padded-blocks": [1, "never"],
    // 分号不能在一行的最前面
    "semi-style": 2,
    // 语句块之前必须有一个空格
    "space-before-blocks": 1,
    // 操作符 + - * / = 如果在操作数据的中间，前后必须有一个空格
    "space-infix-ops": 1,
    // 文本型一元操作符（例如 new delete typeof 等）与操作对象之间必须有一个空格，非文本型（例如 + - ! 等）不能有空格
    "space-unary-ops": 1,
    // 注释符号与内容之间必须有空格
    "spaced-comment": 1,
    // 要求case必须以这个格式去写 case 0: ...，冒号前面没有空格，冒号后面带一个空格
    "switch-colon-spacing": 1,

    /* 以下是关于ES6的一些规则 */
    // 箭头函数的参数必须带有括号
    "arrow-parens": 2,
    // 箭头函数的箭头前后必须有一个空格
    "arrow-spacing": 2,
    // 禁止对类赋值
    "no-class-assign": 2,
    // 禁止修改 const 变量
    "no-const-assign": 2,
    // 禁止类成员有重复的名称
    "no-dupe-class-members": 2,
    // 来自于同一个模块的内容必须写在同一个 import 里面
    "no-duplicate-imports": 1,
    // 构造函数中如果有 super()，在 super() 之前禁止有其它语句
    "no-this-before-super": 2,
    // 使用import export和解构赋值时禁止使用类似于 sth as sth 这样的无意义的as
    "no-useless-rename": 2,
    // 只要键值可以被简写，就应该简写，例如 let o = {sth: sth} 应该被写成 let o = {sth}
    "object-shorthand": 2,
    // 剩余参数必须使用 ...rest 而不是 arguments
    "prefer-rest-params": 2,
    // 函数调用剩余参数必须使用 ...params 而不是 apply 方法
    "prefer-spread": 2,
    // 使用模板字符串代替 + 连接字符串，例如 let text = 'Hello' + someText 应该被写成 let text = `Hello${someText}`
    "prefer-template": 2,
    // 使用剩余参数时禁止在 ... 后面带有空格
    "rest-spread-spacing": 2,
    // 创建 Symbol 必须要有描述
    "symbol-description": 2,
    // 禁止模板字符串的花括号内首尾带有空格
    "template-curly-spacing": 2,

    /* 以下是vue的规则 */
    "vue/no-parsing-error": 0,
    "vue/multi-word-component-names": 0,
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: true, allowTernary: true },
    ],
  },
};
