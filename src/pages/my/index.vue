<script setup lang="ts">
import { toRef, getCurrentInstance, computed } from 'vue'
import { onReady, onLoad } from '@dcloudio/uni-app'
import useAppStore from '@/store'
import { useUserStore } from '@/store/member'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const safeArea = toRef(appStore, 'safeArea')

const tabs = ['我的收藏', '猜你喜欢', '我的足迹']
const orderTypes = [
  { text: '待付款', icon: 'icon-currency', type: 1 },
  { text: '待发货', icon: 'icon-gift', type: 2 },
  { text: '待收货', icon: 'icon-check', type: 3 },
  { text: '待评价', icon: 'icon-comment', type: 4 },
]
let tabIndex = $ref(0)

// 获取页面实例
const pageInstance: any = getCurrentInstance()

const changeTab = (index: number) => {
  tabIndex = index
}

onReady(() => {
  pageInstance.ctx.$scope.animate(
    '.profile',
    [{ opacity: 1 }, { opacity: 0 }],
    500,
    {
      scrollSource: '#scrollView',
      timeRange: 500,
      startScrollOffset: 0,
      endScrollOffset: 85,
    }
  )

  pageInstance.ctx.$scope.animate(
    '.navbar',
    [{ top: '0' }, { top: '-30px' }],
    500,
    {
      scrollSource: '#scrollView',
      timeRange: 500,
      startScrollOffset: 0,
      endScrollOffset: 85,
    }
  )

  pageInstance.ctx.$scope.animate(
    '.navbar .title',
    [{ opacity: 0 }, { opacity: 1 }],
    500,
    {
      scrollSource: '#scrollView',
      timeRange: 500,
      startScrollOffset: 85,
      endScrollOffset: 100,
    }
  )
})
const member = useUserStore()
const { profile, isLogin } = storeToRefs(member)
//定义获取头像计算属性
const avatar = computed(() => {
  return profile.value.avatar
})
//定义获取用户名计算属性
const nickname = computed(() => {
  return profile.value.nickname ? profile.value.nickname : '未登录'
})
const go2Profile = () => {
  if (isLogin.value) {
    uni.navigateTo({
      url: '/pages/my/profile',
    })
  } else {
    uni.navigateTo({
      url: '/pages/my/login',
    })
  }
}
onLoad(() => {
  // console.log(member)
})
</script>

<template>
  <scroll-view scroll-y enhanced :show-scrollbar="false" id="scrollView">
    <view class="viewport" :style="{ paddingTop: safeArea!.top + 40 + 'px' }">
      <!-- 个人资料 -->
      <view class="profile">
        <view class="overview" @tap="go2Profile">
          <image class="avatar" :src="avatar"></image>
          <view class="meta">
            <view class="nickname">{{ nickname }}</view>
            <view class="extra">
              <text v-if="!isLogin" class="tips">点击登录账号</text>
              <template v-else>
                <text class="update">更新头像昵称</text>
                <text class="relogin">切换账号</text>
              </template>
            </view>
          </view>
        </view>
        <navigator class="settings" url="/pages/my/settings" hover-class="none">
          设置
        </navigator>
      </view>
      <!-- 订单 -->
      <view class="orders" :style="{ top: safeArea!.top + 48 + 'px' }">
        <view class="title">
          我的订单
          <navigator url="/pages/order/index?type=0" hover-class="none">
            查看全部订单<text class="icon-right"></text>
          </navigator>
        </view>
        <view class="section">
          <navigator
            v-for="item in orderTypes"
            :key="item.text"
            :class="item.icon"
            :url="'/pages/order/index?type=' + item.type"
            hover-class="none"
            >{{ item.text }}</navigator
          >
          <navigator class="icon-handset" url=" " hover-class="none"
            >售后</navigator
          >
        </view>
      </view>
      <!-- 部件 -->
      <view class="widgets">
        <view class="tabs">
          <text
            v-for="(item, index) in tabs"
            :key="item"
            :class="{ active: tabIndex === index }"
            @tap="changeTab(index)"
            >{{ item }}</text
          >
        </view>
        <view class="masonry">
          <template v-if="tabIndex === 0">
            <view class="column">
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
            <view class="column">
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
          </template>
          <template v-if="tabIndex === 1">
            <view class="column">
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
            <view class="column">
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
          </template>
          <template v-if="tabIndex === 2">
            <view class="column">
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_6.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_8.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_1.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_6.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_7.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
            <view class="column">
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_7.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card topic">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/topic_2.jpg"
                ></image>
                <view class="name">忙里忙外，回家吃饭</view>
                <view class="price">19.9元<text>起</text></view>
                <view class="extra">
                  <text class="icon-heart">1220</text>
                  <text class="icon-preview">1000</text>
                </view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_5.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
              <view class="card brand">
                <view class="locate">
                  <text class="icon-locate"></text>中国
                </view>
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/brand_logo_5.jpg"
                ></image>
                <view class="name">小米优购</view>
                <view class="alt">小米优购闪购嗨购</view>
              </view>
              <view class="card goods">
                <image
                  mode="widthFix"
                  src="https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_big_3.jpg"
                ></image>
                <view class="name"
                  >彩色鹅卵石小清新防水防烫长方形餐桌圆桌布艺茶几垫电视柜盖布
                  鹅软石桌布yg056</view
                >
                <view class="price">¥899</view>
              </view>
            </view>
          </template>
        </view>
      </view>
      <view class="navbar" :style="{ paddingTop: safeArea!.top + 30 + 'px' }">
        <view class="title">我的</view>
      </view>
    </view>
  </scroll-view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
  background-color: #f7f7f8;
}

