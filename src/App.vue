<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 17:57:50
 * @FilePath: \blog-front-vue3\src\App.vue
 * @Description: App.vue
-->
<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <fs-init-loading v-if="flag" />
    <div class="main-container" v-else>
      <div class="main-nav-bar"><fs-nav-bar /></div>

      <div class="main-content">
        <router-view v-slot="{ Component }" :key="$route.fullPath">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FsNavBar from "./components/FsNavBar/FsNavBar.vue";
import FsInitLoading from "./components/FsInitLoading/FsInitLoading.vue";
import myCache from "@/utils/Cache";
import useHomeStore from "./stores/homeStore";
const flag = ref(true);

const { initHomeData } = useHomeStore();
onMounted(() => {
  const now = myCache.getItem<number | undefined>("timeStamp");
  if (!now) {
    myCache.saveItem("timeStamp", Date.now() + 24 * 60 * 60 * 2 * 1000);
    setTimeout(() => {
      flag.value = false;
    }, 4500);
  } else if (now && now <= Date.now()) {
    myCache.saveItem("timeStamp", Date.now() + 24 * 60 * 60 * 2 * 1000);
    setTimeout(() => {
      flag.value = false;
    }, 4500);
  } else {
    flag.value = false;
  }
  initHomeData();
});
</script>

<style scoped lang="less">
.main-container {
  display: flex;
  width: 100vw;
  min-width: 1440px;
  height: 100vh;
  overflow-x: hidden;
  .main-nav-bar {
    width: 200px;
    height: 100%;
    box-shadow: 3px 0 20px #00000005;
  }
  .main-content {
    flex: 1;
    height: unset;
    border-top-left-radius: 26px;
    border-bottom-left-radius: 26px;
    overflow: hidden;
  }
}
</style>
