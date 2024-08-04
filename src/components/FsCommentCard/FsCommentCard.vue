<template>
  <div class="fs-comment-card">
    <div class="fs-comment-card__left">
      <div class="avatar" :style="{ backgroundImage: props.avatarColor }"></div>
    </div>
    <div class="fs-comment-card__right">
      <div class="title">
        <span class="title-author">{{ props.commentDetail.author }}</span>
        <span class="title-time">{{ moment(props.commentDetail.createdAt).format("YYYY.MM.DD HH:mm") }}</span>
      </div>
      <div class="content">{{ props.commentDetail.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMessageComment } from "@/types/messageType";
import moment from "moment";
const props = defineProps<{
  commentDetail: IMessageComment;
  avatarColor: string;
}>();
</script>

<style scoped lang="less">
.fs-comment-card {
  display: flex;
  &__left {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  &__right {
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 20px;
      &-author {
        font-weight: 700;
        font-size: 14px;
        margin-right: 5px;
      }
      &-time {
        font-size: 12px;
        color: #949494;
      }
    }
  }
}
</style>
