<template>
  <div class="article-directory">
    <div class="article-directory__title">导航目录</div>
    <div class="article-directory__list">
      <el-scrollbar max-height="300px">
        <ul>
          <li
            @click="scrollNav(item.id)"
            v-for="item in articleDirectory"
            :key="item.id"
            :style="{ paddingLeft: item.level * 10 + 'px' }"
          >
            <span :style="{ fontSize: 20 * (1 - 0.1 * item.level) + 'px' }">{{ item.title }}</span>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mitter from "@/utils/mitter";
import type { IArticleStruct } from "@/types/utils";
const articleDirectory = ref<IArticleStruct[]>([]);

const emit = defineEmits<{
  (e: "scrollNav", item: number): void;
}>();

mitter.on("getDirectoryData", (value: IArticleStruct[]) => {
  articleDirectory.value = value;
});

const scrollNav = (id: string) => {
  const offset = document.getElementById(id)!.offsetTop + 60;
  emit("scrollNav", offset);
};
</script>

<style scoped lang="less">
.article-directory {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  &__title {
    font-size: 20px;
  }
  &__list {
    ul {
      list-style: none;
      padding: 0;
      margin: 5px 0;
      li {
        width: 100%;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
          color: #007fff;
        }
      }
    }
  }
}
</style>
