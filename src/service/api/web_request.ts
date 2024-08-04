import type { IList, IResponse } from "@/types/utils";
import type { IWeb, IWebTag } from "@/types/webType";
import myRequest from "../index";

// 获取网站列表
function getWebList(payload: { limit: number; offset: number; tagId?: string }) {
  return myRequest.get<IResponse<IWeb[]>>({
    url: "/web_list",
    params: payload,
  });
}

// 查询网站列表
function queryWebList(payload: { offset: number; limit: number; tag?: string; isLike?: number }) {
  return myRequest.get<IResponse<IWeb[]>>({
    url: "/web_list/query",
    params: payload,
  });
}

// 网站点赞
function likeWeb(id: string) {
  return myRequest.post<IResponse>({
    url: `/web/like/${id}`,
  });
}

// 获取站点网站标签
function getWebTagList() {
  return myRequest.get<IResponse<IList<IWebTag[]>>>({
    url: "/web_tag/list",
  });
}

export { getWebList, queryWebList, getWebTagList, likeWeb };
