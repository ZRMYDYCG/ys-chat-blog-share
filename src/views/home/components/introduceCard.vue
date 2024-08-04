<template>
  <div class="introduce-card">
    <div class="introduce-card_time">
      <fs-timer />
    </div>
    <div class="introduce-card_content">
      <b>F's Blog</b>
      <p>这里是一位热爱前端开发和单机游戏的普本在校生，喜欢折腾一些界面和界面数据交互~</p>
      <p>该站点主要记录自己的学习历程，分享自己总结知识点，时不时也会在这里分享一些生活趣事。</p>
    </div>
    <div class="introduce-card_count">
      <div class="count-item" v-for="(item, index) in props.totalInfo" :key="index">
        <b>{{ item.name }}</b>
        <span>{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsTimer from "@/components/FsTimer/FsTimer.vue";
import type { ITotalInfo } from "@/types/articleType";
const props = defineProps<{
  totalInfo: ITotalInfo[];
}>();
</script>

<style scoped lang="scss">
.introduce-card {
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 1px 0 6px #0000000a;
  &_content {
    padding: 10px;
    b {
      color: #08d9d6;
      font-size: 22px;
    }
    p {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.1em;
      margin: 10px 0;
    }
  }
  &_count {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
    .count-item {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 55px;
      b {
        color: #999;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    & > div:nth-child(1)::before,
    & > div:nth-child(2)::before,
    & > div:nth-child(3)::before {
      content: "";
      position: absolute;
      right: 0;
      display: block;
      width: 1px;
      height: 70%;
      background: #eee;
    }
  }
}
</style>
