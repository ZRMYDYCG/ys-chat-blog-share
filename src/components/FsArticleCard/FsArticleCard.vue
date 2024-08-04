<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 18:27:34
 * @FilePath: \blog-front-vue3\src\components\FsArticleCard\FsArticleCard.vue
 * @Description: FsArticleCard.vue
-->
<template>
  <div
    class="fs-article-card"
    @click="handleSkipToArticleDetail(props.articleDetail.id, props.articleDetail.cover.path)"
  >
    <div class="fs-article-card__pic">
      <fs-image class="img" ref="imageRef" :src="props.articleDetail.cover.path" :lazy="true" />
    </div>
    <div class="fs-article-card__info">
      <div class="info-title">{{ props.articleDetail.title }}</div>
      <div class="info-view">{{ props.articleDetail.views }} views</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IArticle } from "@/types/articleType";
import type { IImageInfo, IImagePos } from "@/types/utils";
import FsImage from "../FsImage/FsImage.vue";

const props = defineProps<{
  articleDetail: IArticle;
}>();

const emit = defineEmits<{
  (e: "skipToDetail", item: IImageInfo): void;
}>();

const imageRef = ref<InstanceType<typeof FsImage>>();

const handleSkipToArticleDetail = (id: string, path: string) => {
  const pos = imageRef.value!.getImagePosInfo() as IImagePos;
  emit("skipToDetail", { ...pos, id, path });
};
</script>

<style scoped lang="scss">
.fs-article-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover .img {
    transform: scale(1.1);
  }
  &__pic {
    .img {
      width: 60px;
      height: 50px;
      border-radius: 5px;
      transition: all 0.3s;

      object-fit: cover;
    }
  }
  &__info {
    flex: 1;
    height: 50px;
    display: flex;
    margin-left: 10px;
    flex-direction: column;
    justify-content: space-between;
    .info-title {
      color: #5e6d75;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .info-view {
      color: #c3ccd3;
      font-size: 14px;
    }
  }
}
</style>
