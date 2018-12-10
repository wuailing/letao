$(function(){

  //1.个人信息的动态渲染，发送ajax请求
    // （1）如果用户未登录，后台响应error，提示未登录，应// （2）该跳转到登录页，如果用户已登录，后台返回的是用户信息
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.error){
        location.href="login.html";
      }
      $('#userInfo').html( template('tmp',info) );
    }
  })

  $('#logout').on('click',function(){
    // console.log(11);
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })
})