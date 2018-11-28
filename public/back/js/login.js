$(function () {
  /*
    1.进行表单校验配置
      校验要求：
        用户名不能为空，查毒为2-6位
        密码不能为空，长度为6-12位
  */
  $('#form').bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段   (给input设置 name 值)
    fields: {
      // 用户名
      username: {
        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "请输入用户名"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },

      // 密码
      password: {
        validators: {
          notEmpty: {
            message: "请输入密码"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }


  });

  /*
    2.校验成功后，会触发一个事件，表单校验成功事件
      默认是会提交表单的，页面就跳转了
      我们需要注册表单验证成功事件，在成功事件中，阻止默认事件
  */
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
          return;
        }
        if (info.error === 1001) {
          // alert('密码错误');
          $('#form').data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
          return;
        }
        if (info.success) {
          location.href = 'index.html';
        }
      }
    })
  });

  /**
   * 3.重置功能，本身重置按钮
   * 
   */
  $('[type="reset"]').click(function(){
    $('#form').data("bootstrapValidator").resetForm();
  })

})