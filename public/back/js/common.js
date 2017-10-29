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