<template>
  <div class="fs-virtual-list-container" ref="listContainerRef" @scroll="handleScroll">
    <div class="fs-virtual-list-scroll" :style="scrollStyle">
      <div class="fs-virtual-item" v-for="(item, index) in currentData" :key="index">
        <slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticleItem } from "@/types/articleType";
import { ref, reactive, onMounted, computed, type CSSProperties, watch } from "vue";

const props = defineProps<{
  itemHeight: number;
  dataSource: IArticleItem[];
}>();

const emit = defineEmits<{
  (e: "getMoreData"): void;
}>();

const listContainerRef = ref<HTMLElement>();

const state = reactive({
  viewHeight: 0,
  maxCount: 0,
  startIndex: 0,
});

const endIndex = computed(() => {
    const end = state.startIndex + state.maxCount;
    return props.dataSource[end] ? end : props.dataSource.length;
  }),
  currentData = computed(() => props.dataSource.slice(state.startIndex, endIndex.value)),
  scrollStyle = computed(
    () =>
      ({
        height: `${props.dataSource.length * props.itemHeight - state.startIndex * props.itemHeight}px`,
        transform: `translate3d(0, ${state.startIndex * props.itemHeight}px, 0)`,
      } as CSSProperties)
  );

watch(
  () => endIndex.value,
  (newValue) => {
    newValue >= props.dataSource.length - 1 && emit("getMoreData");
  }
);

onMounted(() => {
  state.viewHeight = listContainerRef.value ? listContainerRef.value.offsetHeight : 0;
  state.maxCount = Math.ceil(state.viewHeight / props.itemHeight) + 1;
});

const handleScroll = () => {
  setAnimationFrame(() => {
    state.startIndex = Math.floor(listContainerRef.value!.scrollTop / props.itemHeight);
  });
};

function setAnimationFrame(callback: Function) {
  let startTime = Date.now();
  requestAnimationFrame(function cb() {
    const endTime = Date.now();
    callback();
    if (endTime - startTime >= 33.3) {
      startTime = endTime;
      requestAnimationFrame(cb);
    }
  });
}
</script>

<style scoped lang="less">
.fs-virtual-list {
  &-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
.fs-virtual-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: v-bind("`${props.itemHeight}px`");
}
</style>
