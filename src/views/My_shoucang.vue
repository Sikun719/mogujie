<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="replay" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="content">
      <div v-for="(item,idnex) in shoucanglist" :key="idnex" class="cont_text">
        <img :src="item.goodsLogo" alt />
        <span class="sp1">{{item.goodsName}}</span>
        <span class="sp2">{{item.goodsPrice}}</span>

        <span class="sp3">
          <van-icon name="star-o" />
          {{item.goodsFav}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoucanglist: [], //收藏数据
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/My");
    },
  },
  created() {
    this.$netClient.My_shoucang().then((res) => {
      console.log(res.data.data);
      this.shoucanglist = res.data.data;
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
.content {
  margin-top: 55px;
  overflow: hidden;
  text-align: center;
}
.cont_text {
  width: 33%;
  float: left;
}

.cont_text img {
  border-radius: 10px;
}
.sp1 {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 12px;
  text-indent: 10px;
}
.sp2 {
  color: #ff5577;
  font-size: 12px;
}
.sp3 {
  padding-left: 5px;
  font-size: 12px;
}
</style>