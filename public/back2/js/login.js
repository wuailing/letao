$(function () {
  /*
    1.进行表单校验配置
      校验要求：
        （1）用户不能为空，长度为2-6位
        （2）密码不能为空，长度为6-12位
  */
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '请输入用户名'
          },
          stringLength: {
            min: 2,
            nax: 6,
            message: "用户长度必须是2-6位"
          },
          callback: {
            message: '用户名不存在'
          }
        }

      },
      password: {
        validators: {
          notEmpty: {
            message: '请输入密码'
          },
          stringLength: {
            min: 6,
            nax: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message:'密码错误'
          }
        }

      }
    }


  });
  

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error === 1000){
        $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        return;
        }
        if(info.error === 1001){
        $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
        return;
        }
        if(info.success){
          location.href='index.html';
        }
      }
    })
  });

  $('[type="reset"]').click(function(){
    console.log(111);
    $('#form').data("bootstrapValidator").resetForm();
  })



})