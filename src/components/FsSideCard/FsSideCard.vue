<template>
  <div class="fs-side-card">
    <div class="fs-side-card_titleBox">
      <div class="title">{{ props.title }}</div>
      <slot name="title"></slot>
    </div>
    <div class="fs-side-card_content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    title: string;
    padding: string;
  }>(),
  {
    padding: "10px",
  }
);
</script>

<style scoped lang="less">
.fs-side-card {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 0 6px #0000000a;
  padding: v-bind("props.padding");
  &_titleBox {
    position: relative;
    width: 100%;
    height: 40px;

    border-bottom: 1px solid #e9f0fc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::after {
      position: absolute;
      width: 50px;
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: #ff2e63;
      content: "";
    }
    .title {
      font-size: 18px;
      line-height: 40px;
      color: #777;
    }
  }
  &_content {
    height: 100%;
    margin-top: 10px;
  }
}
</style>
