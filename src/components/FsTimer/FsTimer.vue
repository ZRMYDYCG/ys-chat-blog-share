<template>
  <div class="fs-timer">
    <fs-image :src="props.adress || BASE_BG2" />
    <div class="fs-timer-item timer1">
      <p>{{ time.hour }}</p>
      <span>hours</span>
    </div>
    <b class="fen">:</b>
    <div class="fs-timer-item timer2">
      <p>{{ time.minute }}</p>
      <span>minutes</span>
    </div>
    <b class="fen">:</b>
    <div class="fs-timer-item timer3">
      <p>{{ time.second }}</p>
      <span>seconds</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import FsImage from "../FsImage/FsImage.vue";
import { BASE_BG2 } from "@/config/images";

const props = defineProps<{
  adress?: string;
}>();

let timer = null;

const imgAdress = ref("");
const time = reactive({
  hour: 0 as string | number,
  minute: 0 as string | number,
  second: 0 as string | number,
});

onMounted(() => {
  imgAdress.value = new URL(`@/assets/image/bg2.jpg`, import.meta.url).href;
  timer = setInterval(() => {
    getTime();
  }, 1000);
});

onUnmounted(() => (timer = null));

const getTime = () => {
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();
  time.hour = hour >= 10 ? hour : "0" + hour;
  time.minute = minute >= 10 ? minute : "0" + minute;
  time.second = second >= 10 ? second : "0" + second;
};
</script>

<style scoped lang="less">
.fs-timer {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 120px;
  overflow: hidden;
  cursor: pointer;

  &:hover > img {
    filter: blur(5px);
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.6s;
  }
  &-item {
    width: 50px;
    height: 70px;
    color: #fff;
    position: relative;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 40px;
      margin: 0;
      text-shadow: 0.8px 0 5px #333;
    }
    span {
      font-size: 16px;
    }
  }
  .fen {
    position: relative;
    font-size: 30px;
    color: #fff;
    width: 16px;
    height: 55px;
    text-shadow: 0.8px 0 5px #333;
    text-align: center;
  }

  .timer1 {
    animation: 0.4s timerTransition ease forwards;
  }
  .timer2 {
    animation: 0.8s timerTransition ease forwards;
  }
  .timer3 {
    animation: 1.2s timerTransition ease forwards;
  }
}

@keyframes timerTransition {
  from {
    transform: translateY(-200%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
