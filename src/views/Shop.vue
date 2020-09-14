<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        title="购物车"
        right-text="管理"
        @click-right="onClickRight"
      />
    </div>
    <div class="shoplist" v-for="(item,index) in shoplist" :key="index">
      <van-checkbox class="check" v-model="item.ischecked" label-disabled @click="danxuan">
        <van-swipe-cell>
          <van-card
            :num="item.product_amount"
            :price="item.price"
            :title="item.title"
            class="goods-card"
            :thumb="item.image"
          />
          <template #right>
            <van-button square text="删除" @click="shanchu" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-checkbox>
    </div>
    <!-- 空状态 没有商品显示的图片 -->
    <van-empty
      v-show="shoplist.length<=0"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="没有商品！"
    />
    <div style="margin-bottom:70px"></div>
    <van-submit-bar :price="zongj" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="quanxuan">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true, //默认不全选
      shoplist: [], //购物车数据
    };
  },
  computed: {
    zongj() {
      var num = 0;
      this.shoplist.map((data) => {
        if (data.ischecked) {
          num += Number(data.product_amount) * Number(data.price);
        }
      });
      return num * 100;
    },
  },
  methods: {
    //返回详情页
    onClickLeft() {
      this.$router.push({
        path: "/Page",
      });
    },
    //删除
    shanchu() {
      this.$netClient
        .scgwc({
          params: {
            carid: " ",
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    //单选框
    danxuan() {
      var as = true; //默认选中
      this.shoplist.map((aa) => {
        //遍历当前数组，然后调用参数中的方法，返回当前方法的返回值
        if (aa.ischecked == false) {
          //有一个单选框没选中 全选就不选中
          as = false;
        }
      });
      this.checked = as;
    },
    //全选框
    quanxuan() {
      this.shoplist.map((bb) => {
        //遍历当前数组，然后调用参数中的方法，返回当前方法的返回值
        bb.ischecked = this.checked;
      });
    },
    //管理
    onClickRight() {},
    //提交订单
    onSubmit() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中...",
      });
      var aa = this.shoplist.map((aa) => {
        if (aa.ischecked) {
          return aa.product_id;
        }
      });
      var bb = aa.join(" "); //将id分割为带空格的字符串
      // console.log(bb); //商品id
      this.$router.push({
        path: "/Dingdan",
        query: {
          id: bb,
        },
      });
    },
  },
  created() {
    this.$netClient
      .gwcxx({
        params: {
          page: 1,
          pageSize: 20,
        },
      })
      .then((res) => {
        res.data.data.map((item, index) => {
          if (item == null) {
            res.data.data.splice(index, 1);
          }
        });
        this.shoplist = res.data.data;
      });
  },
};
</script>

<style scoped>
.div1 {
  width: 100%;
  margin-top: 90px;
}
.nav {
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0px;
}
.goods-card {
  margin: 0;
  background-color: rgb(250, 250, 250);
}

.delete-button {
  height: 100%;
}
.check {
  margin-top: 45px;
  margin-left: 8px;
}
.shoplist {
  margin-top: -30px;
  background-color: rgb(250, 250, 250);
}
.van-card__header {
  position: relative;
  left: -16px;
}
</style>