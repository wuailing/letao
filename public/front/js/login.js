$(function(){
  //登录验证
  $('#loginBtn').on('click',function(){

    var username = $('input[type="text"]').val().trim();
    var password = $('input[type="password"]').val().trim();
    // console.log(username,password);
    // 如果用户名和密码没输入，直接中断
    if(username === ''){
      mui.toast('用户名不能为空');
      return;
    }
    if(password === ''){
      mui.toast('密码不能为空');
    }

    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          if(location.search === ""){
            location.href = "user.html";
          }else{
            var retUrl = location.search.replace("?retUrl=","");
            location.href = retUrl;
          }
        }
        if(info.error === 403){
          mui.toast(info.message);
          return;
        }
      }
    
    })
  })
  

})
