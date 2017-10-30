/**
 * Created by 静 on 2017/10/30.
 */

$(function(){

  var currentpage = 1;
  var pagesize = 8;

  function render(){

    //ajax请求数据
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page:currentpage,
        pageSize:pagesize
      },

      success:function(data){
        console.log(data);
        var html = template('tpl',data);
        $('.lt_main tbody').html(html);


        //禁用，启用功能
        $('table button').on('click',function(){
          var that = $(this);
          var id = $(this).parent().data()['id'];
          var isDelete = $(this).html() == "禁用"? 0:1;
          $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
              id:id,
              isDelete:isDelete
            },
            success:function(data){
              if(data.success){
                if(isDelete == 0){
                  that.html('启用').removeClass('btn-danger').addClass('btn-primary').parent().prev().html('禁用');

                }else{
                  that.html('禁用').removeClass('btn-primary').addClass('btn-danger').parent().prev().html('启用');

                }
              }
            }
           })
        });

        //分页配置
        $('#pagintor').bootstrapPaginator({
          numberOfPages:5,
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentpage,//当前页
          totalPages:Math.ceil(data.total/pagesize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
           render();
          }
        });
      }

    });

  }
 render();
});


