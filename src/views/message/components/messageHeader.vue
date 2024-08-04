<template>
  <div class="message-header">
    <div :class="['tab-item', current === 0 ? 'tab-item_active' : '']" @click="handleTabClick(0)">留言墙</div>
    <div :class="['tab-item', current === 1 ? 'tab-item_active' : '']" @click="handleTabClick(1)">插画墙</div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const current = ref(0);
const emit = defineEmits<{
  (e: "chooseTab", value: number): void;
}>();
const handleTabClick = (num: number) => {
  emit("chooseTab", num);
  current.value = num;
};
</script>

<style scoped lang="scss">
.message-header {
  position: fixed;
  top: 10px;
  left: 200px;
  width: calc(100vw - 200px);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .tab-item {
    font-size: 22px;
    padding: 8px 10px;
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &_active {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
