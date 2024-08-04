<template>
  <div class="fs-init-loading">
    <div class="fs-init-loading__content">
      <span
        v-for="(item, index) in content"
        :key="index"
        :style="{
          animationDelay: `${item.time}ms`,
        }"
        >{{ item.text }}</span
      >
    </div>
    <div class="fs-init-loading__name">~ _Async__ ~</div>
  </div>
</template>

<script setup lang="ts">
const content = [
  {
    time: 600,
    text: "少",
  },
  {
    time: 650,
    text: "说",
  },
  {
    time: 500,
    text: "一",
  },
  {
    time: 700,
    text: "句",
  },
  {
    time: 450,
    text: "废",
  },
  {
    time: 300,
    text: "话",
  },
  {
    time: 360,
    text: "，",
  },
  {
    time: 170,
    text: "多",
  },
  {
    time: 220,
    text: "敲",
  },
  {
    time: 320,
    text: "一",
  },
  {
    time: 440,
    text: "行",
  },
  {
    time: 500,
    text: "代",
  },
  {
    time: 120,
    text: "码",
  },
  {
    time: 460,
    text: "。",
  },
];
</script>

<style scoped lang="less">
.fs-init-loading {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #222;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  user-select: none;
  &__content {
    position: relative;
    font-size: 35px;
    letter-spacing: 1rem;
    color: #08d9d6;
    font-weight: 700;
    span {
      opacity: 0;
      filter: blur(10px);
      animation: textFadeIn 2s alternate infinite;
    }
    &::after {
      position: absolute;
      content: "";
      top: 140%;
      left: -20px;
      width: 100%;
      height: 3px;
      background: rgba(255, 255, 255, 0.8);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  &__name {
    margin-top: 30px;
    color: #fff;
    font-size: 25px;
    animation: nameFadeIn 1s ease 1s forwards;
    opacity: 0;
    transform: translateY(30px);
  }
}

@keyframes textFadeIn {
  50%,
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
@keyframes nameFadeIn {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
