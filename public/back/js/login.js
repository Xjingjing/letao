/**
 * Created by 静 on 2017/10/29.
 */

$(function(){
  $form = $('#form');
 $form.bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });
    //获取表单校验实例
    var validator = $form.data("bootstrapValidator");

    $form.on('success.form.bv',function(e){
    e = e || window.event;
    e.preventDefault();
    $.ajax({
      url:' /employee/employeeLogin',
      type:'POST',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(data){
        if(data.success){
          location.href = "index.html";
        }else if(data.error == 1000){
           validator.updateStatus('username','INVALID','callback');
        }else{
           validator.updateStatus('password','INVALID','callback');
        }
      }
    })
  })
});