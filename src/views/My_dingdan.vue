<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="replay" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div class="content_text" v-for="(item,index) in dingdanlist" :key="index">
        <div class="title">
          {{item[1].shopName}} >
          <span class="sp4">等待付款</span>
        </div>
        <van-card
          num="1"
          :price="item[0].order_price"
          :title="item[2].goodsName"
          :thumb="item[1].shopLogo"
        />
        <van-button round type="info" class="btn1">取消订单</van-button>
        <van-button round type="info" class="btn2">支付订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dingdanlist: [], //订单详情
    };
  },
  created() {
    this.$netClient.My_dingdan().then((res) => {
      console.log(res.data.data);
      this.dingdanlist = res.data.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.push("/My");
    },
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background: white;
}
.content {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}
.content_text {
  margin-top: 10px;
  border-bottom: 10px solid rgb(245, 240, 240);
  height: 200px;
}
.title {
  margin-left: 2px;
  overflow: hidden;
}
.sp4 {
  float: right;
  color: red;
}
.van-card {
  border-radius: 10px;
}
.btn1 {
  background: white;
  color: rgb(28, 182, 74);
  border:1px solid rgb(28, 182, 74);
  margin-top: 10px;
  margin-left: 154px;
}
.btn2 {
  background: white;
  color: red;
  border: red 1px solid;
  margin-left: 5px;
}
</style>