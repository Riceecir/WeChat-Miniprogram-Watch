# WeChat Miniprogram Watch
微信小程序 watch 功能扩展 个人练手项目

## 说明
创建实例时会对 Page 构造函数做出修改，如果 Page 构造函数有修改过则需要手动传入；

## 使用方法
### App
创建 Watch 实例，会在 Page 中挂载 $watch
返回 $watch 方法
``` Javascript
const Watch = require('watch')
new Watch(Page)

// 或者

App({
  globalData: {
    $watch: new Watch(Page)
  }
})
```

### Page
传入Page构造函数的对象增加 watch 对象，默认会对 data 对象内容进行监听  

``` JavaScript
Page({
  data: {
    value: 0
    obj: {
      value: 0
    }
  },
  watch: {
    'value' (_new, _old) {
      // data.value 发生变化
    },

    'obj.value' (_new, old) {
      // data.obj.value 发生变化
    }
  },

  onLoad () {
    this.$watch(this.data, this.watch)
    // 或者
    this.$watch() // 默认根据页面栈最后一项的 watch 监听 data

    setTimeout(() => {
      this.setData({
        value: this.data.value + 1,  
        [ "obj.value" ]: this.data.obj.value + 1
      })
    }, 3000)
  }
})
```
