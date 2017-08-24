Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opts) {
    var id = opts.id;
    if(id){
      getData(id,this);
    }else{
      this.setData({
        id:Date.now()
      })
    }
  },
  inputHandle(e){
    var value = e.detail.value;
    this.setData({
      content:value
    })
  },
  sureHandle(){
    var re = /^\s*$/g
    if(!this.data.content || re.test(this.data.content)){
      wx.showModal({
        title: '请输入文字',
      })
      return;
    }else{
      updateDate(this)
      wx.navigateBack()
    }
  },
  cancelHandle(){
    wx.navigateBack()
  }

})

function getData(id,page){
  var arr = wx.getStorageSync('txt');
  if(arr.length){
    arr.forEach((item)=>{
      if(item.id == id){
        page.setData({
          id: item.id,
          content: item.content
        })
      }
    })
  }
}

function updateDate(page){
  var arr = wx.getStorageSync('txt');
  if(arr){
    var hasDate = arr.some((item) => item.id == page.data.id);
    if (hasDate) {
      arr.forEach((item) => {
        if (item.id == page.data.id) {
          item.content = page.data.content
          item.time = Date.now()
        }
      })
    } else {
      var count = arr.length + 1;
      var obj = {};
      obj.id = page.data.id;
      obj.content = page.data.content;
      obj.title = "title" + count;
      obj.time = Date.now();
      arr.push(obj);
    }
  }
  wx.setStorage({
    key: 'txt',
    data: arr,
  })
}
