<template>
  <div class="fs-move-cover">
    <div class="fs-move-cover_bg" :style="{ backgroundImage: `url(${props.path})` }"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  path: string;
}>();

</script>

<style scoped lang="scss">
.fs-move-cover {
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px #1a1a1a1a;
  overflow: hidden;
  cursor: pointer;
  &_bg {
    width: 100%;
    height: 100%;
    background-size: cover;
    animation: bgMove 16s linear infinite alternate;
  }
}
@keyframes bgMove {
  0% {
    background-position: 0% 0%;
    filter: 0;
  }
  20%,
  60% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(1);
  }
  100% {
    background-position: 100% 100%;
  }
}
</style>
