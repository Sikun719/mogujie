//定义请求方式
export const METHOD = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
}

export const PATH = {
  table: "/api/Home/getHomeREC",//宫格接口 
  getHome: "/api/Home/getHomeShowGoods",//列表接口
  top_search: '/api/Goods/getSearchHot',//热搜接口
  search: "/api/Goods/getGoods",//搜索接口
  Class: '/api/Goods/getCatsTree',//左边分类接口
  Class_right: "/api/Goods/getCadGoods",//右边分类接口
  pagelist: "/api/Goods/GetGoodsInfo",//详情接口
  qiandao: "/api/Log/addPointFromSignIn",//签到接口
  yue: "/api/Log/getBalanceLog",//余额接口
  zhuce: '/api/LoginPage/AddLogin',//验证注册
  yzsj: "/api/Verify/GetPhone",//验证手机号
  yzyhm: "/api/Verify/LoginName",//验证用户名
  yzdl: "/api/LoginPage/Login",//验证登录
  tjshop: "/api/Cart/addCart",//添加购物车
  gwcxx: "/api/Cart/getCart", //购物车页面
  yonghuxx: "/api/UserInfo/getUserData",//用户信息
  scgwc: "/api/Cart/DeleteCart",//删除购物车商品
  dizhi: "/api/UserInfo/getArea",//获取地址
  tjdizhi: "/api/UserInfo/addArea",//添加地址
  dingdan: "/api/Order/getOrderInfo",//订单信息
  querenzhifu: "/api/Order/cretaeOrder",//确认支付 但未完成付款操作
  addyue: "/api/Order/payOrder",//进行订单的支付 （余额）
  jifen:"/api/Log/getPointLog",//我的页面 积分
  My_dingdan:"/api/Order/getOrderByState",//我的订单详情
  My_shoucang:"/api/Goods/getFav",//我的收藏
  mima:"/api/Order/verifyPayPWD",//验证支付密码
  zhifu:'/api/Order/payOrder',//余额支付
  zhifubao:"/api/Alipay/appWebPay",//支付宝支付
}