$(function () {
  var currentPage = 1;
  var pageSize = 2;
  var picAddr = [];

  //1.渲染页面，和分页标签
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: "/product/queryProductDetailList",
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);
        // 分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
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
    // 渲染下拉框
    $.ajax({
      type: 'get',
      url: "/category/querySecondCategoryPaging",
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('dropdownTmp', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  //3.点击下拉框，将值赋值给下拉按钮(事件委托)
  $('.dropdown-menu').on('click', 'a', function () {
    // console.log(11);
    var txt = $(this).text();
    $('.secondCate').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);

    //手动修改状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  //4.文件上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result);
      var picObj = data.result;
      picAddr.unshift(picObj);
      console.log(picAddr);
      var picUrl = picObj.picAddr;
      $('.imgBox').prepend('<img src='+ picUrl +' alt="" width="100px">');
      
      if(picAddr.length > 3){
        $('.imgBox img:last-of-type').remove();
      }

      if(picAddr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picStorage','VALID');
      }

    }
  });

  //5.表单校验
  $('#form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //指定校验字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp: {
            regexp: /^[0-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      picStorage:{
        validators:{
          notEmpty:{
            message:'请上传3张照片'
          }
        }
      },
      

    }


  })

  //6.阻止默认跳转,通过ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var picAll = $('#form').serialize();
    console.log(picAll);
    picAll+'&picAddr1='+picAddr[0].picAddr+'&picName1='+picAddr[0].picName1;
    picAll+'&picAddr1='+picAddr[1].picAddr+'&picName1='+picAddr[1].picName1;
    picAll+'&picAddr1='+picAddr[2].picAddr+'&picName1='+picAddr[2].picName1;

    console.log(picAll);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:picAll,
      dataType:'json',
      success:function(info){
        console.log(info);
        $('#addModal').modal('hide');
        currentPage = 1;
        render();

        //重置表单
        $('#form').data('bootstrapValidator').resetForm(true);

        $('.secondCate').text('请选择二级分类');
        $('.imgBox img').attr('src','');
      }
    })
});

})