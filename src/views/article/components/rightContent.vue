<template>
  <div class="right-content">
    <div class="right-item timer-box">
      <fs-timer :adress="props.imageAdress || ''" />
    </div>
    <div class="right-item">
      <article-directory @scroll-nav="(value:number)=>{emit('scrollNav',value)}" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsTimer from "@/components/FsTimer/FsTimer.vue";
import articleDirectory from "./articleDirectory.vue";

const props = defineProps<{
  imageAdress?: string;
}>();

const emit = defineEmits<{
  (e: "scrollNav", value: number): void;
}>();
</script>

<style scoped lang="less">
.right-content {
  .right-item {
    margin-bottom: 20px;
  }
  .timer-box {
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
