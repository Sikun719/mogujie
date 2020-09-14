import {
	request
} from "./core";

import {
	METHOD,
	PATH,
} from "./config";

const netClient = {
	// 宫格
	table(params) {
		return request(METHOD.GET, PATH.table, params)
	},
	//首页
	getHome(params) {
		return request(METHOD.GET, PATH.getHome, params)
	},
	//热搜
	top_search(params) {
		return request(METHOD.GET, PATH.top_search, params)
	},
	//点击热搜
	search(params) {
		return request(METHOD.GET, PATH.search, params)
	},
	//左边分类
	Class(params) {
		return request(METHOD.GET, PATH.Class, params)
	},
	//右边分类
	Class_right(params) {
		return request(METHOD.GET, PATH.Class_right, params)
	},
	//详情
	pagelist(params) {
		return request(METHOD.GET, PATH.pagelist, params)
	},
	//签到
	qiandao(params) {
		return request(METHOD.GET, PATH.qiandao, params)
	},
	// 余额
	yue(params) {
		return request(METHOD.GET, PATH.yue, params)
	},
	//注册
	zhuce(params) {
		return request(METHOD.POST, PATH.zhuce, params)
	},
	//手机号
	yzsj(params) {
		return request(METHOD.GET, PATH.yzsj, params)
	},
	//用户名
	yzyhm(params) {
		return request(METHOD.GET, PATH.yzyhm, params)
	},
	//登录
	yzdl(params) {
		return request(METHOD.POST, PATH.yzdl, params)
	},
	//添加购物车
	tjshoplist(params) {
		return request(METHOD.POST, PATH.tjshop, params)
	},
	//购物车
	gwcxx(params) {
		return request(METHOD.GET, PATH.gwcxx, params)
	},
	// 用户信息
	yonghuxx(params) {
		return request(METHOD.GET, PATH.yonghuxx, params)
	},
	//删除购物车商品
	scgwc(params) {
		return request(METHOD.PATCH, PATH.scgwc, params)
	},
	//获取地址信息
	dizhi(params) {
		return request(METHOD.GET, PATH.dizhi, params)
	},
	//添加地址
	tjdizhi(params) {
		return request(METHOD.POST, PATH.tjdizhi, params)
	},
	//添加地址
	dingdan(params) {
		return request(METHOD.GET, PATH.dingdan, params)
	},
	//确认支付 但未完成付款操作
	querenzhifu(params) {
		return request(METHOD.POST, PATH.querenzhifu, params)
	},
	// 余额支付
	addyue(params) {
		return request(METHOD.POST, PATH.addyue, params)
	},
	// 积分
	jifen(params) {
		return request(METHOD.GET, PATH.jifen, params)
	},
	// 我的订单详情
	My_dingdan(params) {
		return request(METHOD.GET, PATH.My_dingdan, params)
	},
	//我的收藏
	My_shoucang(params) {
		return request(METHOD.GET, PATH.My_shoucang, params)
	},
	//支付
	mima(params) {
		return request(METHOD.POST, PATH.mima, params)
	},
	//余额支付
	zhifu(params) {
		return request(METHOD.POST, PATH.zhifu, params)
	},
	// 支付宝支付
	zhifubao(params) {
		return request(METHOD.POST, PATH.zhifubao, params)
	},
}

export default netClient;
