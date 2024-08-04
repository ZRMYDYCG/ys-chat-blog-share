export interface IWebTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWeb {
  id: string;
  adress: string;
  cover: string;
  name: string;
  introduce: string;
  createdAt: string;
  updatedAt: string;
  liked: number;
  tags: string[];
  status: number;
}
