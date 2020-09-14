<template>
  <div class="div1">
    <div class="nav">
      <van-tabs
        :border="false"
        title-active-color="#FF5577"
        line-height="0px"
        v-model="active"
        scrollspy
        sticky
      >
        <template #nav-left>
          <van-icon class="vant1" @click="Main" name="arrow-left" />
        </template>
        <van-tab title="商品" class="tab1">
          <div class="image">
            <img class="i1" :src="pagelist.goodsLogo" />
            <div class="box1">{{pagelist.goodsName}}</div>
            <span class="sp1">￥{{pagelist.goodsPrice}}</span>
            <s class="sp2">{{pagelist.goodsOldPrice}}</s>
          </div>
          <div class="xiaol">
            <div class="xiao_content">
              <span>销量{{pagelist.goodsBuyNum}}</span>
              <span>收藏{{pagelist.goodsFav}}</span>
              <span>{{xiaoliang.shopAre}}</span>
            </div>
          </div>
          <div class="yanwu">
            <div class="yanwu_content" v-for="(item,index) in yanwu" :key="index">
              <img :src="item.icon" alt />
              <span class="sp2">{{item.name}}</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="评论">
          <hr class="hr1" />
          <div class="pingjia">
            <div class="pingjia_content">
              <span class="sp3">
                <small>卖家评价 {{xiaoliang.shopId}}</small>
              </span>
              <span class="sp4">
                更多
                <van-icon class="vant_right" name="arrow" />
              </span>
            </div>
          </div>
          <div class="pingj_content">
            <div class="img_name">
              <img :src="pingjia.user_img" alt />
              <span class="sp5">{{pingj_content.user_name}}</span>
              <div class="box3">{{pingjia.content}}</div>
            </div>
          </div>
          <div class="pingj_content2">
            <img :src="pingj_content.user_img" alt />
            <span class="sp5">{{pingj_content.user_name}}</span>
            <div class="box4">{{pingj_content.content}}</div>
          </div>
          <div class="img_ii1">
            <img class="ii1" :src="ping_img" alt />
          </div>
          <div class="ping_top">
            <div class="ping_top_content">
              <img :src="xiaoliang.shopLogo" alt />
              <span class="sp6">{{xiaoliang.shopName}}</span>
            </div>
          </div>
          <div class="border_left">
            <div class="ping_bottom">
              <div class="ping_bottom_left">
                <table>
                  <tr>
                    <td>{{xiaoliang.sells}}</td>
                    <td>{{xiaoliang.snum}}</td>
                  </tr>
                  <tr>
                    <td>总销量</td>
                    <td>全部宝贝</td>
                  </tr>
                </table>
              </div>
              <div class="ping_bottom_right">
                <table>
                  <tr>
                    <td style="width:150px">描述相符</td>
                    <td>{{xiaoliang.shopDescribe}}</td>
                    <span class="sp7">高</span>
                  </tr>
                  <tr>
                    <td>价格满意</td>
                    <td>{{xiaoliang.shopDescribe}}</td>
                    <span class="sp7">高</span>
                  </tr>
                  <tr>
                    <td>质量满意</td>
                    <td>{{xiaoliang.shopDescribe}}</td>
                    <span class="sp7">高</span>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="btn">
            <button>进店逛逛</button>
          </div>
          <hr class="hr1" />
        </van-tab>
        <van-tab title="详情">
          <div class="xq_image">
            <div class="xq_image_img" v-html="pagelist.goodsIntroduce"></div>
          </div>
        </van-tab>
        <van-tab title="推荐">
          <div class="tuijian">
            <p>
              为你
              <van-icon name="award-o" />推荐
            </p>
          </div>
          <div class="gujiap">
            <van-skeleton title :row="24" />
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div style="margin-bottom:70px"></div>
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="首页" @click="Main"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="tgwc" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click="shop" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <a href="#top" target="_self" id="to-top-btn">
      <img src="../../public/img/返回顶部.png" alt />
    </a>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      active: "0", //默认第一个
      pagelist: [], //详情页数据
      xiaoliang: [], //销量数据
      yanwu: [], //延误必赔数据
      pingjia: [], //评价数据
      pingj_content: [], //评价内容数据
      ping_img: [], //评论图片数据
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  methods: {
    //返回首页
    Main(){
      this.$router.push({
        path:'/Main'
      })
    },
    tgwc() {
      this.$router.push({
        path: "/Shop",
      });
    },
    shop() {
      this.$netClient
        .tjshoplist(
          qs.stringify({
            product_id: this.pagelist.goodsId,
            product_amount: 1,
            price: this.pagelist.goodsPrice,
          })
        )
        .then((res) => {
          this.$toast("添加购物车成功！");
          console.log(res);
        });
    },
    scrollToTop() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log("距离顶部的距离:" + scrollTop);
    },
    scrollToTop(el) {
      let topBtn = document.getElementById("to-top-btn");
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let browserHeight = window.outerHeight;
      if (scrollTop > browserHeight) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    },
    //离开该页面需要移除这个监听的事件，不然会报错;
    destroyed() {
      window.removeEventListener("scroll", this.scrollToTop);
    },
    Main() {
      this.$router.push({
        path: "/Main",
      });
    },
  },
  created() {
    let id = this.$route.query.id;
    this.$netClient
      .pagelist({
        params: {
          goodsId: id,
        },
      })
      .then((res) => {
        console.log(res);
        this.pagelist = res.data.data[0];
        this.xiaoliang = res.data.data[1];
        this.yanwu = res.data.data[2];
        this.pingjia = res.data.data[3][0].comment_body;
        this.pingj_content = res.data.data[3][1].comment_body;
        this.ping_img = res.data.data[3][1].comment_img;
      });
  },
};
</script>

