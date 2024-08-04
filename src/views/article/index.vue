<template>
  <div
    class="article-container"
    ref="articleContainerRef"
    :style="{
      top: pos.top,
      left: pos.left,
      width: pos.width,
      height: pos.height,
    }"
  >
    <div :class="['article-content_bg', state.showMask ? 'article-content_bg__active' : '']">
      <img :src="currentPos?.path || currentArticle?.cover.path" alt="" />
    </div>
    <div class="article-content_text" v-show="state.showContent">
      <div class="article-content_text__scroll">
        <div class="scroll__left">
          <left-content
            @like-article="handleLikeArticle"
            :like-number="currentArticle?.liked"
            :friend-list="friendLinkList"
          />
        </div>
        <div class="scroll__center">
          <center-content :article-detail="currentArticle" />
        </div>
        <div class="scroll__right">
          <right-content @scroll-nav="handleScrollToNav" :image-adress="currentArticle?.cover.path" />
        </div>
        <fs-back-top />
      </div>
      <div class="back-home" title="点击返回上一页" @click="$router.back()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="article-bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import FsBackTop from "@/components/FsBackTop/FsBackTop.vue";
import leftContent from "./components/leftContent.vue";
import rightContent from "./components/rightContent.vue";
import centerContent from "./components/centerContent.vue";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import type { IImageInfo } from "@/types/utils";
import type { IArticleDetail } from "@/types/articleType";
import { addArticleView } from "@/service/api/article_request";
import useArticleStore from "@/stores/articleStore";
import useHomeStore from "@/stores/homeStore";
const $route = useRoute();
const articleContainerRef = ref<HTMLElement>();
const pos = ref<Omit<IImageInfo, "id" | "path">>({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
});
const { friendLinkList } = toRefs(useHomeStore());
const { currentArticle, currentPos, likeCurrentArticle, getCurrentArticle } = toRefs(useArticleStore());

const state = reactive({
  showMask: false,
  showContent: false,
  isLike: true,
  timer: null as null | number,
  articleData: {} as IArticleDetail,
});
onMounted(async () => {
  initMarked();
  initAnimation();
  await isRefreshPage();
});

// 判断是否刷新当前页面，重新获取文章
const isRefreshPage = async () => {
  if (!currentPos.value?.path) {
    await getArticleContent();
  }
};

// 初始化进入动画
const initAnimation = () => {
  if (articleContainerRef.value && currentPos.value) {
    pos.value.width = currentPos.value!.width + "px";
    pos.value.height = currentPos.value!.height + "px";
    pos.value.top = currentPos.value!.top + "px";
    pos.value.left = (currentPos.value!.left as number) - 200 + "px";
    setTimeout(() => {
      pos.value.top = 0;
      pos.value.left = 0;
      pos.value.width = "100%";
      pos.value.height = "100%";
    }, 0);
    setTimeout(async () => {
      await getArticleContent();
    }, 1000);
  } else {
    pos.value.top = 0;
    pos.value.left = 0;
    pos.value.width = "100%";
    pos.value.height = "100%";
  }
};

const getArticleContent = async () => {
  state.showMask = true;
  await getCurrentArticle.value($route.params.id as string);
  await addArticleView($route.params.id as string);
  currentArticle.value!.content = marked.parse(currentArticle.value!.content);
  state.showContent = true;
};

// 目录跳转
const handleScrollToNav = (offset: number) => {
  const contentDOM = document.getElementsByClassName("article-content_text__scroll")[0];
  contentDOM.scrollTo({ top: offset - 60, behavior: "smooth" });
};

// 点赞文章
const handleLikeArticle = () => {
  state.timer && clearTimeout(state.timer);
  state.isLike
    ? likeCurrentArticle.value($route.params.id as string).then((res) => {
        ElMessage.success(res);
      })
    : ElMessage.warning("点赞过于频繁");
  state.isLike = false;
  setTimeout(() => {
    state.isLike = true;
  }, 5000);
};

// 初始化marked
const initMarked = () => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
};
</script>

<style scoped lang="scss">
.article-container {
  position: relative;
  transition: all 0.6s;
  .article-content {
    &_bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
      &::after {
        position: absolute;
        content: "";
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        transition: all 0.5s;
        opacity: 0;
        background: rgba(187, 181, 181, 0.54);
      }
      &__active::after {
        opacity: 1;
      }
    }
    &_text {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 10;
      overflow: hidden;

      &__scroll {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        overflow-x: hidden;
        overflow-y: auto;
        .scroll__left {
          position: sticky;
          top: 20px;
          margin-top: 80px;
          margin-left: auto;
          width: 260px;
          z-index: 10;
        }
        .scroll__center {
          width: 48%;
          margin: 80px 50px;
          height: auto;
        }
        .scroll__right {
          position: sticky;
          width: 260px;
          top: 20px;
          margin-right: auto;
          margin-top: 80px;
          z-index: 10;
        }
      }
    }
  }

  .back-home {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    z-index: 100;
    box-shadow: 0 2px 10px #00000040;
    cursor: pointer;
    user-select: none;
    transition: all 0.25s;
    color: #394048;
    font-size: 40px;
    &:hover {
      width: 80px;
    }
  }
  .article-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    z-index: 3;
    background: url(@/assets/image/bottom.png) repeat center bottom;
    transform: rotateX(180deg);
    background-size: auto 100%;
  }
}
</style>
