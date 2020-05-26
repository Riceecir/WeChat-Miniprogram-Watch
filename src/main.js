class Watch {
  constructor () {
    const $Page = Page
    Page = function (options) {
      if (options.watch) {
        this.setWatch(options.data, options.watch)
      }

      return $Page(options)
    }
  }

  /** 设置watch属性监听
   * data: 监听数据
   * watch: 监听回调函数对象的合集 (类似vue.watch)
   */
  setWatch (data, watch) {
    Object.keys(watch).forEach(key => {
      /* 用于深度监听 */
      let newKey = key.split('.');
      let newData = data;
      for (let i = 0; i < newKey.length - 1; i++) {
        newData = newData[newKey[i]];
      }
      this.observer(newData, newKey[newKey.length - 1], watch[key]);
    });
  }
  
  observer (obj, key, callback) {
    /* that: this 指向页面栈最后一项 */
    let pages = getCurrentPages();
    let that = pages[pages.length - 1];
    let val = obj[key];
    let oldVal = '';
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val;
      },
      set: function (value) {
        oldVal = val;
        val = value;
        callback.call(that, value, oldVal);
      }
    });
  }
}

module.exports = Watch;