<script setup lang="ts">
import clause from './components/clause/index.vue'
import helps from './components/helps/index.vue'
import shipment from './components/shipment/index.vue'
import sku from './components/sku/index.vue'
import { toRef, ref, computed } from 'vue'
import useAppStore from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import { getRecommendList } from '@/service/goods'
import { GoodsResult } from '@/types/goods'
import { GoodsSku } from '@/types/spcGoods'
import goodsSketch from '@/components/goods-sketch/index.vue'
import goodsSkuPopup from '@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue'
import { addCarts, getCarts } from '@/service/cart'
import type { cartListResult } from '@/types/cart'
const appStore = useAppStore()
const safeArea = toRef(appStore, 'safeArea')
// 返回上一页
const goBack = () => {
  uni.navigateBack({})
}

// 跳转到购物车页面
const goCart = () => {
  uni.navigateTo({ url: '/pages/cart/default' })
}

// 弹窗
const popup = ref<{
  open(): void
  close(): void
}>()

type Layer = 'helps' | 'sku' | 'shipment' | 'clause'
const layer = ref<Layer>('helps')

// 显示弹层
const showHalfDialog = (layerName: Layer) => {
  layer.value = layerName
  popup.value!.open()
}
// 关闭弹层
const hideHalfDialog = () => {
  popup.value!.close()
}
const goodsInfo = ref({} as GoodsSku)
const goodsList = ref<GoodsResult>({} as GoodsResult)
const initGoodsList = async (id: string) => {
  const res = await getRecommendList(goodsProps.id)
  goodsList.value = res.result

  goodsInfo.value = {
    _id: goodsList.value.id,
    name: goodsList.value.name,
    goods_thumb: goodsList.value.mainPictures[0],
    sku_list: goodsList.value.skus.map((item) => {
      return {
        _id: item.id,
        goods_id: goodsList.value.id,
        goods_name: goodsList.value.name,
        image: goodsList.value.mainPictures[0],
        price: Number(item.price),
        sku_name_arr: item.specs.map((spec) => spec.valueName),
        stock: item.inventory,
      }
    }),
    spec_list: goodsList.value.specs.map((spec) => {
      return {
        list: spec.values.map((item) => {
          return {
            name: item.name,
          }
        }),
        name: spec.name,
      }
    }),
  }
}
const goodsProps = defineProps<{
  id: string
}>()
const currentIndex = ref(0)
const swiperChanged = (e: WechatMiniprogram.SwiperChange) => {
  currentIndex.value = e.detail.current
}
const back = () => {
  const currentPages = getCurrentPages()
  //返回上一级
  if (currentPages.length > 1) {
    uni.navigateBack({})
  } else {
    //返回首页
    uni.switchTab({
      url: '/pages/index/index',
    })
  }
  if (currentPages.length === 1) {
  }
}

const handleTap = (item: string) => {
  //预览图片
  uni.previewImage({
    current: item, // 当前显示图片的http链接
    urls: goodsList.value.mainPictures, // 需要预览的图片http链接列表
  })
}
const skuRef = ref()
const selectArrText = computed(() => {
  if (skuRef.value) {
    return skuRef.value?.selectArr.join('')
  }
})
const skuKey = ref(false)
type skuModeType = {
  1: number // sku
  2: number // car
  3: number // now
}
const skuMode = ref(1)
const showDialog = (number: number) => {
  skuMode.value = number
  skuKey.value = true
}
const addCart = async (ev: any) => {
  await addCarts(ev._id, ev.buy_num)
  uni.showToast({ title: '添加到购物车成功' })
  skuKey.value = false
}

onLoad(({ id }) => {
  if (id) {
    initGoodsList(id)
  }
})
</script>

