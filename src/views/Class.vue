<template>
  <div class="div1">
    <div class="box1">
      <div class="box1_content">商品分类</div>
      <div class="search">
        <van-search placeholder="请输入搜索关键词" @click="Seek" />
      </div>
    </div>
    <div class="box2">
      <div class="box2_left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item,index) in left"
            :key="index"
            :title="item.cat_name"
            @click="nav1(item.cat_id)"
          />
        </van-sidebar>
      </div>
      <div class="box2_right">
        <div class="box2_right_top">
          <van-sticky :offset-top="90">
            <van-tabs v-model="activeName" color="#FF5577" title-active-color="#FF5777">
              <van-tab title="综合" name="a"></van-tab>
              <van-tab title="销量" name="b"></van-tab>
              <van-tab title="新品" name="c"></van-tab>
            </van-tabs>
          </van-sticky>
          <!-- 商品 -->
          <div class="content-1">
            <div class="text">
              <div class="content-2" v-for="(item,index) in right" :key="index">
                <img class="ii1" :src="item.goodsLogo" alt />
                <div class="box3">{{item.goodsName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0, //默认第一个
      activeName: "a", //默认第一个
      left: [], //左边的数据
      right: [], //右边的数据
    };
  },
  created() {
    //左边的数据
    this.$netClient.Class().then((res) => {
      this.left = res.data.data;
    });
  },
  methods: {
    //点击关键字展示右边的数据
    nav1(id) {
      this.$netClient
        .Class_right({
          params: {
            cat_id: id,
            page: 1,
            pageSize: 10,
          },
        })
        .then((res) => {
          console.log(res);
          this.right = res.data.data;
        });
    },
    //跳转搜索页
    Seek() {
      this.$router.push({
        path: "/Seek",
      });
    },
  },
};
</script>

<style scoped>
.box1 {
  width: 100%;
  text-align: center;
  background: white;
  position: fixed;
  top: 0;
  z-index: 10;
}
.box1_content {
  margin-top: 18px;
}
.box2 {
  width: 100%;
  text-align: center;
  overflow: hidden;
}
.box2_left {
  margin-top: 100px;
  float: left;
  width: 22%;
  position: fixed;
}
.box2_right {
  float: right;
  width: 72%;
  margin-top: 90px;
}
.box2_right_top {
  width: 78%;
  z-index: 20;
  position: fixed;
  margin-left: -22px;
}
.box2_right_bottom {
  margin-top: 150px;
}
.box2_right_content {
  margin-top: 150px;
}
.box3 {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  width: 100px;
  text-indent: 10px;
}
.content-1 {
  overflow: hidden;
  margin-top: 10px;
}
.content-2 {
  width: 100%;
}
.ii1 {
  width: 100px;
  height: 100px;
  margin-left: 10px;
}
.text {
  text-align: left;
}
</style>