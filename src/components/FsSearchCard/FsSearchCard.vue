<template>
  <div
    class="fs-search-card"
    @click="handleSkipToArticleDetail(props.articleDetail.id, props.articleDetail.cover.path)"
  >
    <div class="fs-search-card_left">
      <fs-image :src="props.articleDetail.cover.path" :lazy="true" ref="imageRef" />
      <!-- <img class="img"  /> -->
    </div>
    <div class="fs-search-card_right">
      <div class="right-top">
        <div class="title">{{ props.articleDetail.title }}</div>
        <div class="introduce">{{ props.articleDetail.introduce }}</div>
      </div>
      <div class="right-bottom">
        <div class="icon-item">
          <i class="fa fa-calendar"></i>
          <span>{{ moment(props.articleDetail.createdAt).format("YYYY.MM.DD HH:mm") }}</span>
        </div>
        <div class="icon-item">
          <i class="fa fa-eye"></i>
          <span>{{ props.articleDetail.views }}</span>
        </div>
        <div class="icon-item">
          <i class="fa fa-thumbs-o-up"></i>
          <span>{{ props.articleDetail.liked }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticleItem } from "@/types/articleType";
import FsImage from "../FsImage/FsImage.vue";
import moment from "moment";
import { ref } from "vue";
import type { IImageInfo, IImagePos } from "@/types/utils";

const props = defineProps<{
  articleDetail: IArticleItem;
}>();

const emit = defineEmits<{
  (e: "skipToDetail", value: IImageInfo): void;
}>();

const imageRef = ref<InstanceType<typeof FsImage>>();

const handleSkipToArticleDetail = (id: string, path: string) => {
  const pos = imageRef.value!.getImagePosInfo() as IImagePos;
  emit("skipToDetail", { ...pos, id, path });
};
</script>

<style scoped lang="scss">
.fs-search-card {
  position: relative;
  width: 920px;
  overflow: hidden;
  height: 150px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &_left {
    width: 200px;
    height: 120px;
    border-radius: 5px;
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  &_right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    width: 600px;
    .right-top {
      display: flex;
      flex-direction: column;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 600;
        font-size: 22px;
        color: #717171;
      }
      .introduce {
        font-size: 18px;
        color: #768791;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 8px;
      }
    }
    .right-bottom {
      display: flex;
      align-items: center;
      .icon-item {
        font-size: 16px;
        color: #768791;
        span {
          margin-left: 3px;
          margin-right: 8px;
        }
      }
    }
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 20px;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 1;
    transition: all 0.8s ease;
    transform: translate(120%);
    background: rgba(0, 0, 0, 0.2);
  }
  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  &:hover::before {
    transform: translate(-120%);
    opacity: 0;
  }
}
</style>
