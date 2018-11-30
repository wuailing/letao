$(function () {
  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;

  render();

  //1。渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function( info ) {
        // console.log( info );
        // template(模板id, 数据对象), 在模板中可以任意使用传进去对象中的所有属性
        var htmlStr = template("tmp", info)
        $('tbody').html( htmlStr );

        //2. 在ajax请求回来后, 根据最新的数据, 进行初始化分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          currentPage: info.page, // 当前页
          totalPages: Math.ceil( info.total / info.size ), // 总页数
          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // console.log( page );
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }

  $('tbody').on('click','button',function(){
    // console.log(11);
    //3.显示模态框
    $('#editorModel').modal('show');

    //4.点击确定按钮，发出ajax请求
    currentId = $(this).parent().data('id');
    // console.log(currentId);
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  });
  $('#confirmBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      dataType:'json',
      data:{
        id:currentId,
        isDelete:isDelete
      },
      success:function(info){
        $('#editorModel').modal('hide');
        render();
      }
    })
  });

  
})