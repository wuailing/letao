$(function(){
  var key = getSearch("key");
  // console.log(key);
  $('.search_input').val(key);



  $('.search_btn').click(function(){

    render();
  })

  //点击排序的按钮，进行排序
  $('.lt_sort li[data-type]').on('click',function(){
    if($(this).hasClass('active')){
      $(this).find('i').toggleClass('fa fa-angle-down').toggleClass('fa fa-angle-up')
    }else{
      $(this).addClass('active').siblings().removeClass('active');
    }
    render();
  })

  render();
  function render(){
    $('.lt_product').html('<div class="loading"></div>');

    var obj = {};
    obj.proName = $('.search_input').val();
    obj.page = 1;
    obj.pageSize = 100;
    var $active = $('.lt_sort li.active');

    if($active.length === 1){
      //判断是升序还是降序
      var sortName = $active.data('type');
      // console.log(sortName);
      var sortValue = $active.find('i').hasClass('fa-angle-up')? '1' : '2';

      obj[sortName] = sortValue;
    }

    setTimeout(function(){
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:obj,
        dataType:'json',
        success:function(info){
          console.log(info);
          if(info.data.length == 0){
            $('.lt_product').html('<p>没有这样的产品</p>');
            
          }else{
            $('.lt_product').html( template('tmp', info) );
          }
        }
      })
    },1000)

  }

})