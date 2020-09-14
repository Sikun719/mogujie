<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="余额明细" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="replay" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="p1">余额变动详情</div>
    <div class="content" v-for="(item,index) in yue" :key="index">
      <div class="box1">
        <span class="sp1">{{item.title}}</span>
        <span class="sp2">-{{item.amount}}</span>
        <span class="sp3">{{item.create_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yue: [], //余额详情数据
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/My",
      });
    },
  },
  mounted() {
    this.$netClient.yue().then((res) => {
      console.log(res.data.data);
      this.yue = res.data.data;
    });
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  background: white;
  position: fixed;
  z-index: 10;
  top: 0;
}
.p1 {
  margin-top: 50px;
  text-indent: 20px;
  height: 50px;
  line-height: 50px;
  border-bottom: 0.01rem solid gainsboro;
}
.box1 {
  overflow: hidden;
  border-bottom: 1px solid gainsboro;
}
.sp1 {
  height: 70px;
  position: relative;
  left: -55px;
  font-weight: 600;
  position: relative;
  top: -8px;
}
.sp2 {
  margin-right: 80px;
  color: red;
  height: 70px;
  line-height: 70px;
  position: relative;
  left: 90px;
  top: -8px;
}
.sp3 {
  float: left;
  margin-top: 50px;
  position: relative;
  left: 22px;
  font-size: 14px;
  color: gray;
}
</style>