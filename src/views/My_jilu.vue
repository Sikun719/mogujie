<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="浏览记录" left-text="返回" left-arrow @click-left="onClickLeft">
        <template #right>
          <van-icon name="replay" size="18" />
        </template>
      </van-nav-bar>
    </div>

    <div class="block">
      <span class="demonstration">请选择查看日期</span>
      <br />
      <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
    };
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
.block {
  margin-top: 50px;
  margin-left: 15px;
}
.demonstration {
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>