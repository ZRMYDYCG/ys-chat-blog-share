<template>
  <div class="fs-web-tab" @click="handleScrollTab" ref="containerRef">
    <div class="fs-web-tab__scroll" ref="scrollRef" :style="{ transform: `translateX(${state.scrollDis}px)` }">
      <div
        :class="['tab-item', currentTab === index ? 'tab-item__active' : '']"
        v-for="(item, index) in props.tagList"
        :key="index"
        @click="handleChooseTab(index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IWebTag } from "@/types/webType";
import { onMounted, reactive, ref } from "vue";

const containerRef = ref<HTMLElement>();
const scrollRef = ref<HTMLElement>();
const currentTab = ref(0);

const props = defineProps<{
  tagList: IWebTag[];
}>();

const emit = defineEmits<{
  (e: "chooseTab", index: number): string;
}>();
onMounted(() => {
  if (containerRef.value && scrollRef.value) {
    state.containerWidth = containerRef.value.offsetWidth;
    state.containerLeft = containerRef.value.offsetLeft;
    state.scrollWidth = scrollRef.value.offsetWidth;
  }
});
const state = reactive({
  containerWidth: 0,
  scrollWidth: 0,
  containerLeft: 0,
  scrollDis: 0,
  computedDis: 0,
  tabArr: [] as string[],
});

const handleChooseTab = (index: number) => {
  currentTab.value = index;
  emit("chooseTab", index);
};

const handleScrollTab = (e: any) => {
  const clickDis = e.pageX - state.containerLeft;
  if (clickDis > state.containerWidth / 2) {
    state.computedDis =
      state.containerWidth / 2 < -(state.scrollDis + state.scrollWidth) ? state.computedDis : state.computedDis - 250;
  } else {
    state.computedDis = state.computedDis + 250 > 0 ? 0 : state.computedDis + 250;
  }
  state.scrollDis = state.computedDis;
};
</script>

<style scoped lang="less">
.fs-web-tab {
  width: 100%;
  height: 40px;
  overflow: hidden;
  white-space: nowrap;

  &__scroll {
    height: 100%;
    gap: 15px;
    transition: all 0.8s;
    .tab-item {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 18px;
      height: 40px;
      line-height: 34px;
      margin-right: 10px;
      transition: all 0.3s;
      background-color: #fff;
      &__active {
        background-color: #07d9d7;
        color: #fff;
      }
    }
  }
}
</style>
