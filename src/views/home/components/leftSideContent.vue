<template>
  <div class="left-side-content">
    <div class="side-card">
      <introduce-card :total-info="props.totalInfo" />
    </div>
    <div class="side-card" ref="recommandRef">
      <fs-side-card title="推荐外文">
        <template #content>
          <ul>
            <li
              v-for="(item, index) in recommendArticle"
              class="out-article-item"
              :key="index"
              :style="{
                transform: `translateX(${isRecommend ? '0' : '110%'})`,
                transition: animate[index],
              }"
            >
              <span class="out-article-item_ranking">{{ index + 1 }}</span>
              <span class="out-article-item_title"
                ><a :href="item.target" target="_blank" class="adress">{{ item.title }}</a></span
              >
            </li>
          </ul>
        </template>
      </fs-side-card>
    </div>
    <div class="side-card side-card__sticky" ref="sideRef">
      <fs-side-card title="最受欢迎的文章">
        <template #content>
          <div
            class="article-item"
            v-for="(item, index) in props.recommendList"
            :key="index"
            :style="{
              transform: `translateX(${isSide ? '0' : '110%'})`,
              transition: animate[index],
            }"
          >
            <fs-article-card :article-detail="item" @skip-to-detail="handleSkipToDetail" />
          </div>
        </template>
      </fs-side-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsSideCard from "@/components/FsSideCard/FsSideCard.vue";
import FsArticleCard from "@/components/FsArticleCard/FsArticleCard.vue";
import introduceCard from "./introduceCard.vue";
import type { IArticle, ITotalInfo } from "@/types/articleType";
import type { IRecommendArticle } from "@/types/recommendType";
import { useRouter } from "vue-router";
import useArticleStore from "@/stores/articleStore";
import type { IImageInfo } from "@/types/utils";
import { ref, toRefs } from "vue";
import useDomObserver from "@/hooks/useDomObserver";

const props = defineProps<{
  totalInfo: ITotalInfo[];
  recommendList: IArticle[];
  recommendArticle: IRecommendArticle[];
}>();

const animate = [
  "all 0.25s ease 0s",
  "all 0.25s ease 0.25s",
  "all 0.25s ease 0.5s",
  "all 0.25s ease 0.75s",
  "all 0.25s ease 1s",
];

const sideRef = ref<HTMLElement>(),
  recommandRef = ref<HTMLElement>(),
  isSide = ref(false),
  isRecommend = ref(false);

const $router = useRouter(),
  { currentPos } = toRefs(useArticleStore());

useDomObserver(recommandRef, () => {
  isRecommend.value = true;
});

useDomObserver(sideRef, () => {
  isSide.value = true;
});

const handleSkipToDetail = async (item: IImageInfo) => {
  currentPos.value = item;
  $router.push(`/article/${item.id}`);
};
</script>

<style scoped lang="scss">
.left-side-content {
  width: 280px;
  .side-card {
    margin-bottom: 20px;
    overflow: hidden;
    &__sticky {
      position: sticky;
      top: -20px;
    }
  }
  .article-item {
    margin-top: 10px;
  }
  .out-article-item {
    padding: 5px 10px;
    margin-bottom: 5px;
    width: 100%;

    &_ranking {
      float: left;
      display: block;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 20px;
      margin-right: 10px;
      background-color: #07d9d7;
      color: #fff;
    }
    &_title {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(odd) {
      background-color: rgb(246, 246, 246);
    }
    &:hover a {
      color: #aaa;
    }
  }
}
</style>
