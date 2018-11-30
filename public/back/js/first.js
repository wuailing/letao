$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();

  //1.渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $('#addBtn').click(function(){
    console.log(111);
    $('#addModel').modal('show');
  })


  //2.表格验证
  $('#form').bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {    // input框中需要配置 name
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });

  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault(); // 阻止默认的提交

    // 通过ajax提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 关闭模态框
          $('#addModel').modal("hide");
          // 重新渲染页面, 渲染第一页
          currentPage = 1;
          render();

          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })


})