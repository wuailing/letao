$(function () {
  var id = getSearch('productId');
  console.log(id);
  //1.渲染
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.lt_main .mui-scroll').html(template('tmp', info));

        //初始化轮播图
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；

        });

        //数字框初始化
        mui('.mui-numbox').numbox()
      }
    })
  }

  //2.给尺码添加可选功能
  $('.lt_main').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })

  //3.点击加入购物车，如果没有登录，就调到登录页，否则调到购物车页面

  $('#addCart').on('click',function(){
    //必须选了尺码的时候，才可以加入购物车
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();
    console.log(size,num);
    if(size === null){
      mui.toast('请选择尺码');
      return;
    }

    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:id,
        num:num,
        size:size
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error){
          location.href = "login.html?retUrl="+location.href;
        }
        if(info.success){
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function( e ) {
            // e.index 就是点击的按钮的下标
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }
          })
        }
      }
    })

  })


})