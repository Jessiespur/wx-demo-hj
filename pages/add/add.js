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
    var val = this.data.content;
    var id = this.data.id;
    updateDate(this,id,val);
    wx.navigateBack()
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

function updateDate(page,id,val){
  var arr = wx.getStorage({
    key: 'txt',
    success: function(res) {
      var obj = {};
      obj.id = id;
      obj.content = val;
      obj.title = "title" + res.data.length+1;
      obj.time = Date.now();
      var objs = Object.assign({},res.data,obj);
      var arrs = new Array();
      arrs.push(objs);
      wx.setStorage({
        key: 'txt',
        data: arrs,
      })
      // res.data.push(obj);
      // console.log(JSON.stringify(obj))
    }
  })
}