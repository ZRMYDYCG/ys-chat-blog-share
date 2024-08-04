<template>
  <div class="about-container">
    <fs-image class="about-container__img" src="http://pic.fasyncsy.com.cn/coverPic/about.jpg" />
    <div class="about-container__content">
      <h1 style="text-align: center" class="word-animate">关于</h1>
      <h2 style="animation-delay: 0.1s" class="word-animate">关于本站：</h2>
      <p style="animation-delay: 0.2s" class="word-animate">
        这里是一名二本软件工程专业的在校生，热爱前端开发，喜欢折腾网页动效。本站主要记录个人一些学习笔记和日常生活，同时挖掘更多有趣的动画交互。由于后端基础薄弱，希望看官不要在该网站上做过多的测试~
      </p>
      <h2 style="animation-delay: 0.3s" class="word-animate">该博客使用技术栈：</h2>
      <p style="animation-delay: 0.4s" class="word-animate">
        前端: Vue3.2 + TS + Pinia + vue-router + Vite4 highlight.js marked等其他余项
      </p>
      <p style="animation-delay: 0.5s" class="word-animate">后端: Koa2 + sequelize + mysql + 七牛云图床等其他余项</p>
      <p style="animation-delay: 0.6s" class="word-animate">更多内容可以在留言板块留言或者添加作者联系方式~</p>
      <h2 style="animation-delay: 0.7s" class="word-animate">样式和部分功能灵感来源：</h2>
      <p style="animation-delay: 0.8s" class="word-animate">
        主体样式和动画：<a href="https://www.adicw.cn/" target="_blank">Χαλαρό</a>
      </p>
      <p style="animation-delay: 0.9s" class="word-animate">
        网站板块：<a href="http://www.fengfengzhidao.com/sites/" target="_blank">枫枫知道</a>
      </p>
      <p style="animation-delay: 1s" class="word-animate">
        留言墙板块：<a href="http://www.huohuo90.com/" target="_blank">逸刻时光</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsImage from "@/components/FsImage/FsImage.vue";
</script>

<style scoped lang="less">
.about-container {
  position: relative;
  width: 100%;
  height: 100%;
  &__content {
    position: absolute;
    padding: 0 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 90vh;
    margin: 0 auto;
    z-index: 1;
    color: #000;
    p {
      font-size: 20px;
      line-height: 1.5em;
    }
    a:hover {
      color: #fff;
    }
  }
  &__img {
    width: 100%;
    height: 100%;
  }
  &::after {
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .word-animate {
    animation: textAnimate 0.5s;
  }
  @keyframes textAnimate {
    0% {
      transform: translateY(200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
