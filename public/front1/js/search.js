/**
 * Created by 静 on 2017/11/2.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators: false
});

//获取web存储
function getHistory(){
  var search_history = localStorage.getItem("lt_search_history") || "[]";
  var arr = JSON.parse(search_history);
  return arr;
}

//动态获取数据  渲染页面
function render(){
  var arr = getHistory();
  $('.member ul').html(template('tpl',{arr:arr}));
}
render();

//删除单条记录
$('.member ul').on('click','.close',function(){
  var btnArray = ['是','否'];
  $that = $(this);
  mui.confirm("您确定删除这条搜索记录吗？","亲~",btnArray,function(data){
    if(data.index == 0){
      var arr = getHistory();
      var index = $that.data("index");
      arr.splice(index,1);
      localStorage.setItem('lt_search_history',JSON.stringify(arr));
      render();
      mui.toast("操作成功");
    }else{
      mui.toast("操作取消");
    }
  })

});

//清空全部记录
$('.fa-trash').on('click',function(){
  var btnArray = ['yes','no'];
  mui.confirm("确定清空全部记录吗？","亲~",btnArray,function(data){
    if(data.index == 0){
      localStorage.removeItem("lt_search_history");
      render();
      mui.toast("操作成功");
    }else{
      mui.toast('操作取消');
    }
  })

});

//将搜索内容存储到localstorage并渲染页面
$('.search-btn').on('click',function(){
  //首先用户的输入如果有空格要去掉
  var txt = $('.search-txt').val().trim();

  if(txt == ""){
    mui.alert("亲，你想买啥", "温馨提示");
    return;
  }
  var arr = getHistory();

  var index = arr.indexOf(txt);
  if(index > -1){
    arr.splice(index,1);
  }
  if(arr.length >= 10){
    arr.pop();
  }
  arr.unshift(txt);
  localStorage.setItem('lt_search_history',JSON.stringify(arr));

  $('.search-txt').val("");

  location.href = "searchList.html?key="+txt;

});
