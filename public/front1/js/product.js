/**
 * Created by 静 on 2017/11/3.
 */


mui(".mui-scroll-wrapper").scroll({
  indicators:false
});



$(function(){
  var id = getParam().id;

  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    data:{
      id:id
    },
    success:function(data){
      var newArr = [];
      console.log(data);
      var arr = data.size.split('-');
      for(var i = arr[0];i<=arr[1];i++){
        newArr.push(i);
      }
      data.newArr = newArr;
      $('.mui-scroll').html(template('tpl',data));

      mui('.mui-slider').slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      mui(".mui-numbox").numbox();
    }
  });

  //选择尺码
  var size = '';
  $('.lt_content').on('click','.size_range',function(){
    $(this).addClass('now').siblings().removeClass('now');
    size = $(this).text();
  });

  //添加到购物车
  $('.add_cart').on('click',function(){
    var num = $('.mui-numbox-input').val();

    if(!size){
      mui.toast('请选择尺码');
      return;
    }

    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function(data){
        if(data.success){
          mui.toast('已成功加入购物车');
        }
        if(data.error == 400){
          location.href = 'login.html?retUrl='+location.href;
        }
      }
    })
  });
});