<template>
  <scroll-view
    scroll-y
    enhanced
    :bounces="false"
    :show-scrollbar="false"
    scroll-with-animation
    class="viewport"
    id="scrollView"
  >
    <uni-icons
      type="back"
      size="20"
      color="#fff"
      class="back"
      @tap="back"
    ></uni-icons>
    <!-- 商品信息 -->
    <goodsSketch v-if="!goodsList.id"></goodsSketch>
    <template v-else>
      <view class="goods anchor" data-anchor-index="0">
        <view class="preview">
          <swiper circular @change="swiperChanged">
            <swiper-item v-for="(item, index) in goodsList.mainPictures">
              <image :src="item" @tap="handleTap(item)" />
            </swiper-item>
          </swiper>
          <view class="indicator">
            <text class="current">{{ currentIndex + 1 }}</text>
            <text class="split">/</text>
            <text class="total">5</text>
          </view>
        </view>
        <view class="meta">
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goodsList.price }}</text>
            <text class="decimal">.00</text>
          </view>
          <view class="brand">
            <image :src="goodsList.brand.logo" />
          </view>
          <view class="name ellipsis">
            {{ goodsList.desc }}
          </view>
          <view class="remarks"> {{ goodsList.name }}</view>
        </view>
        <view class="related">
          <view @tap="showDialog(1)" class="item arrow">
            <text class="label">选择</text>
            <text class="text ellipsis">{{
              selectArrText || '请选择规格'
            }}</text>
          </view>
          <view @tap="showHalfDialog('shipment')" class="item arrow">
            <text class="label">送至</text>
            <view v-for="item in goodsList.userAddresses">
              <text class="text ellipsis" v-if="item.isDefault">{{
                item.fullLocation
              }}</text></view
            >
          </view>
          <view @tap="showHalfDialog('clause')" class="item arrow">
            <text class="label">服务</text>
            <text class="text ellipsis">无忧退 快速退款 免费包邮</text>
          </view>
        </view>
      </view>
      <!-- 商品评价 -->
      <view class="comments panel anchor" data-anchor-index="1">
        <view class="title arrow">
          <text>评价</text>
          <navigator url="/pages/comments/index" hover-class="none" class="more"
            >好评度 70%</navigator
          >
        </view>
        <view class="comment">
          <view class="caption">
            <view class="user">
              <image
                class="avatar"
                src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_2.jpg"
              />
              <text>白月初</text>
            </view>
            <view class="rating">
              <view class="rank" style="width: 80%"></view>
            </view>
          </view>
          <view class="content">
            <view class="text"> 质量不错，灵敏度高，结构巧妙，款式也好看 </view>
            <view class="pictures">
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
            </view>
            <view class="extra">
              <text class="date">购买时间: 2020-11-11</text>
              <text class="type">黑色 公开版 128G</text>
            </view>
          </view>
        </view>
        <view class="comment">
          <view class="caption">
            <view class="user">
              <image
                class="avatar"
                src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/avatar_3.jpg"
              />
              <text>白月初</text>
            </view>
            <view class="rating">
              <view class="rank" style="width: 60%"></view>
            </view>
          </view>
          <view class="content">
            <view class="text"> 质量不错，灵敏度高，结构巧妙，款式也好看 </view>
            <view class="pictures">
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_2.jpg"
                />
              </view>
              <view class="picture">
                <image
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/comment_1.jpg"
                />
              </view>
            </view>
            <view class="extra">
              <text class="date">购买时间: 2020-11-11</text>
              <text class="type">黑色 公开版 128G</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="detail panel anchor" data-anchor-index="2">
        <view class="title">
          <text>详情</text>
        </view>
        <view class="content">
          <view class="properties">
            <!-- 商品详情属性 -->
            <view
              class="item"
              v-for="item in goodsList.details?.properties"
              :key="item.name"
            >
              <text class="label">{{ item.name }}</text>
              <text class="value">{{ item.value }}</text>
            </view>
          </view>
          <image
            mode="widthFix"
            v-for="(item, index) in goodsList.details?.pictures"
            :key="index"
            :src="item"
          ></image>
        </view>
      </view>
      <!-- 常见问题 -->
      <view class="help arrow" @tap="showHalfDialog('helps')">
        <text class="icon-help"></text>
        <navigator hover-class="none">常见问题</navigator>
      </view>
      <!-- 推荐 -->
      <view class="recommend panel anchor" data-anchor-index="3">
        <view class="title">
          <text>推荐</text>
        </view>
        <view class="content">
          <navigator
            :url="`/pages/goods/index/${item.id}`"
            hover-class="none"
            v-for="item in goodsList.similarProducts"
          >
            <image class="image" mode="aspectFit" :src="item.picture"></image>
            <view class="name ellipsis">{{ item.name }}</view>
            <view class="price">
              <text class="symbol">¥</text>
              <text class="number">{{ item.price }}</text>
              <text class="decimal">.00</text>
            </view>
          </navigator>
        </view>
      </view>
    </template>
  </scroll-view>
  <!-- 用户操作 -->
  <view class="toolbar">
    <view class="icons">
      <button class="collect"><text class="icon-heart"></text>收藏</button>
      <button class="contact" open-type="contact">
        <text class="icon-handset"></text>客服
      </button>
      <button class="cart" @tap="goCart">
        <text class="icon-cart"></text>购物车
      </button>
    </view>
    <view class="buttons">
      <view @tap="showDialog(2)" data-button-type="cart" class="addcart">
        加入购物车
      </view>
      <view @tap="showDialog(3)" data-button-type="payment" class="payment">
        立即购买
      </view>
    </view>
  </view>

  <uni-popup type="bottom" ref="popup" background-color="#fff">
    <view class="popup-root">
      <text @tap="hideHalfDialog" class="close icon-close"></text>
      <sku button-type="" v-if="layer === 'sku'" :goods-list="goodsList"></sku>
      <shipment
        :goods-list="goodsList.userAddresses"
        v-if="layer === 'shipment'"
      ></shipment>
      <clause v-if="layer === 'clause'"></clause>
      <helps v-if="layer === 'helps'"></helps>
    </view>
  </uni-popup>
  <goodsSkuPopup
    ref="skuRef"
    v-model="skuKey"
    :localdata="goodsInfo"
    :mode="skuMode"
    @add-cart="addCart"
  />
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 自定义导航栏 */
.navbar {
  width: 750rpx;
  background-color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}

