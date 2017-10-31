/**
 * Created by 静 on 2017/10/31.
 */

$(function(){

  var currentpage = 1;
  var pagesize = 3;

  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:currentpage,
        pageSize:pagesize
      },
      success:function(data){
        console.log(data);
        $('tbody').html(template('tpl2',data));

        //分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentpage,
          totalPages:Math.ceil(data.total/pagesize),
          size:'small',
          onPageClicked(a,b,c,page){
            currentpage = page;
            render();
          }
        })
      }
    });

  }
  render();

  $('.addCate2').on('click',function(){
    $('#add_modal').modal('show');
  });

  //发送请求，获取一级分类名称
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data);
        $('.dropdown-menu').html(template('tpl3', data));
      }
    });


  //点击下拉框，选取一级分类名
  $('.dropdown-menu').on('click','a',function(){
    $('#categoryId').val($(this).data('id'));
    $('.dropdown-text').html($(this).html());
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });


  //文件上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      console.log(data);
      $('.img_box img').attr('src',data.result.picAddr);
      $('#brandLogo').val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus('brandLogo','VALID');
    }
  });

  //表单验证
  $form = $('#form');
  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  });

  $form.on('success.form.bv',function(e){
    console.log($form.serialize());
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$form.serialize(),
      success:function(data){
         if(data.success){
           $('#add_modal').modal('hide');
           render();
         }
      }
    })
  })

});