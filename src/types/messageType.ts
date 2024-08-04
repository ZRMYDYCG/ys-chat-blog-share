import type { IList } from "./utils";

export interface IMessageTag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  id: string;
  content: string;
  color: number;
  liked: number;
  source: string;
  createdAt: string;
  updatedAt: string;
  messageTag: TMessageTag;
  comment: IList<IMessageComment[]>;
}

export interface IMessageComment {
  id: string;
  content: string;
  color: number;
  author: string;
  messageId: string;
  createdAt: string;
  updateAt: string;
}

export interface IMessagePayload {
  content: string;
  color: number;
  tagId: string;
  source?: string;
}

export interface ICommentPayload {
  content: string;
  author: string;
  messageId: string;
}

type TMessageTag = Pick<IMessageTag, "id" | "name">;
