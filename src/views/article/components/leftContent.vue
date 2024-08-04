<template>
  <div class="left-content">
    <div class="left-item" ref="recommendRef">
      <fs-recommend-card title="更多推荐">
        <div
          class="article-item"
          v-for="(item, index) in recommendList"
          :key="index"
          :style="{
            transform: `translateX(${isActive ? '0' : '110%'})`,
            transition: animate[index],
          }"
        >
          <fs-article-card :article-detail="item" @skip-to-detail="handleSkipToDetail" />
        </div>
      </fs-recommend-card>
    </div>
    <div class="left-item">
      <fs-recommend-card title="友情链接">
        <div class="link-item" v-for="(item, index) in props.friendList" :key="index">
          <fs-link-card :title="item.name" :link="item.link">
            <template #icon>
              <i class="fa fa-github"></i>
            </template>
          </fs-link-card>
        </div>
      </fs-recommend-card>
    </div>
    <div class="left-item operator-item">
      <div :class="['like-circle', isLike ? 'like-circle__active' : '']" @click="likeArticle">
        <i class="fa fa-thumbs-up"></i>
        <span>{{ props?.likeNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsRecommendCard from "@/components/FsRecommendCard/FsRecommendCard.vue";
import FsLinkCard from "@/components/FsLinkCard/FsLinkCard.vue";
import FsArticleCard from "@/components/FsArticleCard/FsArticleCard.vue";
import useHomeStore from "@/stores/homeStore";
import useArticleStore from "@/stores/articleStore";
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import type { IImageInfo } from "@/types/utils";
import useDomObserver from "@/hooks/useDomObserver";
import type { IFriendLink } from "@/types/friendType";
const props = defineProps<{
  likeNumber?: number;
  friendList: IFriendLink[];
}>();

const emit = defineEmits<{
  (e: "likeArticle"): void;
}>();

const animate = [
  "all 0.25s ease 0s",
  "all 0.25s ease 0.25s",
  "all 0.25s ease 0.5s",
  "all 0.25s ease 0.75s",
  "all 0.25s ease 1s",
];

const recommendRef = ref<HTMLElement>(),
  isActive = ref(false),
  isLike = ref(false);

const $router = useRouter(),
  { recommendList } = toRefs(useHomeStore()),
  { currentPos } = toRefs(useArticleStore());

useDomObserver(recommendRef, () => {
  isActive.value = true;
});

const likeArticle = () => {
  emit("likeArticle");
  isLike.value = true;
};

const handleSkipToDetail = async (item: IImageInfo) => {
  currentPos.value = item;
  $router.push(`/article/${item.id}`);
};
</script>

<style scoped lang="less">
.left-content {
  .left-item {
    overflow: hidden;
    margin-bottom: 20px;
    .article-item,
    .link-item {
      margin-top: 10px;
    }

    .like-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      cursor: pointer;
      &__active {
        color: #f00;
      }
      i {
        margin-bottom: 5px;
        font-size: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .operator-item {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
