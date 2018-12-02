
$(function () {

  var currentPage = 1;
  var pageSize = 5;

  // 1.渲染页面
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
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

  //2.点击按钮，渲染下拉列表
  $('.btn_add').click(function () {
    $('#addModel').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmpCategory', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  //3.点击下拉按钮，将下拉项的值，赋值给按钮(因为是动态生成的，要用事件委托)
  $('.dropdown-menu').on('click', 'a', function () {
    // console.log(11);
    var txt = $(this).text();
    // console.log(txt);
    $('.drop_txt').html(txt);
    var id = $(this).data('id');
    $('#categoryId').val(id);
    //更新状态
    $('#form').data("bootstrapValidator").updateStatus('categoryId', 'VALID');

  })

  //4.图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var picUrl = data.result.picAddr;
      // console.log(picUrl);
      $('#imgBox img').attr('src', picUrl);
      $('#brandLogo').val(picUrl);
      //更新状态
      $('#form').data("bootstrapValidator").updateStatus('brandLogo', 'VALID');
    }
  });

  //5. 表单验证
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 指定校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  })

  //6.阻止默认跳转
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        $('#addModel').modal('hide');
        currentPage = 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
        $('.drop_txt').text('请选择一级分类');
        $('#imgBox img').attr('src','./images/none.png');
      }
    })
  });

})