import type { IRankingResponse } from "@/types/vilipixType";
import myRequest from "../index";

// 获取日排行榜图片
function getVilipixRankingList(payload: { pageSize: number; page: number }) {
  return myRequest.get<IRankingResponse>({
    url: "/vilipix/ranking",
    params: payload,
  });
}

export { getVilipixRankingList };
