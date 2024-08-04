import type {
  IArticleCategory,
  IArticleTag,
  ITotalInfo,
  IHomeInfo,
  IArticleItem,
  IArticleDetail,
} from "@/types/articleType";
import type { IResponse, IList } from "@/types/utils";
import myRequest from "../index";

// 获取首页统计信息
function getHomeTotalInfo() {
  return myRequest.get<IResponse<ITotalInfo[]>>({
    url: "/home_total",
  });
}

// 获取首页信息内容
function getHomeListInfo() {
  return myRequest.get<IResponse<IHomeInfo>>({
    url: "/home_list",
  });
}

// 获取最新文章
function getArticleList(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponse<IArticleItem[]>>({
    url: "/article_list",
    params: payload,
  });
}

// 查询文章列表
function queryArticleList(payload: {
  limit: number;
  offset: number;
  keyWords?: string;
  isView?: number;
  isLike?: number;
  tag?: string;
  categoryId?: string;
}) {
  return myRequest.get<IResponse<IArticleItem[]>>({
    url: "/article_list/query",
    params: payload,
  });
}

// 获取指定文章详情
function getArticleDetail(id: string) {
  return myRequest.get<IResponse<IArticleDetail>>({
    url: `/article/${id}`,
  });
}

// 点赞文章
function likedArticle(id: string) {
  return myRequest.post<IResponse>({
    url: `/article/like/${id}`,
  });
}

// 增加文章阅读量
function addArticleView(id: string) {
  return myRequest.post<IResponse>({
    url: `/article/view/${id}`,
  });
}

// 获取文章标签
function getArticleTagList() {
  return myRequest.get<IResponse<IList<IArticleTag[]>>>({
    url: "/article_tag/list",
  });
}

// 获取文章分类
function getArticleCategory() {
  return myRequest.get<IResponse<IList<IArticleCategory[]>>>({
    url: "/article_category/list",
  });
}

export {
  getHomeTotalInfo,
  getArticleList,
  queryArticleList,
  getArticleDetail,
  likedArticle,
  addArticleView,
  getHomeListInfo,
  getArticleTagList,
  getArticleCategory,
};
