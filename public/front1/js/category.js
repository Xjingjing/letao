/**
 * Created by 静 on 2017/11/1.
 */
$(function(){

  var sc = mui('.mui-scroll-wrapper').scroll({
    indicators:false
  });


  //查询一级分类
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    success:function(data) {
      $('.top_cate ul').html(template('tpl', data));
      var res = $('.top_cate ul li')[0];
      var fid = $(res).data('id');
     render(fid);
    }
  });


  $('.top_cate ul').on('click','li',function(){
    $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data('id');
    render(id);
    sc[1].scrollTo(0,0,500);
  });

  function render(id){
    $.ajax({
      url:' /category/querySecondCategory',
      type:'get',
      data:{
        id:id
      },
      success:function(data){
        $('.second_cate ul').html(template('tpl1',data));
      }
    })
  }


});

