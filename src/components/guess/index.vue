<script setup lang="ts">
import type { guessLikeItem } from '@/types/home'
defineProps<{
  source: guessLikeItem[]
}>()
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      v-for="item in source"
      :url="`/pages/goods/index?id=${item.id}`"
      class="navigator"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>{{ item.price
        }}<text class="small">.00</text>
      </view>
    </navigator>
    <!-- <navigator url="/pages/goods/index" class="navigator">
      <image
        class="image"
        mode="aspectFill"
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_2.jpg"
      ></image>
      <view class="name">肖勒超薄防水手表精钢材质放水水功能</view>
      <view class="price">
        <text class="small">¥</text>899<text class="small">.00</text>
      </view>
    </navigator>
    <navigator url="/pages/goods/index" class="navigator">
      <image
        class="image"
        mode="aspectFill"
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
      ></image>
      <view class="name">肖勒超薄防水手表精钢材质放水水功能</view>
      <view class="price">
        <text class="small">¥</text>899<text class="small">.00</text>
      </view>
    </navigator>
    <navigator url="/pages/goods/index" class="navigator">
      <image
        class="image"
        mode="aspectFill"
        src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_4.jpg"
      ></image>
      <view class="name">肖勒超薄防水手表精钢材质放水水功能</view>
      <view class="price">
        <text class="small">¥</text>899<text class="small">.00</text>
      </view>
    </navigator> -->
  </view>
</template>

<style>
:host {
  display: block;
}

/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
}

.caption .text {
  display: block;
  padding: 0 28rpx 0 30rpx;
  position: relative;
}

.caption .text::before,
.caption .text::after {
  content: '';
  position: absolute;
  top: 6rpx;
  width: 20rpx;
  height: 20rpx;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/bubble.png);
  background-size: contain;
}

.caption .text::before {
  left: 0;
}

.caption .text::after {
  right: 0;
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
}

.guess .navigator {
  width: 345rpx;
  padding: 24rpx 20rpx 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
  background-color: #fff;
}

.guess .image {
  height: 260rpx;
}

.guess .name {
  height: 75rpx;
  margin: 10rpx 0;
  font-size: 26rpx;
  color: #262626;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.guess .price {
  line-height: 1;
  padding-top: 4rpx;
  color: #cf4444;
  font-size: 26rpx;
}

.guess .small {
  font-size: 80%;
}
</style>
