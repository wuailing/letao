$(function () {
  //1.获取存储的search_list 进行渲染
  //2.删除单个搜索历史
  //3.删除所有的搜索历史
  //4.添加单个搜索历史

  //1.功能一：获取所有的搜索历史,渲染页面
  //从后台获取json字符串，再转成数组
  render();
  function getArr() {
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  function render() {
    var arr = getArr();
    var htmlStr = template('historyTmp', { list: arr });
    $('.lt_history').html(htmlStr);
  }

  // 2.功能二：删除所有的搜索历史
    //点击删除所有按钮,删除所有
  $('.lt_history').on('click','.search_empty',function(){
    // console.log(111);
    mui.confirm('你确定要清空历史记录吗?','温馨提示',['取消','确定'],function(e){
      // console.log(e);
      if(e.index === 1){
        localStorage.removeItem('search_list');
        render();
      }
    })
  })

  //3.功能三：点击删除，删除当前的记录
  $('.lt_history').on('click','.btn_delete',function(){
    // console.log(11);
    var arr = getArr();
    var index = $(this).data('index');
    // console.log(arr,index);
    arr.splice(index,1);
    // console.log(arr);
    //再转成json字符串，存入
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonStr);
    // console.log(localStorage);
    // 重新渲染
    render();
  })

  //4.功能四：点击搜索按钮，添加搜索历史
  $('.search_btn').on('click',function(){
    
    // console.log(11);
    var txt = $('.search_input').val().trim();
    // console.log(txt);
    if(txt === ''){
      mui.toast('请输入搜索关键字')
      return;
    }
    var arr = getArr();

    //有重复的项，先将重复的项删除，再在最前面添加
    var index = arr.indexOf(txt);
    if(index !== -1){
      arr.splice(index,1);
    }
    //如果超过10个，保留最前面的，删除最后一个
    if(arr.length == 10){
      arr.pop(arr.length - 1);
    }
    // console.log(arr);
    // 向前面添加数据
    arr.unshift(txt);
    //转成json字符串
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem('search_list',jsonStr);
    render();
    $('.search_input').val('');
    location.href="searchList.html?key=" + txt;
  })

})