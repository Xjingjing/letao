/**
 * Created by 静 on 2017/11/1.
 */

$(function(){

  var currentpage = 1;
  var pagesize = 3;
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentpage,
        pageSize:pagesize
      },
      success:function(data){
        console.log(data);
        $('tbody').html(template('tpl2',data));

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
    })
  }
  render();

  $('.addProduct').on('click',function(){
    $('#add_modal').modal('show');

    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      success:function(data){
        $('.dropdown-menu').html(template('tpl3',data));
      }
    });

  });


  $form = $('#form');
  $('.dropdown-menu').on('click','a',function(){
    $('.dropdown-text').text($(this).text());
    $('#brandId').val($(this).data('id'));
    $form.data("bootstrapValidator").updateStatus("brandId",'VALID');
  });

  //文件上传
  var picArr = [];
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('.img_box').append('<img src="' + data.result.picAddr + '" width="100" height="100">');

      picArr.push(data.result);

      if (picArr.length === 3) {
        $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
      } else {
        $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }
    }

  });


  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            //必须是0以上的数字
            regexp:/^[1-9]\d*$/,
            message:"请输入一个大于0的库存"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺寸"
          },
          regexp:{
            //33-55
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码（30-50）"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品的折扣价"
          }
        }
      },
      productLogo:{
        validators:{
          notEmpty:{
            message:"请上传三张图片"
          }
        }
      }
    }
  });

 $form.on('success.form.bv',function(e){
   e.preventDefault();

   var $param = $form.serialize();
   $param += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
   $param += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
   $param += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
   console.log($param);

   $.ajax({
     url:'/product/addProduct',
     type:'post',
     data:$param,
     success:function(data){
       if(data.success){
         $('#add_modal').modal('hide');
         currentpage = 1;
         render();

         $form[0].reset();
         $form.data('bootstrapValidator').resetForm();
         $(".dropdown-text").text("请选择二级分类");
         $(".img_box img").remove();
         picArr = [];
       }
     }
   })
 })
});