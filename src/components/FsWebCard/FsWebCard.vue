<template>
  <div class="fs-web-card">
    <div class="fs-web-card__top">
      <div class="top-content">
        <div class="top-content_img">
          <a :href="props.webDetail.adress" target="_blank" class="img-link">
            <img :src="props.webDetail.cover" />
          </a>
        </div>
        <div class="top-content_text">
          <a :href="props.webDetail.adress" target="_blank">{{ props.webDetail.name }}</a>
          <div class="introduce">{{ props.webDetail.introduce }}</div>
        </div>
      </div>

      <div class="top-tag">
        <span class="tag-item" v-for="(item, index) in props.webDetail.tags" :key="index">{{ item }}</span>
      </div>
    </div>
    <div class="fs-web-card__bottom">
      <div class="bottom-operator" @click="handleLikeWeb">
        <i class="fa fa-heart"></i>
        <span style="margin-left: 5px">{{ props.webDetail.liked }}</span>
      </div>
      <div class="bottom-operator">
        <a :href="props.webDetail.adress" target="_blank">
          <i class="fa fa-send-o"></i>
        </a>
      </div>
    </div>
    <div class="fs-web-card__tag" v-if="props.webDetail.status === 2">推荐</div>
  </div>
</template>

<script setup lang="ts">
import type { IWeb } from "@/types/webType";

const props = defineProps<{
  webDetail: IWeb;
}>();

const emit = defineEmits<{
  (e: "likeWeb", id: string): void;
}>();

const handleLikeWeb = () => {
  emit("likeWeb", props.webDetail.id);
};
</script>

<style scoped lang="less">
.fs-web-card {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  &__top {
    width: 100%;
    height: 160px;
    padding: 20px;
    .top-content {
      display: flex;
      height: 110px;

      a {
        display: block;
        text-decoration: none;
        color: #000000;
        font-size: 22px;
        font-weight: 700;
      }
      .img-link {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &_text {
        .introduce {
          margin-top: 10px;
        }
      }
    }
    .top-tag {
      display: flex;
      justify-content: right;
      gap: 10px;
      .tag-item {
        padding: 3px 10px;
        background-color: #f0eeee;
        border: 1px solid #e2e2e2;
        font-size: 14px;
        &__special {
          color: #fff;
          border: 1px solid #c24242;
          background-color: #dd6161;
        }
      }
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    border-top: 1px solid #eee;
    > div:first-child::after {
      position: absolute;
      content: "";
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background-color: #eee;
    }
    .bottom-operator {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex: 1;
      color: #9a9a9a;
      a {
        color: #9a9a9a;
      }
      &:hover {
        color: #f00;
      }
      &:hover a {
        color: #f00;
      }
    }
  }
  &__tag {
    position: absolute;
    right: -30px;
    top: 15px;
    width: 120px;
    height: 15px;
    text-align: center;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #dd6161;
    transform: rotate(45deg);
  }
}
</style>