.navbar .search {
  height: 40px;
  padding: 1px 110px 0 50px;
}

.navbar .search .input {
  height: 62rpx;
  border-radius: 60rpx;
  font-size: 26rpx;
  color: #8b8b8b;
  background-color: #f3f4f4;
  position: relative;
}

.navbar .search .input::before {
  position: absolute;
  left: 24rpx;
  top: 50%;

  color: #b7b7b7;
  font-size: 28rpx;
  transform: translateY(-50%);
}

.navbar .wrap {
  position: relative;
}

.navbar .back {
  position: absolute;
  left: 10px;
  top: 2px;
  z-index: 9;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  font-size: 23px;
  color: #191919;
  /* color: #fff; */
  /* background-color: rgba(0, 0, 0, 0.4); */
}

.navbar .tabs {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1rpx solid #eaeaea;
}

.navbar .tabs text {
  display: block;
  padding: 10rpx 10rpx 16rpx;
  font-size: 28rpx;
  position: relative;
}

.navbar .tabs .active {
  color: #27ba9b;
  font-weight: 500;
}

.navbar .tabs .active::after {
  content: '';
  position: absolute;
  left: 18rpx;
  right: 20rpx;
  bottom: 14rpx;
  height: 4rpx;
  background-color: #27ba9b;
}

.viewport {
  background-color: #f4f4f4;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;
}

.panel .title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 90rpx;
  line-height: 1;
  padding: 30rpx 60rpx 30rpx 6rpx;
  position: relative;
}

