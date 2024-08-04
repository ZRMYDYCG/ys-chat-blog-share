<template>
  <div class="fs-drawer">
    <div class="fs-drawer_title">
      <div class="title">{{ props.title }}</div>
      <div class="close" @click="handleDrawerStatus">
        <i class="fa fa-close"></i>
      </div>
    </div>
    <div class="fs-drawer_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
}>();
const handleDrawerStatus = () => {
  emit("update:show", !props.show);
};
</script>

<style scoped lang="scss">
.fs-drawer {
  padding: 20px;
  position: fixed;
  top: 0;
  right: v-bind("props.show ? '0' : '-360px'");
  height: 100vh;
  width: 360px;
  background: hsla(0, 0%, 100%, 0.6);
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 8%);
  backdrop-filter: blur(20px);
  transition: all 0.3s;
  z-index: 999;
  &_title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 18px;
    .title {
      font-weight: bold;
    }
    .close {
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        transform: scale(1.5) rotateZ(360deg);
      }
    }
  }
}
</style>
