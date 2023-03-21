<!--
此文件为开发者工具生成，生成时间: 2023/3/21上午9:36:10
使用方法：
在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\goods\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\goods\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <scroll-view
      enhanced="true"
      scroll-with-animation="true"
      scroll-y="true"
      class="viewport"
      id="scrollView"
      enable-back-to-top="true"
    >
      <view
        is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
        class="back"
      >
        <text
          class="uni-icons icons--uni-icons uniui-back icons--uniui-back sk-pseudo sk-pseudo-circle"
          style="color: #fff; font-size: 20px"
        ></text>
      </view>
      <view
        class="goods anchor"
        data-anchor-index="0"
        style="scroll-snap-align: none"
      >
        <view class="preview">
          <swiper circular="true" current="0" autoplay="false">
            <swiper-item
              style="
                position: absolute;
                width: 100%;
                height: 100%;
                transform: translate(0%, 0px) translateZ(0px);
              "
            >
              <image class="sk-image"></image>
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current sk-transparent sk-opacity">1</text>
            <text class="split sk-transparent sk-opacity">/</text>
            <text class="total sk-transparent sk-opacity">5</text>
          </view>
        </view>
        <view class="meta">
          <view class="price">
            <text class="symbol sk-transparent sk-opacity">¥</text>
            <text class="number sk-transparent sk-text-18-7500-39 sk-text"
              >251.00</text
            >
            <text class="decimal sk-transparent sk-text-18-7500-92 sk-text"
              >.00</text
            >
          </view>
          <view class="brand">
            <image class="sk-image"></image>
          </view>
          <view class="name ellipsis sk-transparent sk-text-14-2857-140 sk-text"
            >三种调性一款轻硬无短板的综合竿app</view
          >
          <view class="remarks sk-transparent sk-text-0-0000-273 sk-text"
            >【明星单品】霸道轻量版大物竿钓竿鱼竿</view
          >
        </view>
        <view class="related">
          <view class="item arrow sk-pseudo sk-pseudo-circle">
            <text class="label sk-transparent sk-text-18-7500-659 sk-text"
              >选择</text
            >
            <text
              class="text ellipsis sk-transparent sk-text-18-7500-725 sk-text"
              >白色 红外体温计 1件</text
            >
          </view>
          <view class="item arrow sk-pseudo sk-pseudo-circle">
            <text class="label sk-transparent sk-text-18-7500-747 sk-text"
              >送至</text
            >
            <view>
              <text
                class="text ellipsis sk-transparent sk-text-18-7500-234 sk-text"
                >山西省 太原市 小店区</text
              >
            </view>
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="item arrow sk-pseudo sk-pseudo-circle">
            <text class="label sk-transparent sk-text-18-7500-207 sk-text"
              >服务</text
            >
            <text
              class="text ellipsis sk-transparent sk-text-18-7500-614 sk-text"
              >无忧退 快速退款 免费包邮</text
            >
          </view>
        </view>
      </view>
      <view
        class="comments panel anchor"
        data-anchor-index="1"
        style="scroll-snap-align: none"
      >
        <view class="title arrow sk-pseudo sk-pseudo-circle">
          <text class="sk-transparent sk-text-0-0000-812 sk-text">评价</text>
          <navigator
            class="more sk-transparent sk-text-0-0000-46 sk-text"
            hover-class="none"
            >好评度 70%</navigator
          >
        </view>
      </view>
    </scroll-view>
    <view class="toolbar">
      <view class="icons">
        <button
          class="collect sk-transparent sk-button sk-pseudo sk-pseudo-circle"
        >
          <text class="icon-heart sk-pseudo sk-pseudo-circle"></text>收藏
        </button>
        <button
          class="contact sk-transparent sk-button sk-pseudo sk-pseudo-circle"
          open-type="contact"
        >
          <text class="icon-handset sk-pseudo sk-pseudo-circle"></text>客服
        </button>
        <button
          class="cart sk-transparent sk-button sk-pseudo sk-pseudo-circle"
        >
          <text class="icon-cart sk-pseudo sk-pseudo-circle"></text>购物车
        </button>
      </view>
      <view class="buttons">
        <view
          class="addcart sk-transparent sk-text-31-6667-420 sk-text"
          data-button-type="cart"
          style="background-position-x: 50%"
        >
          加入购物车
        </view>
        <view
          class="payment sk-transparent sk-text-31-6667-247 sk-text"
          data-button-type="payment"
          style="background-position-x: 50%"
        >
          立即购买
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style>
/*
此文件为开发者工具生成，生成时间: 2023/3/21上午9:36:10

在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\goods\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-18-7500-39 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 86.25rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-18-7500-92 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 52.5rpx;
  position: relative !important;
}
.sk-text-14-2857-140 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 42.6563rpx;
  position: relative !important;
}
.sk-text-0-0000-273 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 23.4375rpx;
  position: relative !important;
}
.sk-text-18-7500-659 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-725 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-747 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-234 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-207 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-614 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-0-0000-812 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}
.sk-text-0-0000-46 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 23.4375rpx;
  position: relative !important;
}
.sk-text-31-6667-420 {
  background-image: linear-gradient(
    transparent 31.6667%,
    #eeeeee 0%,
    #eeeeee 68.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 70.3125rpx;
  position: relative !important;
}
.sk-text-31-6667-247 {
  background-image: linear-gradient(
    transparent 31.6667%,
    #eeeeee 0%,
    #eeeeee 68.3333%,
    transparent 0%
  ) !important;
  background-size: 100% 70.3125rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
