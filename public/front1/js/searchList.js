/**
 * Created by 静 on 2017/11/2.
 */

mui('.mui-scroll-wrapper').scroll({
  indicators:false
});

var obj = getParam();

$('.search-txt').val(obj.key);

var data ={
  proName:'',
  brandId:'',
  price:'',
  num:'',
  page:1,
  pageSize:10
};

function render(data){
  $.ajax({
    url:'/product/queryProduct',
    type:'get',
    data:data,
    success:function(msg){
      //console.log(msg);
      setTimeout(function(){
        $('.product').html(template('tpl',msg));
      },1000);
    }
  })
}

data.proName =obj.key;
render(data);


$('.sort_price,.sort_num').on('click',function(){
  $this= $(this);
  $span = $this.find('span');
  if($this.hasClass('now')){

    $span.toggleClass('fa-angle-up').toggleClass('fa-angle-down');
  }else {
    $this.addClass('now').siblings().removeClass("now");
    $(".sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
  }

  var type = $this.data('type');
  var value = $span.hasClass('fa-angle-down')? 2:1;

  data[type] = value;
  render(data);
});

$('.search-btn').on('click',function(){
  $('.sort a').removeClass('now');
  $('.sort span').removeClass('fa-angle-up').addClass('fa-angle-down');

  var val = $('.search-txt').val().trim();
  data.proName = val;
  data.num = "";
  data.price = '';
  $('.product').html('<div class="loading"></div>');
  render(data);
  $('.search-txt').val("");
});