scroll-view {
  height: 100%;
}

.navbar {
  width: 750rpx;
  height: 420rpx;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/center_bg.png);
  background-size: contain;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}

.navbar .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  font-size: 32rpx;
  opacity: 0;
  font-weight: bold;
}

.profile {
  position: relative;
  z-index: 99;
}

.profile .overview {
  display: flex;
  width: 500rpx;
  height: 120rpx;
  padding: 0 36rpx;
  color: #fff;
}

.profile .overview .avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}

.profile .overview .meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  line-height: 30rpx;
  padding: 16rpx 0;
  margin-left: 20rpx;
}

.profile .meta .nickname {
  max-width: 180rpx;
  margin-bottom: 16rpx;
  font-size: 30rpx;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile .meta .extra {
  display: flex;
  font-size: 20rpx;
}

.profile .meta .tips {
  font-size: 22rpx;
}

.profile .meta .update,
.profile .meta .relogin {
  padding: 3rpx 10rpx 1rpx;
  color: rgba(255, 255, 255, 0.8);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  margin-right: 10rpx;
  border-radius: 30rpx;
}

.profile .settings {
  position: absolute;
  top: 50%;
  right: 80rpx;

  line-height: 1;
  font-size: 30rpx;
  color: #fff;
  transform: translateY(-50%);
}

.orders {
  position: sticky;
  top: 70px;
  z-index: 99;
  padding: 30rpx;
  margin: 50rpx 20rpx 0;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
}

.orders .title {
  height: 40rpx;
  line-height: 40rpx;
  font-size: 28rpx;
  color: #1e1e1e;
}

.orders .title navigator {
  font-size: 24rpx;
  color: #939393;
  float: right;
}

.orders .section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 40rpx 20rpx 10rpx;
}

.orders .section navigator {
  text-align: center;
  font-size: 24rpx;
  color: #333;
}

.orders .section navigator::before {
  display: block;
  font-size: 60rpx;
  color: #ff9545;
}

/* 小部件 */
.widgets {
  padding: 20rpx 20rpx 0;
  background-color: #f7f7f8;
}

.widgets .tabs {
  display: flex;
  justify-content: space-around;
  height: 80rpx;
  line-height: 80rpx;
}

.widgets .tabs text {
  font-size: 28rpx;
  color: #333;
  position: relative;
}

.widgets .tabs .active::after {
  position: absolute;
  left: 50%;
  bottom: 12rpx;

  width: 60rpx;
  height: 4rpx;
  background-color: #27ba9b;
  content: '';
  transform: translate(-50%);
}

/* 瀑布流布局 */
.masonry {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
}

.masonry .column {
  width: 345rpx;
}

.masonry .column .card {
  padding: 20rpx 15rpx;
  margin-bottom: 20rpx;
  border-radius: 8rpx;
  background-color: #fff;
}

.masonry .card .name {
  font-size: 24rpx;
  color: #333;
  margin-top: 10rpx;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.masonry .card .price {
  line-height: 1;
  font-size: 22rpx;
  color: #cf4444;
}

.masonry .card .locate {
  text-align: left;
  color: #999;
  margin-bottom: 10rpx;
  font-size: 24rpx;
}

.masonry .topic .price {
  margin: 10rpx 0;
}

.masonry .topic .price text {
  color: #999;
}

.masonry .topic .extra {
  line-height: 1;
  font-size: 22rpx;
  color: #666;
}

.masonry .extra text {
  margin-right: 14rpx;
}

.masonry .extra text::before {
  margin-right: 4rpx;
}

.masonry .icon-preview:before {
  font-size: 25rpx;
}

.masonry .goods .price {
  margin-top: 10rpx;
}

.masonry .brand {
  text-align: center;
}

.masonry .brand .name {
  margin: 10rpx 0 8rpx;
}

.masonry .brand .alt {
  line-height: 1;
  color: #666;
  font-size: 24rpx;
}
</style>
