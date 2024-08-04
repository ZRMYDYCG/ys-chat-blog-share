<template>
  <div class="fs-recommend-card">
    <div class="fs-recommend-card__header">{{ props.title }}</div>
    <div class="fs-recommend-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
.fs-recommend-card {
  padding: 15px;
  border-radius: 10px;
  &__header {
    position: relative;
    padding-bottom: 15px;
    border-bottom: 2px solid #eee;
    font-weight: 700;
    text-indent: 14px;
    font-size: 18px;
    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: -3px;
      width: 3px;
      height: 80%;
      background-color: #08d9d6;
    }
  }
  &__content {
    margin-top: 10px;
  }
  background-color: #fff;
}
</style>
