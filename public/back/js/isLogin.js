$.ajax({
  type:'get',
  url:'/employee/checkRootLogin',
  success:function(info){
    if(info.success){
      console.log('此用户已登录');
    }
    if(info.error === 400){
      location.href = 'login.html';
    }
  }
})