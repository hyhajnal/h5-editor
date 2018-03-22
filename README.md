
### 平台描述

开发流程：模块UI + js逻辑（前端）-> 生成一个模块 -> 搭建页面 -> 发布

定位：只负责模块UI搭建，以一个模块为单位

限制：只针对于 vue；移动端

### 制定标准 (dpl)
用于一个页面的多个模块保持统一

* 公共class


https://github.com/ant-design/ant-design/blob/master/components/style/core/base.less


* 公共变量

https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

``` 
圆角、主题色...
```
    
### 组件资源
#### 1. 元件
* html自带标签（tag）
* 第三方开源组件（tag+prop）

#### 2. 组件模版
* 定义：通过拖拽 + 元件 + prop ＝ 组件
* 描述：JSON 文档，可嵌套引入再编辑
* 嵌套引入：作为一个vue组件引入，\<com-\*>\</com-*>
* 再编辑：将该组件json，导入至对应元素下的 children 下

### 预览导出
#### 1. 导出 -> 返回 html -> 预览
* 后端模版 eg.jade
    * normalize.css, common.css; 
    * 编译后的html插入body，编译后的css外链引入; 
    * rem适配的js
* 生成二维码

```
说明：快速预览（前端）  正式预览（后台返回）＋ iframe
```

#### 2. 代码复制

``` vue
<template>
    <comp-1></comp-1>
    <div>
        <comp-2></comp-2>
    </div>
</template>


<script>
    export default {
        name: 'Module-1',
        data () {
            return {}
        }
    }
</script>

<style scoped>
    /* 只包含该模块的css，不包含com-1、com-2的css */
</style>
```

#### 3. 该模块引用的组件列表
点击，加载对应的组件进行 **快速预览**


#### 4. 实现

vuex -> page componet -> styleStr => styleObj -> prop -> attr

attr -> styleObj => styleStr -> vuex

drag -> child position

attr = style + prop


