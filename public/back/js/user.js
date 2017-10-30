/**
 * Created by 静 on 2017/10/30.
 */

$(function(){
  $.ajax({
    url:'/user/queryUser',
    type:'get',
    data:{
      page:1,
      pageSize:5
    },
    success:function(data){
      console.log(data);
      var html = template('tpl',data);
      $('.lt_main tbody').html(html);
    }
  });

});


