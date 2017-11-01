/**
 * Created by 静 on 2017/10/31.
 */

$(function(){

  var nowPage = 1;
  var pageSize = 2;
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:nowPage,
        pageSize:pageSize
      },
      success:function(data){
        $('tbody').html(template('tpl1',data));

        //分页配置
        $('#pagintor').bootstrapPaginator({
          numberOfPages:5,
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:nowPage,//当前页
          totalPages:Math.ceil(data.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            nowPage = page;
            render();
          }
        });
      }
    });

  }
  render();

  $('.addCate').on('click',function(){
    $('#add_modal').modal('show');
  });


  $cateform = $('form');
  $cateform.bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级类名'
          }
        }
      }
    }
  });
  //获取表单校验实例
  var validator = $cateform.data("bootstrapValidator");

  $cateform.on('success.form.bv',function(e){
    console.log(1);
    e = e || window.event;
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('form').serialize(),
      success:function(data){
        if(data.success){
          $('#add_modal').modal('hide');
          nowPage = 1;
          render();
        }
      }
    })
  });

});
