<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" class="bottom" route active-color="#FF5577">
      <van-tabbar-item to="/Main" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/Class" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/Shop" icon="logistics">购物车</van-tabbar-item>
      <van-tabbar-item to="/My" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "",
    };
  },
};
</script>

<style scoped>
.bottom{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 100;
}
</style>