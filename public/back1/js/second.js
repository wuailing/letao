$(function () {
  var currentPage = 1;
  var pageSize = 5;


  //1.渲染页面和分页
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        });

      }
    })
  }

  //2.点击添加分类按钮，显示模态框
  $('#addBtn').click(function () {
    // console.log(11);
    $('#addModal').modal('show');
    //3.点击分类按钮时候，渲染下拉框的内容
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
        var htmlStr = template('dropdownTmp', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  //4.点击下拉框的选项的时候，要将文本的内容赋值给下拉款按钮(要用事件委托的方法，因为是动态生成的)
  $('.dropdown-menu').on('click', 'a', function () {
    // console.log(111);
    var txt = $(this).text();
    $('.dropCate').html(txt);
    var id = $(this).data('id');
    console.log(id);
    $('#categoryId').val(id);

    //手动修改为校验成功
    $('#form').data("bootstrapValidator").updateStatus('categoryId', 'VALID');
  })

  //5.图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var picObj = data.result;
      var picUrl = picObj.picAddr;
      $('.img').attr('src', picUrl);
      $('#brandLogo').val(picUrl);

      // 手动修改图片的校验成功
      $('#form').data("bootstrapValidator").updateStatus('brandLogo', 'VALID');

    }
  });

  //6.表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请选择一张照片'
          }
        }
      },
    }
  })

  //7.阻止默认提交，使用ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        $('#addModal').modal('hide');
        currentPage = 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);

        // 手动重置不是表单的内容
        $('.dropCate').text('请选择一级分类');
        $('.img').attr('src','./images/none.png');
      }
    })
  });

})