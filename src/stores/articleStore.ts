import { getArticleDetail, likedArticle } from "@/service/api/article_request";
import type { IArticleDetail } from "@/types/articleType";
import type { IImageInfo } from "@/types/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

const useArticleStore = defineStore("article", () => {
  const currentArticle = ref<IArticleDetail>(),
    currentPos = ref<IImageInfo>();

  const getCurrentArticle = (id: string) => {
    return new Promise((resolve) => {
      getArticleDetail(id).then((res) => {
        currentArticle.value = res.data;
        resolve("success");
      });
    });
  };

  const likeCurrentArticle = (id: string) => {
    return new Promise((resolve) => {
      likedArticle(id).then((res) => {
        currentArticle.value!.liked++;
        resolve(res.message);
      });
    });
  };

  return {
    currentArticle,
    currentPos,
    getCurrentArticle,
    likeCurrentArticle,
  };
});

export default useArticleStore;
