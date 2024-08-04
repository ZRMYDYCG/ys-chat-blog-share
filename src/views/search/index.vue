<template>
  <div class="search-container">
    <search-header
      :category-list="state.categoryList"
      :tag-list="state.tagList"
      :btn-loading="state.btnLoading"
      @choose-tag="handleChooseTag"
      @choose-category="handleChooseCategory"
      @choose-sort="handleChooseSort"
      @search-content="handleSearchContent"
    />
    <search-content
      :article-list="state.articleList"
      @get-more-data="handleGetMoreData"
      v-if="state.articleList.length"
    />
    <div class="search-container__empty" v-else>
      <img src="@/assets/image/empty.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import searchHeader from "./components/searchHeader.vue";
import searchContent from "./components/searchContent.vue";
import { getArticleTagList, getArticleCategory, queryArticleList } from "@/service/api/article_request";
import { onMounted, reactive } from "vue";
import type { IArticleCategory, IArticleItem, IArticleTag } from "@/types/articleType";

const state = reactive({
  isFinish: false,
  btnLoading: false,
  tagList: [] as IArticleTag[],
  categoryList: [] as IArticleCategory[],
  articleList: [] as IArticleItem[],
});

const queryState = reactive({
  limit: 6,
  offset: 0,
  isView: 0,
  isLike: 0,
  keyWords: "",
  tag: "",
  categoryId: "",
});

onMounted(() => {
  getRequestData();
});

const getRequestData = () => {
  getArticleTagList().then((res) => {
    state.tagList = [{ id: "first", name: "全部标签", createdAt: "null", updatedAt: "null" }, ...res.data.rows];
  });
  getArticleCategory().then((res) => {
    state.categoryList = [{ id: "first", name: "全部分类", createdAt: "null", updatedAt: "null" }, ...res.data.rows];
  });
  getSearchArticle();
};

const handleGetMoreData = () => {
  getSearchArticle();
};

const getSearchArticle = () => {
  if (!state.isFinish) {
    state.btnLoading = true;
    queryArticleList(queryState).then((res) => {
      if (!res.data.length) {
        state.isFinish = true;
        ElMessage.success("已加载全部文章");
      } else {
        state.articleList = [...state.articleList, ...res.data];
        queryState.offset += queryState.limit;
      }
      state.btnLoading = false;
    });
  }
};

const handleChooseTag = (index: number) => {
  resetQuery();
  queryState.tag = index ? state.tagList[index].name : "";
  getSearchArticle();
};

const handleChooseCategory = (index: number) => {
  resetQuery();
  queryState.categoryId = index ? state.categoryList[index].id : "";
  getSearchArticle();
};
// 0: createdAt 1: views 2: likes
const handleChooseSort = (index: number) => {
  resetQuery();
  switch (index) {
    case 1:
      queryState.isView = 1;
      break;
    case 2:
      queryState.isLike = 1;
      break;
  }
  getSearchArticle();
};

const handleSearchContent = (value: string) => {
  resetQuery();
  queryState.keyWords = value;
  getSearchArticle();
};

// 重置搜索条件
const resetQuery = () => {
  queryState.tag = "";
  queryState.categoryId = "";
  queryState.keyWords = "";
  queryState.offset = 0;
  queryState.isLike = 0;
  queryState.isView = 0;
  state.isFinish = false;
  state.articleList = [];
};
</script>

<style scoped lang="scss">
.search-container {
  background-color: #f4f5f7;
  height: 100vh;
  &__empty {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
