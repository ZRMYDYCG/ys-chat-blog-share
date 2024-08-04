<template>
  <div class="fs-link-card">
    <div class="fs-link-card_icon">
      <slot name="icon"></slot>
    </div>
    <a class="fs-link-card_title" :href="props.link" target="_blank">{{ props.title }}</a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  link: string;
}>();
</script>

<style scoped lang="scss">
.fs-link-card {
  padding: 8px 10px;
  font-size: 12px;
  color: #768791;
  transition: all 0.4s ease;
  background: #eeeeee70;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &_icon {
    margin-right: 5px;
    font-size: 15px;
  }
  &_title {
    color: #768791;
  }
  &:hover {
    box-shadow: 3px 3px 10px #0000004d;
  }
}
</style>
