<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="支付页面" />
    </div>
    <div class="image">
      <img src="../../public/img/支付成功.png" alt />
    </div>
    <div class="text">
      <div class="box1">支付成功</div>
      <div class="box2">订单支付成功 请确认</div>
    </div>
    <div class="bottom">
      <van-button style="background:rgb(9,187,7)" type="primary" block @click="Main">返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //返回首页
    Main() {
      this.$router.push("/Main");
    },
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  background: white;
}
.image {
  text-align: center;
}
.image img {
  margin-top: 70px;
  width: 100px;
}
.text {
  text-align: center;
}
.box1 {
  margin-top: 20px;
  font-weight: 600;
  margin-bottom: 5px;
}
.box2 {
  font-size: 15px;
}
.bottom {
  margin-top: 70px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>