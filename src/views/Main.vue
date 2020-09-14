<template>
  <div class="div">
    <div class="nav">
      <van-search show-action placeholder="请输入想要搜素的商品" @click="Seek" />
    </div>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FF5577">
        <van-swipe-item v-for="(item,index) in swiper" :key="index">
          <img :src="item.slide_show_imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="tab">
      <table v-for="(item,index) in table" :key="index">
        <tr>
          <td>
            <img :src="item.sp_home_ico" alt />
          </td>
        </tr>
        <tr>
          <td>{{item.sp_home_title}}</td>
        </tr>
      </table>
    </div>
    <van-sticky>
      <div class="list_nav">
        <van-tabs
          v-model="active"
          color="#FF5577"
          title-active-color="#FF5777"
          line-height="0.2rem"
          class="tabs-nav"
          @click="onTab"
        >
          <van-tab title="流行"></van-tab>
          <van-tab title="新款"></van-tab>
          <van-tab title="精选"></van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list_content" v-for="(item,index) in list" :key="index">
        <img :src="item.goodsLogo" @click="Page(item.goodsId)" />
        <div class="box1">{{item.goodsName}}</div>
        <div class="box2">￥{{item.goodsPrice}}</div>
        <div class="box3">
          <van-icon name="star-o" />
          {{item.goodsFav}}
        </div>
        <br />
        <s>{{item.goodsOldPrice}}</s>
        <br />
        <span class="sp1">已售{{item.goodsBuyNum}}件</span>
      </div>
    </van-list>
    <a href="#top" target="_self" id="to-top-btn">
      <img src="../../public/img/返回顶部.png" alt />
    </a>
    <div style="margin-top:3rem"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiper: [], //轮播图数据
      table: [], //宫格数据
      active: "0", //默认第一个列表
      list: [], //列表数据
      loading: false, //上拉加载更多数据
      finished: false, //是否已加载完成，加载完成后不再触发load事件
      num: 1, //加载数据第一页
    };
  },
  created() {
    this.$netClient.table().then((res) => {
      this.swiper = res.data.data[1];
      this.table = res.data.data[0];
    });
  },
  mounted() {
    // 滚动条的获取
    window.addEventListener("scroll", this.scrollToTop);
    this.$netClient
      .getHome({
        params: {
          type: "pop",
          page: 1,
        },
      })
      .then((res) => {
        this.list = res.data.data;
      });
  },
  methods: {
    //监听回到顶部按钮距浏览器顶部的距离，滚动的距离如果大于浏览器高度时，设置 toTop 为true,否则就是false;
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

    Page(id) {
      this.$router.push({
        path: "/Page",
        query: {
          id,
        },
      });
    },
    onLoad() {
      this.$netClient
        .getHome({
          params: {
            type: "pop",
            page: this.num, //加载第num页
          },
        })
        .then((res) => {
          this.num++;
          this.loading = false;
          this.list = [...this.list, ...res.data.data]; //之前的数据//加载的数据
        });
    },
    Seek() {
      this.$router.push({
        path: "/Seek",
      });
    },
    onTab(name, title) {
      if (title == "流行") {
        this.$netClient
          .getHome({
            params: {
              sortType: "syn",
              page: 1,
            },
          })
          .then((res) => {
            this.list = res.data.data;
          });
      } else if (title == "新款") {
        this.$netClient
          .getHome({
            params: {
              sortType: "new",
              page: 1,
            },
          })
          .then((res) => {
            this.list = res.data.data;
          });
      } else if (title == "精选") {
        this.$netClient
          .getHome({
            params: {
              sortType: "sell",
              page: 1,
            },
          })
          .then((res) => {
            this.list = res.data.data;
          });
      }
    },
  },
};
</script>

<style scoped>
.div1 {
  width: 100%;
}
.nav {
  width: 100%;
  background: white;
  position: fixed;
  z-index: 10;
}
.swiper {
  width: 100%;
}
.swiper img {
  margin-top: 50px;
  width: 100%;
  height: 200px;
}
.tab {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: rgb(39, 38, 38);
}
.tab table {
  width: 20%;
  text-align: center;
}
.tab table img {
  width: 60px;
}
.list_content {
  margin-top: 10px;
  float: left;
  width: 50%;
  text-align: center;
}
.list_content img {
  width: 180px;
  height: 180px;
  border-radius: 6px;
}
.box1 {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-top: 2px;
  font-size: 13px;
}
.box2 {
  color: #ff5577;
  font-weight: 600;
  margin-top: 4px;
  font-size: 13px;
  display: inline-block;
}
.box3 {
  display: inline-block;
  margin-top: 3px;
  font-size: 13px;
  margin-left: 14px;
}
s {
  font-size: 14px;
  color: gray;
  float: left;
  margin-left: 4px;
}
.sp1 {
  float: right;
  background: rgb(0, 0, 0);
  opacity: 0.5;
  text-align: center;
  height: 18px;
  line-height: 18px;
  padding-left: 4px;
  padding-right: 4px;
  color: white;
  font-size: 10px;
  border-radius: 1px;
  margin-top: -85px;
  margin-right: 9px;
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