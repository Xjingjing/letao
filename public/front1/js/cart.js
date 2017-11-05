/**
 * Created by 静 on 2017/11/4.
 */

$(function(){

  //滚动弹回
  mui('.mui-scroll-wrapper').scroll({
    indicators:false
  });

  //下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",
      down : {
        auto: true,
        callback :render
      }
    }
  });

  //渲染购物车功能
  function render() {
    $.ajax({
      type:"get",
      url:"/cart/queryCart",
      success:function (data) {
        console.log(data);
        //获取数据花了1秒钟
        setTimeout(function () {
          console.log(data);
          isLogin(data);
          //渲染购物车
          $("#OA_task_2").html( template("tpl", {data:data}) );
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        }, 500);

      }
    });
  }

  //删除功能
  $('#OA_task_2').on('tap','.btn-del',function(){
    var id = $(this).data('id');
    mui.confirm('确定删除该商品吗？','亲~',['是','否'],function(e){
      if(e.index == 0){
        $.ajax({
          url:' /cart/deleteCart',
          type:'get',
          data:{
            id:[id]
          },
          success:function(data){
            isLogin(data);
            if(data.success){
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }else{
        mui.toast('操作取消');
      }
    })
  });


  //编辑商品
  $('#OA_task_2').on('tap','.btn-edit',function(){
    $this = $(this);
    var dataset = $this[0].dataset;
    console.log(dataset);
    var html = template('tpl2',dataset);
    html = html.replace(/\n/g,'');

    mui.confirm(html,'编辑商品',['确定','取消'],function(e){
      if(e.index == 0){
         $.ajax({
           url:'/cart/updateCart',
           type:'post',
           data:{
             id:dataset.id,
             size:$('span.now').html(),
             num:$('.mui-numbox-input').val()
           },
           success:function(data){
             if(data.success){
               mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
             }
           }
         })
      }else{
        mui.toast('操作取消');
      }
    });

    mui(".mui-numbox").numbox();
    $('.edit_pro_size').on('tap','span',function(){
      $(this).addClass('now').siblings().removeClass('now');
    })
  })

  //总额
  $(document).on('change','.ck',function(){
    var total = 0;
    $(':checked').each(function(i,e){
      total += $(this).data('price')*$(this).data('num');
       $('.total-price span').html(total);
    })
  })
});