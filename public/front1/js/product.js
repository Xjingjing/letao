/**
 * Created by 静 on 2017/11/3.
 */


mui(".mui-scroll-wrapper").scroll({
  indicators:false
});



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
})