$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators:false
  });
  
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  
 // 封装好的, 专门用于解析地址栏参数的方法
// 返回具体的参数值


})

function getSearch( k ) {
  var str = location.search; // 获取地址栏参数

  // 解码成中文
  str = decodeURI( str );   // "?key=耐克&age=18&desc=帅"

  // 去掉问号
  // str.slice( start, end )
  // (1) 包括start, 不包括end
  // (2) 如果end不写, 可以截取到最后
  str = str.slice( 1 );    // "key=耐克&age=18&desc=帅"

  // str.split("&") 将字符串根据&分割成数组
  var arr = str.split('&'); // ["key=耐克", "age=18", "desc=帅"]

  var obj = {};
  // 遍历数组, 取得键和值
  arr.forEach(function( v, i ) {  // v 每一项  "age=18"
    var key = v.split("=")[0];  // age
    var value = v.split("=")[1];  // 18
    obj[ key ] = value;
  })

  return obj[ k ];
}