class Watch {
  constructor ($Page = Page) {
    this.page = 
    this.initPage($Page)

    return this.initWatch.bind(this)
  }

  /* 对 Page 构造器进行改造 */
  initPage ($Page) {
    Page = options => {
      options.$watch = this.initWatch.bind(this)
      return $Page(options)
    }
  }

  /* 初始化监听器 */
  initWatch (data = null, watch = null) {
    /* that: 调用监听回调函数时 this 指向页面栈最后一项 */
    let pages = getCurrentPages();
    this.page = pages[pages.length - 1];
    if (data === null) data = this.page.data
    if (watch === null) watch = this.page.watch
    if (data !== null && watch !== null) this.setWatch(data, watch)
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

  /* 监听 */
  observer (obj, key, callback) {
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
        callback.call(this.page, value, oldVal);
      }
    });
  }
}

module.exports = Watch;