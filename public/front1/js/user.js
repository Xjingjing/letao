/**
 * Created by 静 on 2017/11/4.
 */


$(function(){


  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(msg){
      isLogin(msg);
      $('.mui-media').html( template('tpl',msg) );
    }
  });


  $('.btn_logout').on('click',function(){
    mui.confirm('确定要退出登录吗？','提示',['是','否'],function(e){
      if(e.index == 0){
        $.ajax({
          url:'/user/logout',
          type:'get',
          success:function(msg){
            if(msg.success){
              location.href = "login.html";
            }
          }
        });
      }else{
        mui.toast('操作取消');
      }
    })
  })


});