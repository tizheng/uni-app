<!--
此文件为开发者工具生成，生成时间: 2023/3/16上午11:25:45
使用方法：
在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\index\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
  <view class="sk-container">
    <view class="navbar sk-image" style="padding-top: 20px">
      <view class="logo">
        <image class="sk-image"></image>
        <text class="sk-transparent sk-text-0-0000-990 sk-text"
          >新鲜 · 亲民 · 快捷</text
        >
      </view>
      <view class="search">
        <text
          class="icon-search sk-transparent sk-text-18-7500-716 sk-text sk-pseudo sk-pseudo-circle"
          >搜索商品</text
        >
        <text class="icon-scan sk-pseudo sk-pseudo-circle"></text>
      </view>
    </view>
    <scroll-view
      enhanced="true"
      refresher-enabled="true"
      scroll-y="true"
      class="viewport"
      refresher-background="#f7f7f8"
    >
      <view is="components/carousel/index" style="height: 119px">
        <view class="carousel carousel-index--carousel">
          <swiper
            autoplay="false"
            circular="true"
            interval="3000"
            current="0"
          ></swiper>
          <view class="indicator carousel-index--indicator">
            <text class="dot carousel-index--dot"></text>
            <text class="dot carousel-index--dot"></text>
            <text class="dot carousel-index--dot"></text>
            <text class="dot carousel-index--dot"></text>
            <text
              class="dot carousel-index--dot active carousel-index--active"
            ></text>
          </view>
        </view>
      </view>
      <view is="pages/index/components/entries/index">
        <view class="entries index--entries">
          <scroll-view
            enhanced="true"
            scroll-x="true"
            class="scroll-view index--scroll-view"
          >
            <view class="navs index--navs" style="scroll-snap-align: none">
              <view class="navs-item index--navs-item">
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-98 sk-text"
                    style="background-position-x: 50%"
                    >居家</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-579 sk-text"
                    style="background-position-x: 50%"
                    >锦鲤</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-703 sk-text"
                    style="background-position-x: 50%"
                    >服饰</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-357 sk-text"
                    style="background-position-x: 50%"
                    >母婴</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-703 sk-text"
                    style="background-position-x: 50%"
                    >个护</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-659 sk-text"
                    style="background-position-x: 50%"
                    >严选</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-795 sk-text"
                    style="background-position-x: 50%"
                    >数码</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-786 sk-text"
                    style="background-position-x: 50%"
                    >运动</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-775 sk-text"
                    style="background-position-x: 50%"
                    >杂项</text
                  >
                </navigator>
                <navigator
                  class="navigator index--navigator"
                  hover-class="none"
                >
                  <image class="icon index--icon sk-image"></image>
                  <text
                    class="text index--text sk-transparent sk-text-18-7500-444 sk-text"
                    style="background-position-x: 50%"
                    >品牌</text
                  >
                </navigator>
              </view>
            </view>
          </scroll-view>
          <view class="scroll-bar index--scroll-bar">
            <view class="cursor index--cursor" style="left: 0%"></view>
          </view>
        </view>
      </view>
      <view class="panel recommend" style="scroll-snap-align: none">
        <view class="item">
          <view class="title sk-transparent"
            >特惠推荐
            <text class="sk-transparent sk-text-18-7500-130 sk-text"
              >精选全攻略</text
            >
          </view>
          <navigator class="cards" hover-class="none">
            <image mode="aspectFit" class="sk-image"></image>
            <image mode="aspectFit" class="sk-image"></image>
          </navigator>
        </view>
        <view class="item">
          <view class="title sk-transparent"
            >爆款推荐
            <text class="sk-transparent sk-text-18-7500-721 sk-text"
              >最受欢迎</text
            >
          </view>
          <navigator class="cards" hover-class="none">
            <image mode="aspectFit" class="sk-image"></image>
            <image mode="aspectFit" class="sk-image"></image>
          </navigator>
        </view>
        <view class="item">
          <view class="title sk-transparent"
            >一站买全
            <text class="sk-transparent sk-text-18-7500-579 sk-text"
              >精心优选</text
            >
          </view>
          <navigator class="cards" hover-class="none">
            <image mode="aspectFit" class="sk-image"></image>
            <image mode="aspectFit" class="sk-image"></image>
          </navigator>
        </view>
        <view class="item">
          <view class="title sk-transparent"
            >新鲜好物
            <text class="sk-transparent sk-text-18-7500-552 sk-text"
              >生活加分项</text
            >
          </view>
          <navigator class="cards" hover-class="none">
            <image mode="aspectFit" class="sk-image"></image>
            <image mode="aspectFit" class="sk-image"></image>
          </navigator>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
/*
此文件为开发者工具生成，生成时间: 2023/3/16上午11:25:45

在 C:\Users\宗利\Desktop\erabbit-qdjy54-xcx\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-0-0000-990 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 25.7813rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-18-7500-716 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-98 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-579 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-703 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-357 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
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
.sk-text-18-7500-795 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-786 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-775 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-444 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 41.25rpx;
  position: relative !important;
}
.sk-text-18-7500-130 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 37.5rpx;
  position: relative !important;
}
.sk-text-18-7500-721 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 37.5rpx;
  position: relative !important;
}
.sk-text-18-7500-552 {
  background-image: linear-gradient(
    transparent 18.75%,
    #eeeeee 0%,
    #eeeeee 81.25%,
    transparent 0%
  ) !important;
  background-size: 100% 37.5rpx;
  position: relative !important;
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
