<template>
  <el-carousel
    height="36vw"
    ref="carouselRef"
    @change="handleCarouselChange"
    class="fs-banner-carousel"
    indicator-position="none"
  >
    <el-carousel-item
      v-for="(item, index) in props.bannerList"
      :key="index"
      :class="[currentIndex === index ? 'carousel-active' : '', currentIndex !== index ? 'carousel-leave' : '']"
    >
      <div class="carousel-text">
        <div class="carousel-text_tip">推荐文章</div>
        <div class="carousel-text_title">"{{ item.title }}"</div>
        <el-button type="success" round class="carousel-text_btn btn_active" @click="handleSkipToArticleDetail(index)"
          >READ MORE</el-button
        >
        <div class="carousel-text_next next_active">
          <i class="fa fa-bookmark-o"></i>
          |
          <span>Next</span>
        </div>
      </div>
      <fs-image :src="item.cover.path" class="carousel-img" ref="imageRef" :alt="item.title" />
    </el-carousel-item>
    <div class="carousel-nav">
      <div v-for="(item, index) in props.bannerList" :class="[currentIndex === index ? 'img_active' : '']">
        <img :src="item.cover.path" :alt="item.title" @mouseover="handleChangeImg(index)" />
      </div>
    </div>
  </el-carousel>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsImage from "../FsImage/FsImage.vue";
import type { IArticle } from "@/types/articleType";
import type { IImageInfo, IImagePos } from "@/types/utils";

const props = defineProps<{
  bannerList: IArticle[];
}>();

const emit = defineEmits<{
  (e: "skipToDetail", item: IImageInfo): void;
}>();

const carouselRef = ref<any>();
const imageRef = ref<any>();

const currentIndex = ref(0);

const handleCarouselChange = (index: number) => {
  currentIndex.value = index;
};

const handleChangeImg = (index: number) => {
  carouselRef.value.setActiveItem(index);
};

const handleSkipToArticleDetail = (index: number) => {
  const id = props.bannerList[index].id;
  const path = props.bannerList[index].cover.path;
  const pos = imageRef.value[index].getImagePosInfo() as IImagePos;
  emit("skipToDetail", { ...pos, id,path });
};
</script>

<style scoped lang="less">
.fs-banner-carousel {
  position: relative;
  flex: 1;
  border-radius: 10px;
  border: 5px solid #fff;
  box-shadow: 0 1px 3px #1a1a1a1a;
  overflow: hidden;

  .carousel-text {
    position: absolute;
    left: 100px;
    top: 45%;
    z-index: 1;
    color: #fff;
    > div {
      margin: 20px 0;
    }
    &_tip {
      font-size: 20px;
      position: relative;

      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: -20px;
        top: 15%;
        border: 10px solid transparent;
        border-left: 10px solid #f00;
      }
    }
    &_title {
      font-size: 30px;
    }
    &_btn {
      transform: translate(-150px);
      opacity: 0;
      transition: all 0.5s;
    }
    &_next {
      font-size: 20px;
      display: flex;
      gap: 15px;
      transform: translateY(100px);
      opacity: 0;
      cursor: pointer;
      transition: all 0.5s;
    }
    &:hover .next_active {
      transform: translateY(0);
      opacity: 1;
    }
    &:hover .btn_active {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .carousel-img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .carousel-leave {
    animation: carousel-out 0.5s ease-in;
  }
  .carousel-active {
    animation: carousel-in 0.5s ease-out;
  }

  .carousel-nav {
    position: absolute;
    right: 20px;
    bottom: 30px;
    z-index: 10;
    display: flex;

    > div {
      width: 128px;
      height: 68px;
      transform: scale(1);
      box-shadow: 5px 5px 10px #0000;
      cursor: pointer;
      transition: all 0.25s;
      border-radius: 4px;
      overflow: hidden;
      margin-left: 15px;
      img {
        width: 100%;
        height: 100%;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
    .img_active {
      transform: scale(1.1);
      box-shadow: 0 15px #0000;
    }
  }
}

@keyframes carousel-out {
  0% {
    opacity: 1;
    transform: translateZ(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(-300px, 0, 1px) scale(1.8);
  }
}

@keyframes carousel-in {
  0% {
    opacity: 0;
    transform: translate3d(300px, 0, 1px) scale(1.8);
  }
  100% {
    opacity: 1;
    transform: translateZ(0) scale(1);
  }
}
</style>
