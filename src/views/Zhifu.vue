<template>
  <div class="div1">
    <div class="nav">
      <van-nav-bar title="确认支付" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="daojishi">
      <span class="sp1">剩余支付时间</span>
      <span>
        <van-count-down class="sp2" :time="time" format=" mm 分 ss 秒" />
      </span>
    </div>
    <h2>￥{{num}}元</h2>
    <div class="center">
      <van-radio-group v-model="radio">
        <table>
          <tr>
            <td style="width:50px;padding-left:10px">
              <img src="../../public/img/支付宝.png" alt />
            </td>
            <td style="width:270px">支付宝支付</td>
            <td @click="zhifubao">
              <van-radio name="1" label-disabled></van-radio>
            </td>
          </tr>
          <tr>
            <td style="width:50px;padding-left:10px">
              <img src="../../public/img/微信 支付.png" alt />
            </td>
            <td>微信支付</td>
            <td>
              <van-radio name="2" checked-color="#07c160"></van-radio>
            </td>
          </tr>
          <tr>
            <td style="width:50px;padding-left:10px">
              <img src="../../public/img/余额支付.png" alt />
            </td>
            <td>余额支付</td>
            <td>
              <van-radio name="3" label-disabled></van-radio>
            </td>
          </tr>
        </table>
      </van-radio-group>
    </div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      v-if="showKeyboard"
      @blur="showKeyboard = false"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    <van-button class="Bottom" type="primary" block @click="yue">确认支付</van-button>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      checked: true, //默认选中
      time: 30 * 30 * 1000, //时间
      num: 0, //0元
      value: "",
      showKeyboard: false, //失去焦点
      radio: 1,
    };
  },
  created() {
    // console.log(this.$route.query.id);
  },

  methods: {
    //支付宝支付
    zhifubao() {
      this.$netClient
        .zhifubao(
          qs.stringify({
            OutTradeNo: this.$route.query.id[0].orderNumber,
            Subject: "giao",
            ProductCode: "QUICK_WAP_WAY",
            TotalAmount: this.$route.query.num,
          })
        )
        .then((res) => {
          console.log(res);
          this.html = res.data;
          var form = res.data.data;
          const div = document.createElement("div");
          div.innerHTML = form;
          document.body.appendChild(div);
          document.forms[0].submit();
        });
    },
    //余额支付 "yuzhifu"自己起的名字 下面调用
    yuzhifu() {
      this.$netClient
        .zhifu(
          qs.stringify({
            orderNum: this.$route.query.id[0].orderNumber,
          })
        )
        .then((res) => {
          console.log(res);
        });
    },

    //点击确认支付弹框
    yue() {
      //验证密码
      this.$netClient
        .mima(
          qs.stringify({
            paypwd: 123456,
          })
        )
        .then((res) => {});
      this.showKeyboard = true; //点击立即支付弹出密码弹出
    },
    //数字键盘
    onInput(key) {
      var id = this.$route.query.id;
      this.value = (this.value + key).slice(0, 6);
      if (
        this.value.length == 6 &&
        this.value == "123456" &&
        this.radio == "3"
      ) {
        this.$toast.success("支付成功");
        this.$router.push("/Over");
        this.yuzhifu(); //调用余额支付
      } else if (
        this.value.length == 6 &&
        this.value == "615438" &&
        this.radio == "2"
      ) {
        this.zhifubao(); //调用支付宝支付
      }
      // console.log(this.van - cell__value);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    //返回上一页
    onClickLeft() {
      this.$router.push("/Dingdan");
    },
    //支付订单
    zhifu() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      //完成支付
      this.$router.push("/Over");
    },
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0px;
  width: 100%;
  background: white;
}
.daojishi {
  margin-top: 60px;
  text-align: center;
  overflow: hidden;
}
.sp1 {
  color: gray;
  float: left;
  margin-left: 29%;
}
.sp2 {
  color: gray;
  float: left;
  margin-top: 2px;
  margin-left: 5px;
}
.Bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  height: 60px;
  background: rgb(0, 159, 233);
  border: none;
}
.center {
  width: 100%;
  margin-top: 40px;
}
.center table img {
  width: 40px;
}
.center table td {
  height: 40px;
  line-height: 40px;
}
h2 {
  text-align: center;
}
</style>