.panel .title text {
  padding-left: 10rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  border-left: 4rpx solid #27ba9b;
}

.panel .title navigator {
  font-size: 24rpx;
  color: #666;
}

.arrow::after {
  position: absolute;
  top: 50%;
  right: 30rpx;

  content: '\e6c2';
  color: #ccc;
  font-family: 'erabbit' !important;
  font-size: 32rpx;
  transform: translateY(-50%);
}

/* 商品信息 */
.goods {
  background-color: #fff;
}

.goods .preview {
  height: 750rpx;
  position: relative;
}

.goods .preview .indicator {
  height: 40rpx;
  padding: 0 24rpx;
  line-height: 40rpx;
  border-radius: 30rpx;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  background-color: rgba(0, 0, 0, 0.3);

  position: absolute;
  bottom: 30rpx;
  right: 30rpx;
}

.goods .indicator .current {
  font-size: 26rpx;
}

.goods .indicator .split {
  font-size: 24rpx;
  margin: 0 1rpx 0 2rpx;
}

.goods .indicator .total {
  font-size: 24rpx;
}

.goods .meta {
  position: relative;
  border-bottom: 1rpx solid #eaeaea;
}

.goods .meta .price {
  height: 130rpx;
  padding: 25rpx 30rpx 0;
  color: #fff;
  font-size: 34rpx;
  box-sizing: border-box;
  background-color: #35c8a9;
}

.goods .meta .number {
  font-size: 56rpx;
}

.goods .meta .brand {
  width: 160rpx;
  height: 80rpx;
  overflow: hidden;

  position: absolute;
  top: 26rpx;
  right: 30rpx;
}

.goods .meta .name {
  max-height: 88rpx;
  line-height: 1.4;
  margin: 20rpx;
  font-size: 32rpx;
  color: #333;
}

.goods .meta .remarks {
  line-height: 1;
  padding: 0 20rpx 30rpx;
  font-size: 24rpx;
  color: #cf4444;
}

.goods .related {
  padding-left: 20rpx;
}

.goods .related .item {
  height: 90rpx;
  padding-right: 60rpx;
  border-bottom: 1rpx solid #eaeaea;
  font-size: 26rpx;
  color: #333;
  position: relative;
  display: flex;
  align-items: center;
}

.goods .related .item:last-child {
  border-bottom: 0 none;
}

.goods .related .label {
  width: 60rpx;
  color: #898b94;
  margin: 0 16rpx 0 10rpx;
}

.goods .related .text {
  flex: 1;
  -webkit-line-clamp: 1;
}

/* 商品评论 */
.comments {
  padding-left: 20rpx;
}

.comments .comment {
  padding: 24rpx 40rpx 24rpx 10rpx;
  border-top: 1rpx solid #eaeaea;
}

.comments .caption {
  height: 60rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments .user {
  font-size: 26rpx;
  color: #333;
  display: flex;
  align-items: center;
}

.comments .caption .avatar {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
  border-radius: 50%;
}

.comments .rating {
  width: 144rpx;
  height: 24rpx;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/rating_off.png);
  background-size: contain;
}

.comments .rating .rank {
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/rating_on.png);
  background-size: 144rpx 24rpx;
}

.comments .content .text {
  line-height: 1.4;
  margin-top: 24rpx;
  font-size: 24rpx;
  color: #333;
}

.comments .pictures {
  display: flex;
  flex-wrap: wrap;
  margin: 20rpx 0 0 1rpx;
}

.comments .picture {
  width: 150rpx;
  height: 150rpx;
  margin-right: 27rpx;
}

.comments .picture:last-child {
  margin-right: 0;
}

.comments .content .extra {
  display: flex;
  justify-content: space-between;
  margin: 20rpx 1rpx 0 0;
  font-size: 22rpx;
  color: #666;
}

/* 类似商品 */
.similar {
  margin-top: 20rpx;
}

