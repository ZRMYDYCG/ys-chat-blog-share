import type { IMessage, IMessagePayload, ICommentPayload, IMessageTag, IMessageComment } from "@/types/messageType";
import type { IList, IResponse } from "@/types/utils";
import myRequest from "../index";

// 获取留言板列表
function getMessageList(payload: { limit: number; offset: number; tagId?: string }) {
  return myRequest.get<IResponse<IList<IMessage[]>>>({
    url: "/message_list",
    params: payload,
  });
}

// 获取指定信息评论
function getCurrentComment(messageId: string) {
  return myRequest.get<IResponse<IList<IMessageComment[]>>>({
    url: `/message/comment_list/${messageId}`,
  });
}

// 添加留言
function addMessage(payload: IMessagePayload) {
  return myRequest.post<IResponse>({
    url: "/message/add",
    data: payload,
  });
}

// 添加留言评论
function addMessageComment(payload: ICommentPayload) {
  return myRequest.post<IResponse>({
    url: `/message/comment/${payload.messageId}`,
    data: {
      author: payload.author,
      content: payload.content,
    },
  });
}

// 留言点赞
function likeMessage(id: string) {
  return myRequest.post<IResponse>({
    url: `/message/like/${id}`,
  });
}
// 获取留言板标签
function getMessageTagList() {
  return myRequest.get<IResponse<IList<IMessageTag[]>>>({
    url: "/message_tag/list",
  });
}

export { getMessageList, getCurrentComment, addMessage, addMessageComment, getMessageTagList, likeMessage };
