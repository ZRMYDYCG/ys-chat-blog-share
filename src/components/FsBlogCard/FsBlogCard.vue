<template>
  <div class="fs-blog-card">
    <div class="topBox">
      <fs-image :src="props.articleDetail.cover.path" class="bgImage" ref="imageRef" :lazy="true" />
      <div class="titleBox">
        <div class="categary">{{ props.articleDetail.category.name }}</div>
        <div class="introduce">{{ props.articleDetail.introduce }}</div>
        <div class="title">{{ props.articleDetail.title }}</div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="bottom-left">
        <div class="item">
          <i class="fa fa-calendar"></i>
          <span>{{ moment(props.articleDetail.createdAt).format("YYYY.MM.DD") }}</span>
        </div>
        <div class="item">
          <i class="fa fa-thumbs-o-up"></i>
          <span>{{ props.articleDetail.liked }}次点赞</span>
        </div>
        <div class="item">
          <i class="fa fa-eye"></i>
          <span>{{ props.articleDetail.views }}次阅读</span>
        </div>
      </div>
      <div class="bottom-right">
        <div
          class="item special"
          @click="handleSkipToArticleDetail(props.articleDetail.id, props.articleDetail.cover.path)"
        >
          <span>点击阅读</span>
          <i class="fa fa-sun-o"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
import FsImage from "../FsImage/FsImage.vue";
import type { IImageInfo, IImagePos } from "@/types/utils";
import type { IArticleItem } from "@/types/articleType";
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
.fs-blog-card {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s;
  background-color: #fff;
  .topBox {
    position: relative;
    &:hover .bgimg {
      filter: blur(3px);
    }
    .bgImage {
      width: 100%;
      height: 300px;
      transition: all 0.5s;
    }
    .titleBox {
      width: 80%;
      position: absolute;
      color: #fff;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .categary {
        height: 36px;
        padding: 0 12px;
        border-radius: 6px;
        background: #ed143d;
        color: #fff;
        font-size: 16px;
        line-height: 36px;
        opacity: 1;
        transition: all 0.5s;
      }
      .title {
        font-size: 30px;
        text-align: center;
        text-shadow: 3px 3px 3px rgb(0 0 0 / 60%);
        opacity: 1;
        transition: all 0.5s;
      }
      .introduce {
        opacity: 0;
        transition: all 0.5s;
        font-size: 25px;
        color: #000;
        transform: translateY(-20px) scale(0.8);
        text-align: center;
      }
      &:hover > .categary {
        transform: translateY(-10px);
        opacity: 0;
      }
      &:hover > .title {
        transform: translateY(10px);
        opacity: 0;
      }
      &:hover > .introduce {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  }
  .bottomBox {
    display: flex;
    padding: 0 10px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    .bottom-left {
      display: flex;
      .item {
        display: flex;
        align-items: center;
        margin-right: 10px;
        color: #717171;
        i {
          margin: 5px;
        }
      }
    }
    .special {
      cursor: pointer;
      span {
        margin-right: 5px;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &:hover {
    box-shadow: 5px 5px 60px #d0d0d0, -5px -5px 60px #f0f0f0;
  }
}
</style>
