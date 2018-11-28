// 进度条
$(document).ajaxStart(function(){
  // console.log(111);
  NProgress.start();
})

$( document ).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500)
});


$(function(){
 
  //1、分类页的二级菜单下拉切换
  $('.category').on('click',function(){
   $(this).next().slideToggle();
  })

  //2、点击左边的图标，侧边栏隐藏
  $('.icon_menu').on('click',function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })

  // 3.点击头部的右边的按钮，显示显示模态框
  $('.icon-right').click(function(){
    $('#myModal').modal("show");
  })

  //4.点击退出按钮
  $('.exit').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
    
})