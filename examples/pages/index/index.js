//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    input: {
      name: '',
      age: 0
    },
  },
  watch: {
    'input.name' (_new, _old) {
      console.log('name 变更: ', _new)
    }
  },

  inputValue (e) {
    this.setData({
      ['input.name']: e.detail.value
    })
  },

  onLoad: function () {
    this.$watch(this.data, this.watch)
  }
})