.similar .bar {
  display: flex;
  align-items: center;
  height: 90rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
}

.similar .bar text {
  flex: 1;
  text-align: center;
  position: relative;
}

.similar .bar .active::after {
  content: '';
  display: block;
  width: 60rpx;
  height: 4rpx;
  background-color: #27ba9b;
  transform: translateX(-50%);
  position: absolute;
  left: 50%;
  bottom: -5rpx;
}

.similar .content {
  padding-top: 20rpx;
  background-color: #f4f4f4;
  white-space: nowrap;
}

.similar .content navigator {
  display: inline-block;
  width: 200rpx;
  height: 270rpx;
  padding: 15rpx 15rpx 0;
  margin-right: 15rpx;
  background-color: #fff;
  border-radius: 6rpx;
}

.similar .content navigator:first-child {
  margin-left: 15rpx;
}

.similar .content image {
  height: 172rpx;
}

.similar .content .name {
  max-height: 64rpx;
  line-height: 1.2;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
  -webkit-line-clamp: 1;
}

.similar .content .price {
  font-size: 18rpx;
  color: #cf4444;
}

.similar .content .number {
  font-size: 24rpx;
  margin-left: 2rpx;
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;
}

.detail .content {
  margin-left: -20rpx;
}

.detail .properties {
  padding: 0 20rpx;
  margin-bottom: 30rpx;
}

.detail .properties .item {
  display: flex;
  line-height: 2;
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
  border-bottom: 1rpx dashed #ccc;
}

.detail .properties .label {
  width: 200rpx;
}

.detail .properties .value {
  flex: 1;
}

/* 常见问题 */
.help {
  display: flex;
  align-items: center;
  padding: 20rpx 0 20rpx 20rpx;
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  position: relative;
}

.help .icon-help {
  font-size: 34rpx;
  margin-right: 6rpx;
  color: #ffa868;
}

/* 商品推荐 */
.recommend {
  padding-left: 20rpx;
}

.recommend .content {
  padding: 0 20rpx 20rpx;
  margin-left: -20rpx;
  background-color: #f4f4f4;
  overflow: hidden;
}

.recommend .content navigator {
  width: 345rpx;
  padding: 24rpx 20rpx 20rpx;
  margin: 20rpx 20rpx 0 0;
  border-radius: 10rpx;
  background-color: #fff;
  float: left;
}

.recommend navigator:nth-child(even) {
  margin-right: 0;
}

.recommend .content .image {
  height: 260rpx;
}

.recommend .content .name {
  height: 80rpx;
  margin: 10rpx 0;
  font-size: 26rpx;
  color: #262626;
}

.recommend .content .price {
  line-height: 1;
  font-size: 20rpx;
  color: #cf4444;
}

.recommend .content .number {
  font-size: 26rpx;
  margin-left: 2rpx;
}

/* 底部工具栏 */
.toolbar {
  height: 120rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar .buttons {
  display: flex;
}

.toolbar .buttons > view {
  width: 220rpx;
  text-align: center;
  line-height: 72rpx;
  font-size: 26rpx;
  color: #fff;
  border-radius: 72rpx;
}

.toolbar .buttons .addcart {
  background-color: #ffa868;
}

.toolbar .buttons .payment {
  background-color: #27ba9b;
  margin-left: 20rpx;
}

.toolbar .icons {
  padding-right: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1;
}

.toolbar .icons button {
  text-align: center;
  line-height: 1.4;
  padding: 0;
  border-radius: 0;
  font-size: 20rpx;
  color: #333;
  background-color: #fff;
}

.toolbar .icons text {
  display: block;
  font-size: 34rpx;
}
.back {
  display: block;
  width: 50rpx;
  height: 50rpx;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 50rpx;
  left: 30rpx;
  z-index: 10;
  border-radius: 50%;
  line-height: 50rpx;
  text-align: center;
}
</style>
