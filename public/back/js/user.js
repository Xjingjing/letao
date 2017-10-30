/**
 * Created by 静 on 2017/10/30.
 */

$(function(){

  var currentpage = 1;
  var pagesize = 8;

  function render(){

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


