<script setup lang="ts">
import { ref } from 'vue'
import cart from './components/cart/index.vue'

import { onLoad } from '@dcloudio/uni-app'

onLoad(() => {})
</script>

<template>
  <cart />
</template>

<style>
page {
  background-color: #f7f7f8;
  height: 100%;
}
</style>
