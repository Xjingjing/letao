/**
 * Created by 静 on 2017/11/4.
 */


$(function(){

  $('[type=button]').on('click',function(){
    var username = $('[type=text]').val();
    var password = $('[type=password]').val();

    if(!username){
      mui.toast('请输入用户名');
      return;
    }
    if(!password){
      mui.toast('请输入密码');
      return;
    }

    $.ajax({
      url:' /user/login',
      type:'post',
      data:{
        username:username,
        password:password
      },
      success:function(data){
        console.log(data);
        if(data.error){
          mui.toast(data.message);
        }
        if(data.success){
          var search = location.search;
          if(search.indexOf('retUrl') > -1){
            search = search.replace("?retUrl=","");
            location.href = search;
          }else{
            location.href = "user.html";
          }
        }
      }
    })
  })

});