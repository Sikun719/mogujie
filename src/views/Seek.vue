<template>
  <div class="div1">
    <div class="nav">
      <van-icon @click="Main" class="vant_top" name="arrow-left" />
      <span class="p1">商品搜索</span>
      <div class="seek">
        <van-search
          show-action
          placeholder="请输入想要搜素的商品"
          input-align="center"
          @click="cmo"
          v-model="key"
        >
          <template #action>
            <div @click="debounceClickTest">搜索</div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="box_center">
      <van-divider content-position="left">全网热搜</van-divider>
      <div class="top_search" v-for="(item,idnex) in top_search" :key="idnex">
        <div @click="topsearch(item)" class="top_search_content">{{item}}</div>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="titlle">
      <van-divider
        v-show="show"
        class="vantlsjl"
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >搜索历史</van-divider>
      <div class="lsjl" v-show="show" v-for="(item,index) in lsjl" :key="index">
        {{item}}
        <van-icon class="vantcuo" name="close" @click="del(index)" />
      </div>
      <div class="boxbtn">
        <van-button v-show="show" class="vantbtn" plain type="info" @click="Null">清空历史记录</van-button>
      </div>
    </div>
    <div class="footer" v-for="(item,index) in search" :key="index">
      <div>
        <img width="100%" :src="item.goodsLogo" alt />
      </div>
      <p class="pp1">{{item.goodsName}}</p>
      <p>
        <span style="color:red">{{item.goodsPrice}}</span> &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <van-icon name="star-o" />
          {{item.goodsFav}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { debounce } from "../untils/untils.js";
export default {
  data() {
    return {
      top_search: [], //热搜数据
      key: "", //key值
      lsjl: [], //历史记录
      show: false, //显示隐藏搜索记录
      search: [], //热搜数据
    };
  },
  created() {
    let lsjl = localStorage.lsjl;
    if (lsjl) {
      this.lsjl = JSON.parse(lsjl);
    }
    this.$netClient.top_search().then((res) => {
      this.top_search = res.data.data;
    });
  },
  mounted() {
    this.$netClient.search({}).then((res) => {
      this.search = res.data.data;
    });
  },
  methods: {
    // 点击热搜搜索对应商品
    topsearch(item) {
      // 轻提示
      this.$toast.loading({
        duration: 1500,
        message: "加载中...",
      });
      this.$netClient
        .search({
          params: {
            goodsName: item,
            page: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.search = [];
          this.search = res.data.data;
          this.key = item;
          this.lsjl.unshift(item);
          localStorage.lsjl = JSON.stringify(this.lsjl);
        });
    },
    //防抖函数
    debounceClickTest: debounce(function () {
      this.clickTest(); //调用下面clickTest方法
    }, 1000),
    clickTest() {
      this.$netClient
        .search({
          params: {
            goodsName: this.key,
            page: 1,
            pageSize: 20,
          },
        })
        .then((res) => {
          console.log(res);
          this.search = [];
          this.search = res.data.data;
          this.lsjl.unshift(this.key);
          localStorage.lsjl = JSON.stringify(this.lsjl);
        });
    },
    clickbox() {
      //非空校验
      if (this.key == "") {
        this.$toast("搜索不能为空哦！");
        return;
      }
      localStorage.lsjl = JSON.stringify(this.lsjl);
      // 输入框输入内容搜索
    },
    //删除单条数据
    del(index) {
      this.$dialog
        .confirm({
          title: "清空单条数据记录",
          message: "确认要删除该条历史记录吗？",
        })
        .then(() => {
          this.lsjl.splice(index, 1);
          localStorage.lsjl = JSON.stringify(this.lsjl);
          this.$toast("删除成功！");
        });
    },
    //显示隐藏
    cmo() {
      this.show = true;
    },
    //清空全部数据
    Null() {
      this.$dialog
        .confirm({
          title: "清空全部数据记录",
          message: "该操作将清空所有历史记录，请确认？",
        })
        .then(() => {
          this.lsjl = [];
          localStorage.lsjl = JSON.stringify(this.lsjl);
          this.$toast("记录被清空了呢!");
        });
    },
    //返回首页
    Main() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.div1 {
  width: 100%;
  overflow: hidden;
}
.nav {
  width: 100%;
  text-align: center;
  margin-right: 5px;
  margin-bottom: 5px;
  position: fixed;
  background: white;
  z-index: 10;
}
.vant_top {
  float: left;
  font-size: 20px;
  color: gray;
  margin-top: 18px;
  padding-left: 8px;
}
.p1 {
  display: inline-block;
  margin-top: 18px;
  padding-right: 28px;
}
hr {
  width: 100%;
  height: 1px;
  border: none;
  background: gainsboro;
}
.boxbtn {
  text-align: center;
}
.vantbtn {
  width: 220px;
  margin-top: 6px;
}
.box_center {
  margin-top: 105px;
}
.top_search_content {
  border: 1px solid rgb(167, 164, 164);
  text-align: center;
  float: left;
  padding-left: 5px;
  padding-right: 5px;
  color: rgb(167, 164, 164);
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  margin: 3px 5px;
  border-radius: 4px;
}
.top_search {
  margin-left: 40px;
  margin-right: 40px;
}
.lsjl {
  margin-left: 15px;
  margin-right: 15px;
  border-bottom: 1px solid rgb(241, 241, 241);
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.vantcuo {
  font-size: 8px;
  float: right;
  line-height: 40px;
}
.footer {
  margin-left: 2%;
  margin-right: 2%;
  width: 46%;
  float: left;
  margin-top: 15px;
  height: 295px;
}
.footer img {
  border-radius: 5px;
}
.pp1 {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>