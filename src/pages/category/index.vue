<script setup lang="ts">
import carousel from '@/components/carousel/index.vue'
import { getRecommendList } from '@/service/Category'
import { Category, Child } from '@/types/category'
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'
import type { getBannerList } from '@/types/home'
import { getBanner } from '@/service/banner'
const categoryList = ref<Category[]>([])
const distributionSite = ref(2)
const initCategoryList = async () => {
  const res = await getRecommendList()
  categoryList.value = res.result
}
let bannerData = ref<getBannerList>([])
const initGetBannerList = async () => {
  const res = await getBanner(distributionSite.value)
  bannerData.value = res.result
}
const activeInd = ref(0)
const activeIndex = (index: number) => {
  activeInd.value = index
  //滚动条回到顶部
  scrollTop.value = scrollTop.value ? 0 : 1
}
const categorySubList = computed(() => {
  return categoryList.value[activeInd.value]?.children
})
const scrollTop = ref(0)

onLoad(() => {
  initCategoryList()
  initGetBannerList()
})
</script>

<template>
  <view class="viewport">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 主分类（一级类目） -->
      <scroll-view
        class="primary"
        enhanced
        scroll-y="true"
        :show-scrollbar="false"
      >
        <view
          class="item"
          v-for="(item, index) in categoryList"
          :class="{ active: activeInd === index }"
          :key="item.id"
          @tap="activeIndex(index)"
          >{{ item.name }}</view
        >
      </scroll-view>
      <!-- 次分类（二级类目） -->
      <scroll-view
        class="secondary"
        enhanced
        scroll-y
        :show-scrollbar="false"
        :scroll-top="scrollTop"
      >
        <!-- 焦点图 -->
        <carousel class="banner" :source="bannerData"></carousel>
        <!-- 区块 -->
        <view class="panel" v-for="item in categorySubList" :key="item.id">
          <view class="title">
            {{ item.name }}
            <navigator
              class="more"
              hover-class="none"
              :url="`/pages/goods/list/index?id=${item.id}`"
              >全部</navigator
            >
          </view>
          <view class="section">
            <navigator
              hover-class="none"
              :url="`/pages/goods/index?id=${goods.id}`"
              v-for="goods in item.goods"
            >
              <image :src="goods.picture"></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
                <text class="decimal">.00</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;
}

.search .input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64rpx;
  padding-left: 26rpx;
  color: #8b8b8b;
  font-size: 28rpx;
  border-radius: 32rpx;
  background-color: #f3f4f4;
}

.icon-search::before {
  margin-right: 10rpx;
}

/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}

/* 主分类 */
.primary {
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;
}

.primary .item {
  height: 96rpx;
  text-align: center;
  line-height: 96rpx;
  font-size: 26rpx;
  color: #595c63;
  position: relative;
}

.primary .active::before {
  position: absolute;
  left: 0;
  top: 0;

  content: '';
  width: 8rpx;
  height: 100%;
  background-color: #27ba9b;
}

.primary .item::after {
  position: absolute;
  left: 42rpx;
  bottom: 0;

  content: '';
  width: 96rpx;
  border-top: 1rpx solid #e3e4e7;
}

.primary .active {
  background-color: #fff;
}

.primary .item:last-child::after,
.primary .active::after {
  display: none;
}

/* 次分类 */
.secondary {
  background-color: #fff;
}

.secondary .banner {
  height: 200rpx;
  margin: 30rpx;
  border-radius: 4rpx;
  overflow: hidden;
}

.secondary .panel {
  margin: 0 30rpx 0rpx;
}

.secondary .title {
  height: 60rpx;
  line-height: 60rpx;
  color: #333;
  font-size: 28rpx;
  border-bottom: 1rpx solid #f7f7f8;
}

.secondary .title .more {
  float: right;
  padding-left: 20rpx;
  font-size: 24rpx;
  color: #999;
}

.secondary .more::after {
  font-family: 'erabbit' !important;
  content: '\e6c2';
}

.secondary .section {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 0;
}

.secondary .section navigator {
  /* flex: 1; */
  width: 150rpx;
  /* text-align: center; */
  margin: 0rpx 30rpx 20rpx 0;
}

.secondary .section navigator:nth-child(3n) {
  margin-right: 0;
}

.secondary navigator image {
  width: 126rpx;
  height: 126rpx;
}

.secondary navigator .name {
  /* display: block; */
  font-size: 26rpx;
  color: #333;
}

.secondary navigator .price {
  font-size: 18rpx;
  color: #cf4444;
}

.secondary navigator .number {
  font-size: 24rpx;
  margin-left: 2rpx;
}
</style>
