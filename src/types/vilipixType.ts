// 获取排行榜数据
export interface IRankingResponse {
  code: number;
  data: IRankingData;
  message: string;
}

export interface IRankingData {
  count: number;
  rows: IRankingItem[];
}

export interface IRankingItem {
  picture_id: string;
  title: string;
  width: number;
  height: number;
  regular_url: string;
  original_url: string;
  page_total: number;
  type: number;
  like_total: number;
  comment_total: number;
  tags: string;
  created_at: Date;
  ranking: Ranking;
}

export interface Ranking {
  ranking_date: string;
  type: number;
  status: number;
  bussiness_id: string;
  sort: number;
  last_sort: number;
  created_at: Date;
  updated_at: Date;
}
