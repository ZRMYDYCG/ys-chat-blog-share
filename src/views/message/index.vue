<template>
  <div class="message-container">
    <div class="message-container-bg">
      <img src="http://pic.fasyncsy.com.cn/coverPic/cover.jpg" alt="" />
    </div>
    <message-header @choose-tab="handleChangeCurrent" />
    <div class="message-content">
      <keep-alive>
        <message-content v-if="!currentShow" />
        <pic-content v-else />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import messageHeader from "./components/messageHeader.vue";
import messageContent from "./components/messageContent.vue";
import picContent from "./components/picContent.vue";
const currentShow = ref(0);

const handleChangeCurrent = (num: number) => {
  currentShow.value = num;
};
</script>

<style scoped lang="less">
.message-container {
  position: relative;
  width: 100%;
  height: 100%;

  &-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: blur(2px);
    z-index: -2;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .message-content {
    width: 100%;
    margin-top: 80px;
    position: relative;
  }
}
</style>
