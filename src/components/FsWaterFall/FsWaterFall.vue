<template>
  <div class="fs-water-fall" ref="waterContainerRef">
    <div
      class="water-fall_item"
      v-for="(item, index) in props.imageList"
      :style="{
        width: `${imgWidth}px`,
        transform: `translate3d(${state.imgPos[index] ? state.imgPos[index].x : 0}px, ${
          state.imgPos[index] ? state.imgPos[index].y : 0
        }px, 0)`,
      }"
      :key="index"
    >
      <slot :adress="item.adress"></slot>
    </div>
    <div
      :class="['water-fall_loading', props.loading ? 'water-fall_loading__active' : '']"
      :style="{ height: `${maxHeight}px` }"
    >
      加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import type { IImageInfoData } from "./types";

const props = defineProps<{
  imageList: IImageInfoData[];
  gap: number;
  column: number;
  loading: boolean;
}>();

const waterContainerRef = ref<HTMLElement>();

const state = reactive({
  heightArr: [] as number[],
  imgPos: [] as Array<{
    x: number;
    y: number;
  }>,
});

// 获取当前列最小高度值、下标
const min = computed(() => ({
  minHeight: Math.min(...state.heightArr),
  minIndex: state.heightArr.indexOf(Math.min(...state.heightArr)),
}));

const maxHeight = computed(() => Math.max(...state.heightArr));
// 根据传入间距和列数动态计算图片宽度
const imgWidth = computed(() =>
  waterContainerRef.value ? (waterContainerRef.value.offsetWidth - props.gap * (props.column - 1)) / props.column : 0
);

const initWaterFall = (imageList: IImageInfoData[]) => {
  imageList.forEach((item, index) => {
    if (index < props.column) {
      state.imgPos.push({
        x: index % props.column !== 0 ? index * imgWidth.value + props.gap * index : index * imgWidth.value,
        y: 0,
      });
      const height = Math.floor((imgWidth.value * item.height) / item.width);
      state.heightArr.push(height + props.gap);
    } else {
      state.imgPos.push({
        x:
          min.value.minIndex % props.column
            ? min.value.minIndex * imgWidth.value + props.gap * min.value.minIndex
            : min.value.minIndex * imgWidth.value,
        y: min.value.minHeight,
      });
      const height = Math.floor((imgWidth.value * item.height) / item.width);
      state.heightArr[min.value.minIndex] += height + props.gap;
    }
  });
};

const waterFallMore = (imageList: IImageInfoData[]) => {
  imageList.forEach((item) => {
    state.imgPos.push({
      x:
        min.value.minIndex % props.column
          ? min.value.minIndex * imgWidth.value + props.gap * min.value.minIndex
          : min.value.minIndex * imgWidth.value,
      y: min.value.minHeight,
    });
    const height = Math.floor((imgWidth.value * item.height) / item.width);
    state.heightArr[min.value.minIndex] += height + props.gap;
  });
};

watch(
  () => props.imageList,
  (newValue, oldValue) => {
    if (newValue.length && (!oldValue || !oldValue.length)) {
      initWaterFall(newValue);
    } else if (newValue.length && oldValue && newValue.length > oldValue.length) {
      const newList = newValue.slice(oldValue.length);
      waterFallMore(newList);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped lang="scss">
.fs-water-fall {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow-y: scroll;
  .water-fall {
    &_item {
      position: absolute;
      transition: all 0.5s;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &_loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      color: #000;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.6);
      transition: all 0.3s;
      opacity: 0;
      z-index: -100;
      &__active {
        opacity: 1;
        z-index: 999;
      }
    }
  }
}
</style>
