<template>
  <div
    class="fs-message-card"
    :style="{
      background: props.cardColor,
      border: props.cardBorder,
    }"
  >
    <div class="fs-message-card_header">
      <div class="header-time">{{ moment(props.messageDetail.createdAt).format("YYYY.MM.DD HH:mm") }}</div>
      <div class="header-type">{{ props.messageDetail.messageTag.name }}</div>
    </div>
    <div class="fs-message-card_content">{{ props.messageDetail.content }}</div>
    <div class="fs-message-card_footer">
      <div class="footer-operator">
        <div class="operator-item" @click.stop="handleLikeMessage(props.messageDetail.id)">
          <i class="fa fa-heart"></i>
          <span>{{ props.messageDetail.liked }}</span>
        </div>
        <div class="operator-item">
          <i class="fa fa-commenting"></i>
          <span>{{ props.messageDetail.comment.count }}</span>
        </div>
      </div>
      <div class="footer-author">{{ props.messageDetail.source }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessage } from "@/types/messageType";
import moment from "moment";
const props = defineProps<{
  messageDetail: IMessage;
  cardColor: string;
  cardBorder: string;
}>();

const emit = defineEmits<{
  (e: "likeMessage", messageId: string): void;
}>();

const handleLikeMessage = (messageId: string) => {
  emit("likeMessage", messageId);
};
</script>

<style scoped lang="scss">
.fs-message-card {
  width: 100%;
  height: 100%;
  padding: 20px;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;

  &_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #949494;
  }
  &_content {
    flex: 1;
    margin: 15px 0;
    letter-spacing: 0.1em;
    line-height: 1.5em;
  }
  &_footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .footer-operator {
      color: #949494;
      display: flex;
      gap: 10px;
      span {
        margin-left: 5px;
      }
      .operator-item {
        transition: all 0.3s;
        &:hover {
          color: #f00;
        }
      }
    }
  }
}
</style>
