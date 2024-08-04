import type { IFriendLink } from "./friendType";
import type { IRecommendArticle } from "./recommendType";
import type { IList } from "./utils";

export interface IArticle {
  id: string;
  title: string;
  liked: number;
  views: number;
  introduce: string;
  createdAt: string;
  updatedAt: string;
  cover: {
    id: string;
    path: string;
  };
}

export interface IArticleItem extends IArticle {
  category: {
    id: string;
    name: string;
  };
}

export interface IArticleDetail extends IArticleItem {
  content: string;
  tags: string[];
}

export interface IArticleTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IArticleTagDetail {
  id: string;
  name: string;
  at: {
    articleId: string;
    tagId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IArticleCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITotalInfo {
  name: string;
  count: number;
}

export interface IHomeInfo {
  tagList: IList<IArticleTag[]>;
  bannerList: IArticle[];
  recommendList: IArticle[];
  recommendArticleList: IList<IRecommendArticle[]>;
  friendLinkList: IList<IFriendLink[]>;
}
