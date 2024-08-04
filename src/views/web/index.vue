<template>
  <div
    class="web-conatiner"
    ref="webContainerRef"
    id="scrollContainer"
    v-infinite-scroll="loadMore"
    :infinite-scroll-distance="200"
    :infinite-scroll-immediate="false"
  >
    <div class="web-content">
      <div class="web-content_tab">
        <fs-web-tab :tag-list="state.tagList" @choose-tab="handleChooseTag" />
      </div>
      <div class="web-content_header">
        <div class="web-content_header__left">{{ state.tagList.length && state.tagList[state.currentTag].name }}</div>
        <div class="web-content_header__right">
          <el-button plain style="border-radius: 0" @click="handleGetNewList">最新</el-button>
          <el-button plain style="margin: 0; border-radius: 0" @click="handleGetLikeList">最多点赞</el-button>
        </div>
      </div>
      <div class="web-content_list">
        <div class="web-item" v-for="(item, index) in state.webList" :key="index">
          <fs-web-card :web-detail="item" @like-web="handleLikeWeb" />
        </div>
        <div class="white-space"></div>
        <div class="white-space"></div>
      </div>
      <div class="web-content_empty" v-if="!state.webList.length">
        <img src="@/assets/image/empty.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsWebTab from "@/components/FsWebTab/FsWebTab.vue";
import FsWebCard from "@/components/FsWebCard/FsWebCard.vue";
import { onMounted, ref, reactive } from "vue";
import { getWebTagList, likeWeb, queryWebList } from "@/service/api/web_request";
import type { IWebTag, IWeb } from "@/types/webType";
import type { IResponse } from "@/types/utils";

const webContainerRef = ref<HTMLElement>();
const state = reactive({
  isLike: true,
  isFinish: false,
  currentTag: 0,
  timer: null as null | number,
  tagList: [] as IWebTag[],
  webList: [] as IWeb[],
});

const queryState = reactive({
  limit: 10,
  offset: 0,
  tag: "",
  isLike: 0,
});

const loadMore = () => {
  if (!state.isFinish) {
    getWebListData();
  }
};

onMounted(() => {
  getPageData();
  getWebListData();
});

const getWebListData = () => {
  queryWebList({ ...queryState }).then((res) => {
    state.webList = [...state.webList, ...res.data];
    queryState.offset += queryState.limit;
  });
};
const getPageData = () => {
  getWebTagList().then((res) => {
    state.tagList = [{ id: "first", name: "全部", createdAt: "null", updatedAt: "null" }, ...res.data.rows];
  });
};

// 点赞网站
const handleLikeWeb = (id: string) => {
  state.timer && clearTimeout(state.timer);
  state.isLike
    ? likeWeb(id).then((res) => {
        state.webList.find((item) => item.id === id)!.liked++;
        ElMessage.success(res.message);
      })
    : ElMessage.warning("点赞过于频繁");
  state.isLike = false;
  state.timer = setTimeout(() => {
    state.isLike = true;
  }, 5000);
};

const handleChooseTag = (index: number) => {
  restQuery();
  state.currentTag = index;
  queryState.tag = state.tagList[index].name;
  queryState.tag = queryState.tag === "全部" ? "" : queryState.tag;
  getWebListData();
};

const handleGetNewList = () => {
  restQuery();
  getWebListData();
};

const handleGetLikeList = () => {
  restQuery();
  queryState.isLike = 1;
  getWebListData();
};

const restQuery = () => {
  queryState.tag = "";
  queryState.isLike = 0;
  queryState.offset = 0;
  state.isFinish = false;

  state.webList = [];
};
</script>

<style scoped lang="scss">
.web-conatiner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f5f7;
  overflow-y: scroll;

  .web-content {
    margin-top: 60px;
    width: 90%;
    max-width: 1200px;

    &_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 15px;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      &__left {
        font-size: 25px;
        font-weight: 700;
      }
    }
    &_list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      justify-content: space-between;
      .web-item {
        width: 32.5%;
        margin-bottom: 15px;
        transition: all 0.3s;
        animation: card-in 0.6s ease-in-out;
        &:hover {
          box-shadow: 0 0 15px rgb(0 0 0 / 20%);
        }
      }
      .white-space {
        width: 32.5%;
        height: 0;
      }
    }
    &_empty {
      text-align: center;
      margin-top: 10px;
    }
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(-120px) scale(1.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
