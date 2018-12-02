$(function () {
  var currentPage = 1;
  var pageSize = 5;


  //1.渲染页面和分页功能
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('tmp', info);
        // console.log(htmlStr);
        $('tbody').html(htmlStr);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮
            currentPage = page;
            render();
          }
        });

      }
    })
  }

  //2.点击添加按钮，显示模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');
  })

  //3.表单验证
  $('#form').bootstrapValidator({
    // 指定校验时的图标显示
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 3.指定校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  })

  //阻止默认跳转
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    //4.点击添加按钮，提交后台，添加一级分类
    $.ajax({
      type: "post",
      url: '/category/addTopCategory',
      dataType: "json",
      data: $('#form').serialize(),
      success: function (info) {

        $('#addModal').modal('hide');
        currentPage = 1;
        render();
        $('#form').data("bootstrapValidator").resetForm(true);
      }
    })
  });

})