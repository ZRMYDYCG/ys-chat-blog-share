<template>
  <div class="search-header">
    <div class="search-header-box">
      <div class="input-box">
        <el-input v-model="searchValue" type="text" class="input-box_content"></el-input>
        <div class="input-box_drop">
          <el-dropdown>
            <span class="el-dropdown-link">
              <span>{{ dropOptions[currentSort].text }}</span
              ><el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in dropOptions" :key="item.id" @click="chooseSort(index)">{{
                  item.text
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div :class="['search-btn', props.btnLoading ? 'search-btn__loading' : '']" @click="hanleSearch">
        <i class="fa fa-search"></i>
      </div>
    </div>
    <div class="search-header-filter">
      <div class="filter-list">
        <ul>
          <li
            v-for="(item, index) in props.categoryList"
            :key="index"
            :class="[currentCategory === index ? 'item_active' : '']"
            @click="chooseCategory(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="filter-list">
        <ul>
          <li
            v-for="(item, index) in props.tagList"
            :key="index"
            :class="[currentTag === index ? 'item_active' : '']"
            @click="chooseTag(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticleCategory, IArticleTag } from "@/types/articleType";
import { ArrowDown } from "@element-plus/icons-vue";
import { ref } from "vue";

const props = defineProps<{
  tagList: IArticleTag[];
  categoryList: IArticleCategory[];
  btnLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "chooseTag", index: number): void;
  (e: "chooseCategory", index: number): void;
  (e: "chooseSort", index: number): void;
  (e: "searchContent", value: string): void;
}>();

const dropOptions = ref([
  {
    text: "发布时间",
    id: 1,
  },
  {
    text: "最多浏览",
    id: 2,
  },
  {
    text: "最多点赞",
    id: 3,
  },
]);

const searchValue = ref(""),
  currentSort = ref(0),
  currentCategory = ref(0),
  currentTag = ref(0);

const chooseSort = (index: number) => {
  currentSort.value = index;
  emit("chooseSort", index);
};

const chooseCategory = (index: number) => {
  currentTag.value = 0;
  currentCategory.value = index;
  emit("chooseCategory", index);
};

const chooseTag = (index: number) => {
  currentCategory.value = 0;
  currentTag.value = index;
  emit("chooseTag", index);
};

const hanleSearch = () => {
  !props.btnLoading && emit("searchContent", searchValue.value);
};
</script>

<style scoped lang="less">
.search-header {
  width: 100%;
  height: 290px;
  background-color: #c6dfe0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-box {
    width: 920px;
    height: 50px;
    display: flex;
    align-items: center;
    .input-box {
      flex: 1;
      position: relative;

      height: 100%;
      border-radius: 10px;
      outline: none;
      border: none;
      background-color: #fff;
      font-size: 18px;
      &_content {
        width: 100%;
        height: 100%;
      }
      &_drop {
        position: absolute;
        right: 20px;
        top: 18px;
        z-index: 10;
      }
    }
    .search-btn {
      width: 50px;
      height: 50px;
      background-color: #07d9d7;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      color: #fff;
      cursor: pointer;
      &__loading {
        cursor: not-allowed;
        opacity: 0.2;
      }
      &:active {
        opacity: 0.5;
      }
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      color: #999;
    }
  }

  &-filter {
    width: 920px;
    margin-top: 20px;
    .filter-list {
      margin-bottom: 10px;
    }
    ul {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      color: #fff;
      li {
        padding: 8px;
        transition: all 0.3s;
        cursor: pointer;
      }
      .item_active {
        background-color: #fff;
        border-radius: 10px;
        color: #08d9d6;
      }
    }
  }
  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: none;
  }
  :deep(.el-input__wrapper .el-input__inner) {
    font-family: myFont;
    font-size: 18px;
  }
}
</style>
