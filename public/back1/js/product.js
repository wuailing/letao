$(function () {
  var currentPage = 1;
  var pageSize = 2;
  var picAddr = []; //专门用于存储所有用于提交的图片对象

  //1.渲染页面
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
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

  //2.点击添加商品按钮，显示模态框
  $('#addBtn').on('click', function () {
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        var htmlStr = template('dropdownTmp', info);
        $('.dropdown-menu').html(htmlStr);

      }
    })
  })

  //3.点击下拉选项，获取里面的内容，赋值给button(事件委托)
  $('.dropdown-menu').on('click', 'a', function () {
    // console.log(111);
    var txt = $(this).text();
    $('.dropCate').text(txt);
    var id = $(this).data('id');
    $('#brandId').val(id);
    $("#form").data('bootstrapValidator').updateStatus('brandId', 'VALID');

  })

  //4.配置文件上传插件
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var picObj = data.result;

      picAddr.unshift(picObj);
      var picUrl = picObj.picAddr;
      console.log(picUrl);

      $('#imgBox').prepend('<img src=" ' + picUrl + ' " style="width: 100px;">');

      //如果长度超过3，需要将最好一个移除
      if (picAddr.length > 3) {
        console.log($('#imgBox img:last-of-type'));
        $('#imgBox img:last-of-type').remove();
      }

      if(picAddr.length === 3){
        $("#form").data('bootstrapValidator').updateStatus('picStatus', 'VALID');

      }


    }
  });

  //5.表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式，必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3图片'
          }
        }
      }


    }


  })

  //6.阻止默认跳转
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    var pic = $('#form').serialize();
    // paramsStr += "&picName1=xx&picAddr1=xx";
    pic += "&picName1=" + picAddr[0].picName + "&picAddr1=" + picAddr[0].picAddr;
    pic += "&picName1=" + picAddr[1].picName + "&picAddr1=" + picAddr[2].picAddr;
    pic += "&picName1=" + picAddr[2].picName + "&picAddr1=" + picAddr[2].picAddr;

    console.log(pic);
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: pic,
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        $('#addModal').modal('hide');
        $("#form").data('bootstrapValidator').resetForm(true);
        currentPage = 1;
        render();
      }
    })
  });




})