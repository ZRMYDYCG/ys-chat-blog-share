import { getHomeTotalInfo, getHomeListInfo } from "@/service/api/article_request";
import type { IArticle, IArticleTag, ITotalInfo } from "@/types/articleType";
import type { IFriendLink } from "@/types/friendType";
import type { IRecommendArticle } from "@/types/recommendType";
import { defineStore } from "pinia";
import { ref } from "vue";

const useHomeStore = defineStore("home", () => {
  const bannerList = ref<IArticle[]>([]),
    recommendList = ref<IArticle[]>([]),
    recommendArticleList = ref<IRecommendArticle[]>([]),
    friendLinkList = ref<IFriendLink[]>([]),
    tagList = ref<IArticleTag[]>([]),
    totalInfo = ref<ITotalInfo[]>([]);

  const initHomeData = () => {
    getHomeListInfo().then((res) => {
      bannerList.value = res.data.bannerList;
      recommendList.value = res.data.recommendList;
      recommendArticleList.value = res.data.recommendArticleList.rows;
      tagList.value = res.data.tagList.rows;
      friendLinkList.value = res.data.friendLinkList.rows;
    });

    getHomeTotalInfo().then((res) => {
      totalInfo.value = res.data;
    });
  };

  return {
    bannerList,
    recommendList,
    recommendArticleList,
    tagList,
    friendLinkList,
    totalInfo,
    initHomeData,
  };
});

export default useHomeStore;
