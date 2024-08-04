<template>
  <div class="right-side-content">
    <div class="side-card">
      <fs-avatar-card />
    </div>
    <div class="side-card side-card__sticky">
      <fs-side-card title="文章标签">
        <template #content>
          <el-scrollbar max-height="300px">
            <ul>
              <li v-for="(item, index) in props.tagList" :key="index" class="tag-item">
                <span class="tag-item_color" :style="{ backgroundColor: randomColor() }"></span>
                <span class="tag-item_content">{{ item.name }}</span>
              </li>
            </ul>
          </el-scrollbar>
        </template>
      </fs-side-card>
    </div>
    <div class="side-card side-card__sticky" style="top: 370px">
      <fs-side-card title="友情链接">
        <template #content>
          <div class="link-card" v-for="(item, index) in props.friendList" :key="index">
            <fs-link-card :title="item.name" :link="item.link">
              <template #icon>
                <i class="fa fa-magic"></i>
              </template>
            </fs-link-card>
          </div>
        </template>
      </fs-side-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsSideCard from "@/components/FsSideCard/FsSideCard.vue";
import FsAvatarCard from "@/components/FsAvatarCard/FsAvatarCard.vue";
import FsLinkCard from "@/components/FsLinkCard/FsLinkCard.vue";
import type { IArticleTag } from "@/types/articleType";
import type { IFriendLink } from "@/types/friendType";

const props = defineProps<{
  tagList: IArticleTag[];
  friendList: IFriendLink[];
}>();

// 随机生成标签颜色
const randomColor = () => {
  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const r = random(0, 220);
  const g = random(0, 220);
  const b = random(0, 220);
  return `rgb(${r},${g},${b})`;
};
</script>

<style scoped lang="less">
.right-side-content {
  width: 280px;
  .side-card {
    margin-bottom: 20px;
    &__sticky {
      position: sticky;
      top: -20px;
    }
    ul {
      padding: 0;
      margin: 0;
      height: 100%;
      list-style: none;
      .tag-item {
        border: 1px solid #eee;
        float: left;
        display: flex;
        align-items: center;
        margin: 5px 5px;
        &_color {
          margin-left: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        &_content {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          padding: 0 10px;
          color: #717171;
        }
      }
    }
    .link-card {
      margin-top: 10px;
    }
  }
}
</style>
