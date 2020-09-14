<template>
  <div class="div1">
    <div class="vant">
      <!-- 联系人卡片 -->
      <van-contact-card
        :type="cardType"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="showList = true"
      />

      <!-- 联系人列表 -->
      <van-popup v-model="showList" position="bottom">
        <van-contact-list
          v-model="chosenContactId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
      </van-popup>

      <!-- 联系人编辑 -->
      <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
          :contact-info="editingContact"
          :is-edit="isEdit"
          @save="onSave"
          @delete="onDelete"
          :tel-validator="moweitj"
        />
      </van-popup>
    </div>
    <div class="nav">
      <van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="image"></div>
    <div class="box2">
      <div class="dingdan">
        <div class="dingdan_content" v-for="(item,index) in dingdanlist" :key="index">
          <div class="title">
            <img :src="item[1].shopLogo" alt />
            {{item[1].shopName}}
            <span>
              <van-icon name="arrow" />
            </span>
          </div>

          <van-card
            :num="item[2]"
            :desc="'原价：'+item[0].goodsOldPrice"
            :price="item[0].goodsPrice"
            :title="item[0].goodsName"
            :thumb="item[0].goodsLogo"
          />
          <div class="box1">
            <img src="../../public/img/1599650622(1).jpg" alt />
            <span class="sp1">商品小计</span>
            <span class="sp2">￥{{item[0].goodsPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom:70px"></div>
    <div class="bottom">
      <span>合计:￥{{num}}</span>
      <button @click="onSubmit">去支付</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      num: 0,
      dingdanlist: [], //订单信息数据
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      userdata: "",
      list: this.$store.state.list, //把vuex中的list拿过来
    };
  },

  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
    },
  },
  created() {
    //订单数据
    this.id = this.$route.query.id;
    this.$netClient
      .dingdan({
        params: {
          goodsid: this.id,
        },
      })
      .then((res) => {
        this.dingdanlist = res.data.data;
        console.log(res);
        //计算总价
        this.dingdanlist.map((item) => {
          this.num += item[0].goodsPrice;
        });
      });
  },
  methods: {
    moweitj() {
      return true; //手机号校验  为true 反正就是不校验
    },
    // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
      // this.$store.commit("setlist", this.list); //vuex 修改
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
      localStorage.list = JSON.stringify("setlist", this.list); //vuex 修改
    },

    // 选中联系人
    onSelect(eve) {
      this.showList = false;
      this.userdata = eve;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map((item) =>
          item.id === info.id ? info : item
        );
      } else {
        this.list.push(info);
        this.$store.commit("setlist", this.list);
      }
      this.chosenContactId = info.id;
      this.$store.commit("setlist", this.list); //修改保存
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter((item) => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
      this.$store.commit("setlist", this.list); //vuex删除
    },
    //跳转去支付页面
    onSubmit() {
      //确认支付 但未完成付款操作
      this.$netClient
        .querenzhifu(
          qs.stringify({
            price: this.goodsPrice,
            consignee_addr: this.userdata.tel,
            goodsId: this.id,
            isFcart: "yes",
            num: 0,
          })
        )
        .then((res) => {
          console.log(res);
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
          });
          this.$router.push({
            path: "/Zhifu",
            query: {
              id: res.data.data, //传递订单编号前的数组
            },
          });
        });
    },
    //返回上一页
    onClickLeft() {
      this.$router.push({
        path: "/Shop",
      });
    },
  },
};
</script>

<style scoped>
.vant {
  margin-top: 50px;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background: white;
}
.dingdan {
  margin-top: 30px;
}
.image {
  overflow: hidden;
}
.image img {
  margin-top: 70px;
  margin-left: 20px;
  width: 45px;
  float: left;
}
.image span {
  float: left;
  line-height: 45px;
  margin-top: 70px;
  margin-left: 8px;
}
.title {
  margin-left: 15px;
  margin-right: 8px;
  margin-bottom: 15px;
}
.title img {
  width: 24px;
  border-radius: 50%;
  position: relative;
  top: 5px;
}
.van-card {
  background: white;
}
.title span {
  color: gray;
  position: relative;
  top: 3px;
}
.box1 {
  overflow: hidden;
  margin-bottom: 20px;
  height: 192px;
  border-bottom: 10px solid rgb(245, 244, 244);
}
.box1 img {
  padding-left: 6px;
}
.sp1 {
  float: left;
  margin-left: 16px;
  color: rgb(83, 83, 83);
  margin-top: 10px;
  font-weight: 600;
  font-size: 14px;
}
.sp2 {
  float: right;
  margin-right: 16px;
  color: rgb(83, 83, 83);
  font-size: 14px;
  margin-top: 10px;
  font-weight: 600;
}
.box2 {
  width: 100%;
}
.bottom {
  background: rgb(255, 255, 255);
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
}
.bottom span {
  line-height: 60px;
  padding-left: 150px;
  color: red;
}
.bottom button {
  border: none;
  outline: none;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: #ff5577;
  color: white;
  border-radius: 30px;
  float: right;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>