$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var id;
  var isDelete;

  //1.渲染
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        var htmlStr = template('tmp',info);
        $('tbody').html(htmlStr);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total / info.size),//总页数
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
            currentPage = page;
            // console.log(currentPage);
            render();
          }
        });
      }
    })
  }

  //2.点击显示模态框 修改内容
  $('tbody').on('click','button',function(){
    // console.log(11);
    id = $(this).parent().data('id');
    isDelete = $(this).parent().data('delete') == 0 ? 1 : 0;
    // console.log(isDelete);
    // console.log(id);
    $('#updateModal').modal('show');

    $('#submitBtn').click(function(){
      // console.log(11);
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        dataType:'json',
        success:function(info){
          $('#updateModal').modal('hide');
          render();
        }
      })
    })
  })


  
  
})