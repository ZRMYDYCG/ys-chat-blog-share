<template>
  <div class="search-content">
    <fs-virtual-list :data-source="props.articleList" :item-height="160" @get-more-data="handleGetMoreData">
      <template #item="{ item }">
        <fs-search-card :article-detail="item" @skipToDetail="handleSkipToDetail"></fs-search-card>
      </template>
    </fs-virtual-list>
  </div>
</template>

<script setup lang="ts">
import FsSearchCard from "@/components/FsSearchCard/FsSearchCard.vue";
import FsVirtualList from "@/components/FsVirtualList/FsVirtualList.vue";
import type { IArticleItem } from "@/types/articleType";
import type { IImageInfo } from "@/types/utils";
import useArticleStore from "@/stores/articleStore";
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const $router = useRouter(),
  { currentPos } = toRefs(useArticleStore());
const props = defineProps<{
  articleList: IArticleItem[];
}>();

const emit = defineEmits<{
  (e: "getMoreData"): void;
}>();

const handleGetMoreData = () => {
  emit("getMoreData");
};

const handleSkipToDetail = async (item: IImageInfo) => {
  currentPos.value = item;
  $router.push(`article/${item.id}`);
};
</script>

<style scoped lang="scss">
.search-content {
  width: 100%;
  height: calc(100vh - 290px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}
</style>
