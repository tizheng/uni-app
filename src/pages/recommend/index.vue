<script setup lang="ts">
import { computed, reactive } from 'vue'

import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { PreferenceDataResult, SubType } from '@/types/recommends'
//引入推荐api
import { getRecommendList } from '@/service/recommend'
import type { hotPreferenceType } from '@/service/recommend'
interface metaType {
  title: string
  coverPath: string
  tabs: string[]
}

const metaMap = reactive<{ [key: string]: metaType }>({
  1: {
    title: '特惠推荐',
    coverPath:
      'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_1.jpg',
    tabs: ['价格', '折扣', '筛选'],
  },
  2: {
    title: '爆款推荐',
    coverPath:
      'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_2.jpg',
    tabs: ['24小时热搜', '热销总榜', '人气周榜'],
  },
  3: {
    title: '一站买全',
    coverPath:
      'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_3.jpg',
    tabs: ['搞定熊孩子', '家里不凌乱', '让音质更出众'],
  },
  5: {
    title: '新鲜好物',
    coverPath:
      'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/recommend_4.jpg',
    tabs: ['抢先尝新', '新品预告'],
  },
})

let type = $ref('1')
let meta = $ref(metaMap[type])
const hotPreferenceData = ref<PreferenceDataResult>({} as PreferenceDataResult)
const page = ref<any>('1')
const pageSize = ref(10)
const pages = ref('')
const recommendType = [
  {
    type: '1',
    url: '/hot/preference', // 特惠推荐
  },
  {
    type: '2',
    url: '/hot/inVogue', // 爆款推荐
  },
  {
    type: '3',
    url: '/hot/oneStop', // 一站买全
  },
  {
    type: '4',
    url: '/hot/new', // 新鲜好物
  },
]
const subTypes = ref<SubType[]>([])
onLoad(async ({ type }) => {
  if (!type) return
  getRecommendListEl(type)
})
const getRecommendListEl = async (type: string) => {
  const currentUrl = recommendType.find((item) => item.type === type)
  const res = await getRecommendList(currentUrl!.url, {})
  hotPreferenceData.value = res.result
  subTypes.value = res.result.subTypes
  pages.value = res.result.subTypes[activeEl.value].goodsItems.pages
  uni.setNavigationBarTitle({
    title: hotPreferenceData.value.title,
  })
}
const activeEl = ref(0)
const switchIndex = (index: number) => {
  activeEl.value = index
}

// 动态更新导航栏标题
uni.setNavigationBarTitle({
  title: meta.title,
})

const flag = ref(true)

const handleScrolltolower = async () => {
  const currSubTypes = hotPreferenceData.value.subTypes[activeEl.value]
  const total = currSubTypes.goodsItems.counts
  if (page.value >= pages.value) {
    flag.value = false
    //uniapp消息提示
    uni.showToast({
      title: '没有数据了',
      icon: 'none',
    })
    return false
  } else {
    const currentUrl = recommendType.find((item) => item.type === type)
    const res = await getRecommendList(currentUrl!.url, {
      page: page.value++,
      pageSize: pageSize.value,
      subType: currSubTypes.id,
    })
    hotPreferenceData.value.subTypes[activeEl.value].goodsItems.items.push(
      ...res.result.subTypes[activeEl.value].goodsItems.items
    )
  }
}
</script>
<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="hotPreferenceData.bannerPicture"></image>
    </view>
    <view class="tabs">
      <text
        class="text"
        v-for="(item, index) in hotPreferenceData.subTypes"
        :key="item.id"
        :class="{ active: index === activeEl }"
        @tap="switchIndex(index)"
        >{{ item.title }}
      </text>
    </view>
    <scroll-view
      scroll-y
      enhanced
      :show-scrollbar="false"
      class="scroll-view"
      v-for="(item, index) in subTypes"
      :key="item.id"
      v-show="activeEl === index"
      @scrolltolower="handleScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          :url="`/pages/goods/index?id=${item.id}`"
          class="navigator"
          v-for="(i, ind) in item.goodsItems.items"
        >
          <image class="thumb" :src="i.picture"></image>
          <view class="name ellipsis">{{ i.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ i.price }}</text>
            <text class="decimal">.00</text>
          </view>
        </navigator>
      </view>
      <view class="loading">{{ flag ? '加载中' : '没有数据了' }}</view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;

  position: absolute;
  left: 0;
  top: 0;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.tabs .text {
  margin: 0 20rpx;
  position: relative;
}

.tabs .active::after {
  content: '';
  width: 40rpx;
  height: 4rpx;
  transform: translate(-50%);
  background-color: #27ba9b;
  position: absolute;
  left: 50%;
  bottom: 24rpx;
}

.scroll-view {
  flex: 1;
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
}

.goods .navigator {
  width: 345rpx;
  padding: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}

.goods .thumb {
  width: 305rpx;
  height: 305rpx;
}

.goods .name {
  height: 88rpx;
  font-size: 26rpx;
}

.goods .price {
  line-height: 1;
  color: #cf4444;
  font-size: 30rpx;
}

.goods .symbol,
.goods .decimal {
  font-size: 70%;
}
</style>
