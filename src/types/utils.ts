// 博客图片位置信息类型

export interface IImagePos {
  width: number | string;
  height: number | string;
  left: number | string;
  top: number | string;
}

export interface IImageInfo extends IImagePos {
  id: string;
  path: string;
}

// 目录结构解析
export interface IArticleStruct {
  id: string;
  title: string;
  level: number;
  nodeName: string;
}

export interface IResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface IList<T> {
  count: number;
  rows: T;
}
