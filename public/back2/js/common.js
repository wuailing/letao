// 1.进度条
$(document).ajaxStart(function(){
  NProgress.start();
})

$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
})

$(function(){
  // 2.头部点击左侧菜单，切换侧边栏
  $('.icon_menu').on('click',function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })

  // 3.切换二级菜单
  $('.category').on('click',function(){
    $(this).next().stop().slideToggle();
  })

  // 4.头部点击右侧的按钮，显示模态框
  
  $('.icon_logout').on('click',function(){
    // console.log(111);
    $('#myModal').modal('show');
  })

  $('.exit').on('click',function(){
    // console.log(11);
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
})
