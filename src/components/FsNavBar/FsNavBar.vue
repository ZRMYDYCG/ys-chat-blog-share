<template>
  <div class="fs-nav-bar">
    <div class="fs-nav-bar_header"><div>Blog Space</div></div>
    <div class="fs-nav-bar_list">
      <div class="nav-item" v-for="(item, index) in tabList" :key="index" @click="$router.push(item.route)">
        <span :class="[currentIndex === index ? 'text-active' : '']">{{ item.text }}</span>
        <i :class="[item.icon, currentIndex === index ? 'icon-active' : '']"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const $route = useRoute();

const currentIndex = computed(() => tabList.map((item) => item.route).indexOf($route.fullPath));

const tabList = [
  {
    text: "首页",
    icon: "fa fa-home",
    route: "/home",
  },
  {
    text: "搜索",
    icon: "fa fa-search",
    route: "/search",
  },
  {
    text: "留言",
    icon: "fa fa-envelope-open",
    route: "/message",
  },
  {
    text: "站点",
    icon: "fa fa-map",
    route: "/site",
  },
  {
    text: "关于",
    icon: "fa fa-user",
    route: "/about",
  },
];
</script>

<style scoped lang="scss">
.flex-cloumn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fs-nav-bar {
  width: 100%;
  height: 100%;
  background-color: #fff;

  &_header {
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 35px;
    font-weight: 700;
    div {
      box-shadow: 0 4px 10px #ddeeffc4;
      border-radius: 18px;
      padding: 16px;
    }
  }
  &_list {
    width: 100%;
    .nav-item {
      width: 100%;
      position: relative;
      padding: 20px;
      font-size: 25px;
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      span {
        position: absolute;
        display: inline-block;
        width: 100%;
        transform: translateY(-30px) translateX(-50%);
        opacity: 0;
        left: 50%;
        text-align: center;
        transition: all 0.5s;
        &::before {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          content: "";
          width: 5px;
          height: 5px;
          background-color: #000;
          border-radius: 50%;
        }
      }
      i {
        font-size: 30px;
        color: #eaeaea;
        transition: all 0.3s;
      }

      .text-active {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
      }
      .icon-active {
        opacity: 0;
      }

      &:hover span {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
      }
      &:hover i {
        opacity: 0;
      }
    }
  }
}
</style>
