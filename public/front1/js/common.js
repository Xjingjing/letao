/**
 * Created by 静 on 2017/11/2.
 */


function getParam(){
  var href = location.search;
  href = decodeURI(href.slice(1));
  var arr = href.split('&');

  var obj = {};
  arr.forEach(function(v,i){
     obj[v.split('=')[0]] = v.split('=')[1];
  });

 return obj;
}