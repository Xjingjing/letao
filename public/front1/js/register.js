/**
 * Created by 静 on 2017/11/5.
 */

$(function(){

  //点击发送验证码
  $('.send-code').on('click',function(){
    $this = $(this);
    if($this.hasClass('send')){
      return;
    }
    $this.text('正在发送中...').addClass('send');

    $.ajax({
      url:'/user/vCode',
      type:'get',
      success:function(data){
        var code = data.vCode;
        console.log(code);
        var count = 5;
        var timer = setInterval(function(){
          count--;
          $this.html(count+"秒后再次发送");
          if(count<=0){
            $this.html('再次发送').removeClass('send');
            clearInterval(timer);
          }
        },1000)
      }
    })


  });

  //点击注册
  $('.btn-regist').on('click',function(){
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    var repassword = $('[name=repassword]').val();
    var mobile = $('[name=mobile]').val();
    var vCode = $('[name=vCode]').val();

    if(!username){
      mui.toast('请输入用户名');
      return;
    }
    if(!password){
      mui.toast('请输入密码');
      return;
    }
    if(!repassword){
      mui.toast('请输入确认密码');
      return;
    }
    if(!mobile){
      mui.toast('请输入手机号');
      return;
    }
    if(!vCode){
      mui.toast('请输入验证码');
      return;
    }
    if(password != repassword){
      mui.toast('两次输入密码不一致');
      return;
    }

    if(!/^\d{6}$/.test(vCode)){
      mui.toast('请输入有效的验证码');
      return;
    }

    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast('请输入有效的手机号');
      return;
    }

    $.ajax({
      url:'/user/register',
      type:'post',
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function(data){
        if(data.success){
          mui.toast('注册成功，请登录');
          setTimeout(function(){
            location.href = 'login.html';
          },1000);
        }else{
          mui.toast(data.message);
        }
      }
    })
  })

});