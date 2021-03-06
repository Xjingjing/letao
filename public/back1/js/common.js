/**
 * Created by 静 on 2017/10/29.
 */

//验证用户是否登录
$(function(){
  if(location.href.indexOf('login.html') < 0){
       $.ajax({
         url:' /employee/checkRootLogin',
         type:'get',
         success:function(data){
           if(data.error === 400){
             location.href = 'login.html';
           }
         }
       })
  }
});

//进度条
$(function(){
  $(window).ajaxStart(function(){
    NProgress.start();
  });
  $(window).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },500);
  });
});

//分类管理
$(function(){
  $('.category').on('click',function(){
    $(this).children('div').slideToggle();
  })
});

//header按钮功能
$(function(){
  $('.lt_header span:first-child').on('click',function(){
    $('.lt_side').toggleClass('side_hide');
    $('.lt_header').toggleClass('big2');
    $('.lt_main').toggleClass('big1');
  });

  $('.lt_header span:nth-child(2)').on('click',function(){
   $('#lt_modal').modal('show');
  });

  $('.log_out').on('click',function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      success:function(data){
        if(data.success){
          location.href = 'login.html';
        }
      }
    })
  })
});