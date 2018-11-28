// 精度条
$( document ).ajaxStart(function() {
  // console.log(11);
  // 开启进度条
  NProgress.start();
})
$( document ).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
})


$(function(){
  $('.category').click(function() {
    $(this).next().stop().slideToggle();
  })


  $('.icon_left').on('click',function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
  })

  // 退出功能
    // 1.点击右侧按钮，显示莫泰框
  $('.icon_right').click(function(){
    $('#logoutModal').modal('show');
  })
    //2.点击退出模态框的退出按钮，完成退出功能
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })



})