<template>
  <div
    class="home-container"
    ref="homeContaninerRef"
    v-infinite-scroll="loadMore"
    :infinite-scroll-immediate="false"
    @mouseover="handleMouseOver"
    @mouseleave="state.showFooter = false"
  >
    <div class="home-banner">
      <center-banner :banner-list="bannerList" />
    </div>

    <div class="home-content">
      <left-side-content
        :total-info="totalInfo"
        :recommend-list="recommendList"
        :recommend-article="recommendArticleList"
      />
      <article-list :article-list="state.articleList" />
      <right-side-content :tag-list="tagList" :friend-list="friendLinkList" />
    </div>
    <fs-back-top />
    <div :class="['web-footer', state.showFooter ? 'web-footer__active' : '']">
      <fs-web-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import FsWebFooter from "@/components/FsWebFooter/FsWebFooter.vue";
import FsBackTop from "@/components/FsBackTop/FsBackTop.vue";
import centerBanner from "./components/centerBanner.vue";
import articleList from "./components/articleList.vue";
import leftSideContent from "./components/leftSideContent.vue";
import rightSideContent from "./components/rightSideContent.vue";
import useHomeStore from "@/stores/homeStore";
import type { IArticleItem } from "@/types/articleType";
import { getArticleList } from "@/service/api/article_request";
const state = reactive({
  limit: 2,
  offset: 0,
  isFinish: false,
  showFooter: false,
  articleList: [] as IArticleItem[],
});
const { recommendList, recommendArticleList, friendLinkList, bannerList, tagList, totalInfo } = toRefs(useHomeStore());
const homeContaninerRef = ref<HTMLElement>();
onMounted(() => {
  getArticleList({ limit: state.limit, offset: state.offset }).then((res) => {
    state.articleList = [...state.articleList, ...res.data];
  });
});

const loadMore = () => {
  if (!state.isFinish) {
    state.offset += state.limit;
    getArticleList({ limit: state.limit, offset: state.offset }).then((res) => {
      state.articleList = [...state.articleList, ...res.data];
      if (!res.data.length) {
        state.isFinish = true;
        ElMessage.success("已加载全部文章");
      }
    });
  }
};

const handleMouseOver = (e: MouseEvent) => {
  if (homeContaninerRef.value) {
    const clinetHeight = homeContaninerRef.value.offsetHeight;
    console.log(clinetHeight - e.clientY);
    state.showFooter = clinetHeight - e.clientY <= 200 ? true : false;
  }
};
</script>

<style scoped lang="scss">
.home-container {
  background-color: #f4f5f7;
  overflow-y: scroll;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 35px;

  .home-banner {
    margin-bottom: 20px;
    width: 100%;
  }
  .web-footer {
    position: absolute;
    bottom: -250px;
    left: 200px;
    width: calc(100vw - 200px);
    z-index: 999;
    opacity: 0;
    transition: all 0.3s;
  }
  .web-footer__active {
    bottom: 0;
    opacity: 1;
  }
  .home-content {
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
  @media screen and (min-width: 1600px) {
    .home-content {
      width: 80%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
