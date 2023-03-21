<script setup lang="ts">
import { toRef, ref } from 'vue'
import useAppStore from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfo, editUserInfo } from '@/service/user'
import type { Gender, UserInfo } from '@/types/user'
import { uploadFileWithUrl } from '@/service/user'
import { useUserStore } from '@/store/member'
import { storeToRefs } from 'pinia'
const appStore = useAppStore()
const safeArea = toRef(appStore, 'safeArea')
const member = useUserStore()
const { profile } = storeToRefs(member)
const goBack = () => {
  uni.navigateBack({})
}

const chooseImage = () => {
  uni.chooseImage({
    count: 1, // 最多选择的图片数量，默认9
    sizeType: ['original', 'compressed'], // 所选的图片尺寸，original 原图，compressed 压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 所选的图片来源，album 从相册选图，camera 使用相机，默认二者都有
    success: function (res) {
      // 选择成功后的回调函数负责处理选好的图片信息
      //上传中消息提示
      uni.showLoading({
        title: '上传中',
        mask: true,
      })
      const tempFilePaths = res.tempFilePaths
      uploadFileWithUrl('/member/profile/avatar', tempFilePaths[0], 'file')
        .then(async (res: any) => {
          const parseRes = JSON.parse(res)
          profile.value.avatar = parseRes.result.avatar
          userInfo.value.avatar = parseRes.result.avatar
        })
        .catch((err) => {
          console.error(err)
        })
    },
  })
}
const userInfo = ref<UserInfo>({} as UserInfo)
const initGetUserInfo = async () => {
  const res = await getUserInfo()
  userInfo.value = res.result
  profile.value.nickname = userInfo.value.nickname
}
const onRadioChange = (e: WechatMiniprogram.RadioGroupChange) => {
  userInfo.value.gender = e.detail.value as Gender
}
const onDateChange = (e: WechatMiniprogram.PickerChange) => {
  userInfo.value.birthday = e.detail.value as string
}
let selectedLocationCode: string[] = []
const onChangeCity = (e: WechatMiniprogram.PickerChange) => {
  userInfo.value.fullLocation = (
    e.detail.value as [string, string, string]
  ).join('')
  selectedLocationCode = e.detail.code
}
const submitForm = async () => {
  const { birthday, gender, nickname, profession } = userInfo.value
  const [provinceCode, cityCode, countyCode] = selectedLocationCode

  await editUserInfo({
    birthday,
    gender,
    nickname,
    profession,
    provinceCode,
    cityCode,
    countyCode,
  })
  await uni.showToast({ title: '修改成功~' })
  setTimeout(() => {
    uni.navigateBack({
      delta: 1,
    })
  }, 500)
}
onLoad(() => {
  initGetUserInfo()
})
</script>

<template>
  <view class="viewport">
    <view class="navbar" :style="{ paddingTop: safeArea?.top + 'px' }">
      <view class="back icon-left" @tap="goBack"></view>
      <view class="title">个人信息</view>
    </view>
    <scroll-view scroll-y>
      <!-- 头像 -->
      <view class="avatar">
        <image @tap="chooseImage" :src="userInfo.avatar" />
        <text>点击修改头像</text>
      </view>
      <!-- 用户信息 -->
      <form @submit="" @reset="">
        <view class="form">
          <view class="form-item">
            <text class="label">账号</text>
            <input
              :disabled="true"
              v-model="userInfo.account"
              class="hover-to-disable"
            />
          </view>
          <view class="form-item">
            <text class="label">昵称</text>
            <input v-model="userInfo.nickname" />
          </view>
          <view class="form-item">
            <text class="label">性别</text>
            <radio-group @change="onRadioChange">
              <label class="radio">
                <radio
                  value="男"
                  color="#27ba9b"
                  :checked="userInfo.gender === '男'"
                />
                男
              </label>
              <label class="radio">
                <radio
                  value="女"
                  color="#27ba9b"
                  :checked="userInfo.gender === '女'"
                />
                女
              </label>
            </radio-group>
          </view>
          <view class="form-item">
            <text class="label">出生日期</text>
            <picker
              mode="date"
              start="2015-09-01"
              end="2017-09-01"
              @change="onDateChange"
            >
              <view>{{
                userInfo.birthday ? userInfo.birthday : '请选择出生日期'
              }}</view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">城市</text>
            <picker mode="region" @change="onChangeCity">
              <view>{{
                userInfo.fullLocation ? userInfo.fullLocation : '请选择城市'
              }}</view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">职业</text>
            <input v-model="userInfo.profession" />
          </view>
        </view>
      </form>
      <!-- 提交按钮 -->
      <view class="button" @tap="submitForm">保 存</view>
    </scroll-view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 392rpx;
  background-repeat: no-repeat;
}

.navbar .title {
  height: 40px;
  line-height: 32px;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
}

.navbar .back {
  position: absolute;
  left: 20rpx;
  top: 22px;
  font-size: 23px;
  z-index: 9;
  color: #fff;
}

.avatar {
  text-align: center;
  padding: 20rpx 0 40rpx;
}

.avatar image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
}

.avatar text {
  display: block;
  padding-top: 20rpx;
  line-height: 1;
  font-size: 26rpx;
  color: #fff;
}

.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}

.form .form-item {
  display: flex;
  height: 96rpx;
  line-height: 46rpx;
  padding: 25rpx 10rpx;
  background-color: #fff;
  font-size: 28rpx;
  border-bottom: 1rpx solid #ddd;
}

.form .form-item:last-child {
  border: none;
}

.form .form-item .label {
  width: 180rpx;
  color: #333;
}

.form .form-item input {
  flex: 1;
  display: block;
  height: 46rpx;
}

.form .form-item .radio {
  display: inline-block;
  height: 46rpx;
  margin-right: 20rpx;
  vertical-align: middle;
}

.form .form-item radio {
  transform: scale(0.7) translateY(-2px);
}

.form .form-item picker {
  flex: 1;
}

.button {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
.hover-to-disable:disabled {
  background-color: #e9ecef;
}
</style>
