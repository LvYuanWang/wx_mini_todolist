const app = getApp();
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除任务
    deleteTask() {
      wx.showModal({
        title: '确认删除',
        content: '是否删除该任务?',
        success: res => {
          if (res.confirm) {
            const item = this.properties.item;
            const index = app.globalData.list.findIndex(i => i.content === item.content)
            app.globalData.list.splice(index, 1);
            wx.showToast({
              title: '删除成功',
              icon: "success"
            })
            this.triggerEvent("fresh");
            // 将所有任务保存在本地
            wx.setStorageSync('todolistArr', app.globalData.list)
          }
        }
      })
    },
    // tapCheckbox
    tapCheckbox() {
      const item = this.properties.item;
      const listItem = app.globalData.list.filter(i => {return i.content === item.content})[0];
      listItem.isComplete = !listItem.isComplete;
      if (listItem.isComplete) {
        wx.showToast({
          title: '标记【完成】',
          icon: "success"
        })
      } else {
        wx.showToast({
          title: '标记【未完成】',
          icon: "success"
        })
      }
      this.setData({
        item: {
          isComplete: !item.isComplete
        }
      })
      // 触发父组件的 fresh 事件,从而更新页面的 list
      this.triggerEvent("fresh");
      // 将所有任务保存在本地
      wx.setStorageSync('todolistArr', app.globalData.list)
    }
  },
})