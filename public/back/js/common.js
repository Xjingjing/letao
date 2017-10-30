/**
 * Created by 静 on 2017/10/29.
 */

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