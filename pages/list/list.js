var time = require("../../utils/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: '1',
        content: "hello",
        title: "titleOne",
        time: Date.now()
      },
      {
        id: 2,
        content: "hejuan",
        title: "titleTwo",
        time: Date.now(),
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  listHandle(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../add/add?id='+ id,
    })
  },
  addHandle(e){
    wx.navigateTo({
      url: '../add/add',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

function initData(page){
  if (!wx.getStorageSync('txt')){
    wx.setStorageSync('txt', page.data.lists);
  }
  var arrLists = wx.getStorageSync('txt');
  if(arrLists.length){
    arrLists.forEach((item, i) => {
      var t = new Date(Number(item.time));
      item.time = time.formatTime(t);
    });
    var t = new Date(Number(Date.now()));
    page.setData({
      lists: arrLists,
      time: time.formatTime(t)
    })
  }
}