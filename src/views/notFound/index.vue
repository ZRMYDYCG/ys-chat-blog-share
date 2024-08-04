<template>
  <div class="not-found-container">
    <fs-image class="not-found-container__img" src="http://pic.fasyncsy.com.cn/coverPic/about.jpg" />
    <div class="not-found-container__content" @click="$router.push('/home')" title="返回首页">
      <h1>404 NOT FOUND</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsImage from "@/components/FsImage/FsImage.vue";
</script>

<style scoped lang="less">
.not-found-container {
  position: relative;
  width: 100%;
  height: 100%;

  &__img {
    width: 100%;
    height: 100%;
    filter: blur(3px);
  }
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      font-size: 100px;
      font-weight: 900;
      color: #2c3e5036;
      font-family: Impact, Haettenschweiler, Arial Narrow Bold, sans-serif;
      background-image: url(data:image/png;base64,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);
      animation: roll 15s infinite;
      margin: 0;
      text-shadow: 5px 5px 10px rgb(0 0 0 / 40%);
      cursor: pointer;
    }
  }
}

@keyframes roll {
  0% {
    background-position: left 0 top 0;
  }
  100% {
    background-position: left 410px top 0;
  }
}
</style>
