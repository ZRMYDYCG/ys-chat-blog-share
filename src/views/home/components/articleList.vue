<template>
  <div class="article-list">
    <div class="article-item" v-for="(item, index) in props.articleList" :key="index">
      <fs-blog-card :article-detail="item" @skip-to-detail="handleSkipToDetail" />
    </div>

    <fs-back-top />
  </div>
</template>

<script setup lang="ts">
import FsBlogCard from "@/components/FsBlogCard/FsBlogCard.vue";
import FsBackTop from "@/components/FsBackTop/FsBackTop.vue";
import type { IImageInfo } from "@/types/utils";
import { useRouter } from "vue-router";
import type { IArticleItem } from "@/types/articleType";
import useArticleStore from "@/stores/articleStore";
import { toRefs } from "vue";
const props = defineProps<{
  articleList: IArticleItem[];
}>();

const $router = useRouter();

const { currentPos } = toRefs(useArticleStore());

const handleSkipToDetail = async (item: IImageInfo) => {
  currentPos.value = item;
  $router.push(`article/${item.id}`);
};
</script>

<style scoped lang="less">
.article-list {
  flex: 1;
  margin: 0 25px;
  min-width: 600px;
  .article-item {
    animation: card-in 0.6s ease-in-out;
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(-120px) scale(1.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
