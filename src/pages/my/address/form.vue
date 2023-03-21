<script setup lang="ts">
import { addAddress, editAddress } from '@/service/address'
import { AddAddress } from '@/types/address'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAddress } from '@/service/address'
import { Rules, validate } from '@/utils/validate'
const addressList = ref<AddAddress>({} as AddAddress)
let selectedCode: string[] = []
const handleFullCity = (e: any) => {
  addressList.value.fullLocation = e.detail.value.join('')

  selectedCode = e.detail.code
}
const handleSwitch = (e: any) => {
  addressList.value.isDefault = Number(e.detail.value)
}
const initEditAddress = async (id: string) => {
  const res = await getAddress(id)
  addressList.value = res.result
}
const rules: Rules = {
  receiver: [{ required: true, message: '请输入收货人姓名' }],
  contact: [
    { required: true, message: '请输入收货人手机号码' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' },
  ],
  fullLocation: [{ required: true, message: '请选择所在城市' }],
  address: [{ required: true, message: '请输入详细地址' }],
}
const saveAddress = async () => {
  if (!validate(addressList.value, rules)) return
  const [provinceCode, cityCode, countyCode] = selectedCode
  addressList.value.id
    ? await editAddress({
        ...addressList.value,
        provinceCode,
        cityCode,
        countyCode,
      })
    : await addAddress({
        ...addressList.value,
        provinceCode,
        cityCode,
        countyCode,
      })

  setTimeout(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'success',
      mask: true,
    })
  }, 1000)
  //返回上一级
  let pages = getCurrentPages() // 当前页面
  let beforePage = pages[pages.length - 2] as any
  // 上一页
  uni.navigateBack({
    success: function () {
      beforePage.onLoad() // 执行上一页的onLoad里面的方法方法
    },
  })
}
onLoad(({ id }) => {
  uni.setNavigationBarTitle({
    title: id ? '修改地址' : '新建地址',
  })
  if (id) {
    initEditAddress(id)
  }
})
</script>

<template>
  <view class="viewport">
    <!-- 地址信息 -->
    <view class="form">
      <view class="form-item">
        <text class="label">姓名</text>
        <input
          v-model="addressList.receiver"
          placeholder-style="color: #888"
          placeholder="请填写收货人姓名"
        />
      </view>
      <view class="form-item">
        <text class="label">手机号码</text>
        <input
          placeholder-style="color: #888"
          placeholder="请填写收货人手机号码"
          v-model="addressList.contact"
        />
      </view>
      <view class="form-item">
        <text class="label">省/市/县 (区)</text>
        <picker mode="region" @change="handleFullCity">
          <!-- <view class="region"></view> -->
          <view class="placeholder">
            {{
              addressList.fullLocation
                ? addressList.fullLocation
                : '请填写所在城市'
            }}
          </view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input
          placeholder-style="color: #888"
          placeholder="街道、楼牌号信息"
          v-model="addressList.address"
        />
      </view>
      <view class="form-item">
        <text class="label">设置默认地址</text>
        <switch
          color="#27ba9b"
          :checked="addressList.isDefault === 1"
          @change="handleSwitch"
        />
      </view>
    </view>
    <!-- 提交按钮 -->
    <view class="button" @click="saveAddress">保 存</view>
  </view>
</template>

<style>
page {
  background-color: #f4f4f4;
}
.form {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
}
.form .form-item {
  display: flex;
  min-height: 96rpx;
  line-height: 46rpx;
  padding: 25rpx 10rpx;
  background-color: #fff;
  font-size: 28rpx;
  border-bottom: 1rpx solid #ddd;
  position: relative;
}

.form .form-item:last-child {
  border: none;
}

.form .form-item .label {
  width: 200rpx;
  color: #333;
}

.form .form-item input {
  flex: 1;
  display: block;
  height: 46rpx;
}

.form .form-item switch {
  position: absolute;
  right: -10rpx;
  transform: scale(0.7) translateY(-8px);
}

.form .form-item picker {
  flex: 1;
}

.form .form-item .region {
  color: #333;
}

.form .form-item .placeholder {
  color: #888;
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
</style>
