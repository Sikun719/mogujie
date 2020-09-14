<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="积分详情" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="replay" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="top">
      <p>积分变动详情</p>
    </div>
    <div class="cotent" v-for="(item,index) in jifenlist" :key="index">
      <span class="sp1">{{item.title}}</span>
      <span class="sp2">+{{item.customer_id}}</span>
      <span class="sp3">{{item.create_time}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jifenlist: [], //积分数据
    };
  },
  methods: {
    onClickLeft() {
      //返回上一页
      this.$router.go(-1); //返回上一层
    },
  },
  created() {
    //积分数据
    this.$netClient.jifen().then((res) => {
      console.log(res.data.data);
      this.jifenlist = res.data.data;
    });
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
.top {
  width: 100%;
  margin-top: 50px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(240, 235, 235);
}
.top p {
  padding-left: 15px;
}
.cotent {
  width: 100%;
  overflow: hidden;
  height: 70px;
  border-bottom: 1px solid rgb(240, 235, 235);
}
.sp1 {
  float: left;
  padding-left: 15px;
  font-weight: 600;
  padding-top: 18px;
}
.sp2 {
  float: right;
  color: green;
  padding-top: 18px;
  padding-right: 80px;
}
.sp3 {
  float: left;
  padding-top: 50px;
  margin-left: -34px;
}
</style>