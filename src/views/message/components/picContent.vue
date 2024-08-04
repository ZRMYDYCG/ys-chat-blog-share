<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 18:34:56
 * @FilePath: \blog-front-vue3\src\views\message\components\picContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="pic-content" ref="picContentRef" @scroll="handleScroll">
    <div class="pic-content_title">
      <p>插画墙</p>
      <span>光与影，定格当下。</span>
    </div>
    <div class="pic-content_list">
      <fs-water-fall :image-list="state.imageList" :column="5" :gap="20" :loading="state.loading" v-slot="{ adress }">
        <a class="image-container" :href="adress" target="_blank">
          <img :src="adress" />
          <div class="img__mask">查看大图</div>
        </a>
      </fs-water-fall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import FsWaterFall from "@/components/FsWaterFall/FsWaterFall.vue";
import { getVilipixRankingList } from "@/service/api/vilipix_request";
import type { IImageInfoData } from "@/components/FsWaterFall/types";
import { __debounce } from "@/utils/tools";

const picContentRef = ref<HTMLElement>();
const state = reactive({
  imageList: [] as IImageInfoData[],
  page: 1,
  pageSize: 30,
  finish: false,
  loading: false,
});
onMounted(() => {
  getPicList();
});

const handleScroll = __debounce((e: any) => {
  if (picContentRef.value) {
    const scrollHeight = picContentRef.value.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = picContentRef.value.clientHeight;
    if (clientHeight + scrollTop >= scrollHeight - 100) {
      !state.finish && getPicList();
    }
  }
}, 500);

const getPicList = async () => {
  state.loading = true;
  const res = await getVilipixRankingList({ pageSize: state.pageSize, page: state.page });
  const imageList: IImageInfoData[] = [];
  state.loading = false;
  if (!res.data.rows.length) {
    state.finish = true;
  }
  res.data.rows.forEach((item) => {
    imageList.push({
      width: item.width,
      height: item.height,
      adress: item.regular_url,
    });
  });
  state.imageList = [...state.imageList, ...imageList];
  state.page++;
};
</script>

<style scoped lang="scss">
.pic-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  &_title {
    text-align: center;
    p {
      font-size: 36px;
      font-weight: 700;
      margin: 20px 0;
    }
    span {
      font-size: 18px;
    }
  }

  &_list {
    width: 100%;
    height: calc(100vh - 200px);
    margin-top: 20px;
    padding: 0 20px;
    .image-container {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      .img__mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        z-index: 999;
        color: #fff;
      }
      &:hover .img__mask {
        opacity: 1;
      }
      &:hover img {
        transform: scale(1.1);
      }
      img {
        width: 100%;
        height: 100%;
        transition: all 0.3s;
      }
    }
  }
}
</style>
