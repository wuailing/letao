$(function(){

  //渲染一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr = template('leftTmp',info);
      $('.lt_cate_left').html(htmlStr);
      renderById(info.rows[0].id);
      // console.log(info.rows[0].id);
    }
  })

  // 渲染二级分类
  function renderById(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('rightTmp',info);
        $('.lt_cate_right').html(htmlStr);
      }
    })
  }

  //点击a，渲染当前一级分类的二级分类，给a加类，使其高亮(事件委托)
  $('.lt_cate_left').on('click','a',function(){
    // console.log(11);
    $('.lt_cate_left a').removeClass('active');
    $(this).addClass('active');
    var id = $(this).data('id');

    renderById(id);

  })
  
})