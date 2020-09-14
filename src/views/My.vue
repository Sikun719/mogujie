<template>
  <div class="div1">
    <div class="nav">
      <van-image class="image" round width="4rem" height="4rem" :src="yhlist.user_img" />
      <div class="nav_left">
        <div class="nav_top">{{yhlist.login_name}}</div>
        <div class="nav_center">胖鹿先生</div>
        <div class="nav_bottom">
          <img src="../../public/img/手机.png" alt />
          17730818810
        </div>
      </div>
      <div class="nav_right">
        <button @click="qiandao" ref="refQiand">点击签到{{qiand.msg}}</button>
      </div>
      <div class="nav_dow">
        <div class="nav_dow_content">
          每天领红包，年卡仅0.12元/天
          <button @click="Null">立即开通 ></button>
        </div>
      </div>
    </div>
    <div class="box_center">
      <div class="box_top">
        <div class="box_top_content" @click="tzxq">账号余额{{yue.amount}}元</div>|
        <div class="box_top_content2" @click="jifen">积分{{yue.source}}分</div>
      </div>
      <div class="box_center2">
        <span class="sp1">我的订单</span>
        <span class="sp2" @click="kandingdan">查看全部订单 ></span>
        <table class="t1">
          <tr>
            <td>
              <van-icon name="hotel-o" />
            </td>
            <td>
              <van-icon name="peer-pay" />
            </td>
            <td>
              <van-icon name="send-gift-o" />
            </td>
            <td>
              <van-icon name="more-o" />
            </td>
          </tr>
          <tr>
            <td>全部</td>
            <td>待支付</td>
            <td>待收货</td>
            <td>待评价</td>
          </tr>
        </table>
      </div>
      <div @click="Null" class="box_center3">
        <img src="../../public/img/1599133444(1).jpg" alt />
      </div>
      <div class="box_bottom">
        <div class="p1">常用功能</div>
        <van-grid class="box_bottom_vant" :border="false">
          <van-grid-item icon="wap-home-o" text="收货地址" />
          <van-grid-item icon="star-o" text="我的收藏" @click="My_shoucang" />
          <van-grid-item icon="browsing-history-o" text="浏览记录" @click="My_liulan" />
          <van-grid-item icon="setting-o" text="设置" @click="shezhi" />
        </van-grid>
      </div>
      <div class="footer">
        <img src alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yhlist: [], //用户数据
      qiand: [], //签到数据
      yue: [], //余额数据
      type: true,
    };
  },
  methods: {
    //浏览记录
    My_liulan() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$router.push("/My_jilu");
    },
    //我的收藏
    My_shoucang() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$router.push("/My_shoucang");
    },
    //查看订单
    kandingdan() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$router.push("/My_dingdan");
    },
    //积分
    jifen() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$netClient.jifen().then((res) => {
        this.$router.push("/Jifen");
      });
    },
    //余额详情
    tzxq() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$router.push({
        path: "/Yuexq",
      });
      this.$netClient.yue().then((res) => {});
    },
    //设置模块
    shezhi() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      this.$router.push("/Shezhi");
    },
    //签到模块
    qiandao(refQiand) {
      this.$netClient.qiandao().then((res) => {
        console.log(res.data.msg);
        this.qiand = res.data.msg;
        //点击签到
        this.$refs.refQiand.innerHTML = "已签到";
        if (this.type == true) {
          this.$toast("签到成功");
          this.type = false;
        } else {
          this.$toast.success("今日已签到，明天再来吧");
        }
      });
    },
    //未开发模块
    Null() {
      this.$toast.loading({
        message: "模块开发中，敬请期待...",
        forbidClick: true, //禁止背景点击
      });
    },
  },
  mounted() {
    //用户信息模块
    this.$netClient.yonghuxx().then((res) => {
      this.yhlist = res.data.data;
    });
    //余额模块
    this.$netClient.yue().then((res) => {
      this.yue = res.data.data[0];
    });
  },
};
</script>

<style scoped>
.div1 {
  width: 100%;
  background: rgb(239, 239, 239);
  height: 800px;
}

.nav {
  width: 100%;
  background: rgb(2, 115, 255);
  height: 160px;
  overflow: hidden;
  color: white;
}
.image {
  float: left;
  margin-top: 35px;
  margin-left: 15px;
}
.nav_left {
  margin-left: 84px;
  margin-top: 30px;
}
.nav_bottom img {
  width: 15px;
}
.nav_top {
  font-size: 20px;
}
.nav_center {
  font-size: 20px;
}
.nav_bottom {
  margin-top: 4px;
}
.nav_right {
  float: right;
  margin-top: -60px;
  margin-right: 15px;
}
.nav_right button {
  background: rgb(255, 101, 101);
  border-radius: 25px;
  border: none;
  outline: none;
  height: 44px;
  width: 70px;
  color: white;
  font-size: 14px;
}
.nav_dow {
  width: 92%;
  height: 38px;
  margin-left: 4%;
  margin-top: 20px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-image: linear-gradient(to right, #506183, #2d384c);
}
.nav_dow_content {
  line-height: 38px;
  font-size: 14px;
  text-indent: 15px;
}
.nav_dow_content button {
  width: 86px;
  height: 20px;
  border: none;
  outline: none;
  background: linear-gradient(to right, #40e865, #1ebb4e);
  border-radius: 14px;
  line-height: 10px;
  margin-left: 38px;
  color: black;
}
.box_center {
  text-align: center;
  width: 92%;
  margin-left: 4%;
  margin-right: 4%;
  border-radius: 6px;
  margin-top: 18px;
  background: white;
  height: 60px;
  font-size: 14px;
}

.box_top_content {
  width: 46%;
  display: inline-block;
  line-height: 60px;
}
.box_top_content2 {
  width: 46%;
  display: inline-block;
  line-height: 60px;
}
.box_center2 {
  border-radius: 6px;
  margin-top: 18px;
  background: white;
  height: 120px;
  font-size: 14px;
  overflow: hidden;
}
.sp1 {
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 20px;
}
.sp2 {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  color: gray;
}
.box_center3 {
  border-radius: 6px;
  margin-top: 18px;
  background: white;
  height: 90px;
  font-size: 14px;
}
.box_center3 img {
  margin-top: 12px;
}
.box_bottom {
  border-radius: 6px;
  margin-top: 18px;
  background: white;
  height: 140px;
  font-size: 14px;
  color: gray;
}
.p1 {
  padding-top: 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  text-indent: 10px;
  color: black;
}
.box_bottom_vant {
  margin-top: 10px;
}
.t1 {
  width: 100%;
  margin-top: 51px;
  font-size: 12px;
  color: gray;
}
.van-icon {
  font-size: 26px;
  color: gray;
}
</style>