$(function(){
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        console.log(info);
        $('.lt_main .mui-scroll').html( template('tmp',{list : info}) );
      }
    })
  }


  //删除购物车的信息
  $('.lt_main').on('click','.btn_delete',function(){
    // console.log(11);
    var id = $(this).parents('li').data('id');
    // console.log(id);
    delRender();
    function delRender(){
      $.ajax({
        type:'get',
        url:'/cart/deleteCart',
        dataType:'json',
        data:{
          id:id
        },
        success:function(info){
          console.log(info);
          render();
        }
      })
    }
  })

})