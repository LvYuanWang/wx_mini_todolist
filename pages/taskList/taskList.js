// pages/taskList/taskList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: app.globalData.list,
    taskContent: "",
  },

  // 创建任务按钮
  addTaskBtn() {
    if (this.data.taskContent) {
      app.globalData.list.unshift({
        content: this.data.taskContent,
        isComplete: false
      })
      this.setData({
        listArr: app.globalData.list,
        taskContent: ""
      })
      wx.showToast({
        title: '任务添加成功',
        icon: "success"
      })
      wx.setStorageSync('todolistArr', app.globalData.list)
    } else {
      wx.showToast({
        title: '请输入内容',
        icon: "error"
      })
    }
  },

  // setTodoList
  setTodoList() {},

  // fresh
  fresh() {
    // 由子组件触发,更新当前页面的数据
    this.setData({
      listArr: app.globalData.list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    app.globalData.list = wx.getStorageSync('todolistArr') || [];
    this.fresh()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: "这是一个待办事项的小程序",
      path: "/pages/taskList/taskList",
      imageUrl: "/imgs/todolistImg.jpg"
    }
  }
})