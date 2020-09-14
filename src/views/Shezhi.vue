<template>
  <div class="div1">
    <div>
      <van-nav-bar title="设置" left-text="返回" @click-left="onClickLeft" left-arrow />
    </div>
    <div class="element">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            一致性 Consistency
            <i class="header-icon el-icon-info"></i>
          </template>
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item title="切换账号与注销账号的区别">
          <div>切换账号：这是清除token，返回到登录页面重新登录</div>
          <div>注销账号：不仅会清除token，还会清空登录信息，如本地的浏览记录、搜索记录、登录的账号与密码等</div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="LoginMeg">
      <hr />
      <button @click="qiehuan">切换账号</button>
      <hr />
      <div class="LoginMeg_vant">
        <van-cell :border="false" @click="showPopup">注销账号</van-cell>
        <van-popup round v-model="show" position="bottom" :style="{ height: '26%' }">
          <div class="box">
            <div class="LoginMeg_box1">您可以做以下操作</div>
            <div @click="qiehuan" class="LoginMeg_box2">换个账号登录</div>
            <div
              @click="zhuxiao"
              style="border-bottom:10px solid rgb(248, 246, 246);"
              class="LoginMeg_box3"
            >注销当前账号</div>
            <div v-show="xshi" @click="quxiao" style="border-bottom:none;" class="LoginMeg_box4">取消</div>
          </div>
        </van-popup>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      xshi: true,
    };
  },

  methods: {
    //点击显示隐藏内容
    showPopup() {
      this.show = true;
    },
    //返回上一页
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //切换账号
    qiehuan() {
      this.$dialog.confirm({
        title: "退出确认",
        message: "改操作将退出登录，是否确认？",
      });
    },
    //注销账号
    zhuxiao() {
      this.$dialog.confirm({
        title: "注销确认",
        message: "改操作将注销所有登录信息，是否确认？",
      });
    },
    quxiao() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.element {
  margin-top: 20px;
  margin-left: 16px;
  margin-right: 16px;
}
.LoginMeg {
  width: 100%;
  margin-top: 20px;
}
.LoginMeg button {
  border: none;
  outline: none;
  width: 100%;
  height: 40px;
  font-size: 14px;
  background: white;
}
hr {
  border: none;
  background: rgb(248, 246, 246);
  height: 10px;
}
.LoginMeg_vant {
  text-align: center;
  padding-left: 143.5px;
}
.box div {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(248, 246, 246);
}
.LoginMeg_box1 {
  font-size: 15px;
  color: rgb(117, 117, 117);
}
</style>