<style scoped>
.div1 {
  width: 100%;
}
.vant1 {
  font-size: 1.5rem;
  z-index: 1000;
  position: relative;
  top: 0.6rem;
  left: 0.7rem;
  color: #ff5577;
}
.image {
  width: 100%;
}
.image img {
  width: 100%;
}
.box1 {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
}
.sp1 {
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  color: #ff5577;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 10px;
}
s {
  display: inline-block;
  color: gray;
  font-size: 0.8rem;
}
.yanwu {
  display: flex;
  justify-content: space-between;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 15px;
}
.yanwu_content {
  text-align: center;
  font-size: 13px;
}
.yanwu img {
  width: 12px;
}
.xiao_content {
  margin-left: 8px;
  margin-right: 8px;
  display: flex;
  font-size: 13px;
  color: gray;
  justify-content: space-between;
  height: 25px;
  margin-top: 20px;
  border-bottom: 1px solid gainsboro;
}
.hr1 {
  height: 6px;
  width: 100%;
  background: rgb(236, 235, 235);
  border: none;
  margin-top: 20px;
}
.pingjia {
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid gainsboro;
  height: 40px;
}

.pingjia_content {
  overflow: hidden;
  width: 100%;
  margin-top: 25px;
}
.sp3 {
  float: left;
  margin-left: 8px;
}
.sp4 {
  float: right;
  margin-right: 8px;
  font-size: 0.95rem;
}
.vant_right {
  position: relative;
  font-size: 10px;
}
.pingj_content {
  margin-left: 8px;
  margin-right: 8px;
}
.img_name {
  width: 100%;
  overflow: hidden;
}
.img_name img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-top: 8px;
  float: left;
}
.sp5 {
  float: left;
  margin-top: 23px;
  margin-left: 8px;
}
.box3 {
  margin-top: 65px;
  font-size: 14px;
  color: gray;
}
.pingj_content2 {
  overflow: hidden;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 20px;
}
.pingj_content2 img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-top: 8px;
  float: left;
}
.box4 {
  margin-top: 65px;
  font-size: 14px;
  color: gray;
}
.ii1 {
  width: 70px;
  height: 70px;
  margin: 10px;
  margin-bottom: 15px;
}
.img_ii1 {
  border-bottom: 4px solid rgb(236, 235, 235);
}
.ping_top {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 16px;
}
.ping_top_content {
  overflow: hidden;
}
.ping_top_content img {
  width: 50px;
  float: left;
  border-radius: 50%;
}
.ping_top_content .sp6 {
  float: left;
  margin-top: 12px;
  margin-left: 15px;
}
.ping_bottom {
  width: 96%;
  padding-left: 2%;
  padding-right: 2%;
  overflow: hidden;
  margin-top: 25px;
  overflow: hidden;
}
.ping_bottom_left {
  float: left;
  width: 50%;
  border-right: 2px solid gainsboro;
}
.ping_bottom_right {
  float: left;
  width: 44%;
}
.ping_bottom_left table {
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
}
.ping_bottom_right table {
  text-align: center;
  font-size: 14px;
  color: rgb(63, 61, 61);
}
.ping_bottom_left table td {
  width: 80px;
  color: rgb(63, 61, 61);
}
.sp7 {
  display: inline-block;
  padding-left: 2px;
  padding-right: 2px;
  color: white;
  background: rgb(7, 172, 7);
}
.btn button {
  width: 8rem;
  height: 1.8rem;
  border: none;
  text-align: center;
  line-height: 1.8rem;
  background: rgb(243, 240, 240);
  border-radius: 0.6rem;
  color: rgb(110, 109, 109);
  margin-left: 34%;
  margin-top: 1rem;
}
.xq_image {
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
}
.xq_image_img >>> img {
  width: 100%;
}
.tuijian {
  width: 96%;
  text-align: center;
  border-bottom: 1px solid cornflowerblue;
  margin-left: 2%;
  margin-right: 2%;
}
.tuijian p {
  font-size: 22px;
  font-weight: 600;
}
.gujiap {
  margin-top: 20px;
}
a {
  width: 2.4rem;
  height: 2.4rem;
  position: fixed;
  top: 44rem;
  right: 0.2rem;
  display: none;
}
</style>