$(function () {
  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    /**
     * 验证用户名和密码
     */
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空',
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          }
        }
      }
    }

  })


  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        // console.log(info);
        if(info.error === 1000){
          alert('用户名不存在');
          return;
        }
        if(info.error === 1001){
          alert('密码错误');
          return;
        }
        if(info.success){
          location.href='index.html';
        }
      }
      
    })
  });
  
  //3.重置功能，本身重置按钮，就可以重置内容，需要额外的重置状态

  $('[type="reset"]').click(function(){
    $('#form').data("bootstrapValidator").resetForm();
  })

})