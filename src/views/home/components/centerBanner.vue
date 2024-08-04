<template>
  <div class="center-banner">
    <FSBannerCarousel :banner-list="props.bannerList" @skip-to-detail="handleSkipToDetail" />
    <div class="center-side">
      <div class="bg-move">
        <fs-move-cover path="http://pic.fasyncsy.com.cn/coverPic/5.png" />
      </div>

      <div class="bg-card">
        <fs-image :src="BASE_BG1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import FSBannerCarousel from "@/components/FsBannerCarousel/FSBannerCarousel.vue";
import FsMoveCover from "@/components/FsMoveCover/FsMoveCover.vue";
import FsImage from "@/components/FsImage/FsImage.vue";
import useArticleStore from "@/stores/articleStore";
import { BASE_BG1 } from "@/config/images";
import type { IArticle } from "@/types/articleType";
import type { IImageInfo } from "@/types/utils";

const props = defineProps<{
  bannerList: IArticle[];
}>();

const $router = useRouter(),
  { currentPos } = toRefs(useArticleStore());

const handleSkipToDetail = async (item: IImageInfo) => {
  currentPos.value = item;
  $router.push(`/article/${item.id}`);
};
</script>

<style scoped lang="scss">
.center-banner {
  width: 100%;
  height: 36vw;
  display: flex;

  .center-side {
    width: 360px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    .bg-move {
      width: 100%;
      height: 65%;
    }
    .bg-card {
      width: 100%;
      flex: 1;
      margin-top: 20px;
      border: 4px solid #fff;
      border-radius: 10px;
      box-shadow: 0 1px 3px #1a1a1a1a;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  // 覆盖轮播指示器样式
  :deep(.el-carousel .el-carousel__arrow--left) {
    transform: rotate(90deg) translate(-50%, -50%) !important;
    left: -60px;
  }
  :deep(.el-carousel .el-carousel__arrow--right) {
    transform: rotate(-90deg) translate(50%, -50%) !important;
    right: -60px;
  }
  :deep(.el-carousel .el-carousel__container .el-carousel__arrow) {
    width: 0 !important;
    height: 0 !important;
    border: 50px solid transparent !important;
    border-bottom: 50px solid rgba(255, 255, 255, 0.9) !important;
    border-radius: 0 !important;
    background-color: transparent !important;
  }
}
</style>
