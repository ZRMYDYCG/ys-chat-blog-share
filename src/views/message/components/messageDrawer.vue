<template>
  <div class="drawer-container">
    <fs-drawer v-model:show="isShow" title="留言">
      <template #content>
        <div class="drawer-container_content">
          <el-scrollbar>
            <div class="color-choose">
              <div
                :class="['color-item', state.currentColor === index ? 'color-item__active' : '']"
                v-for="(item, index) in messageColor"
                :key="item.id"
                :style="{ background: item.color }"
                @click="changeCurrentColor(index)"
              ></div>
            </div>
            <div
              class="content-box"
              :style="{
                backgroundColor: messageColor[state.currentColor].color,
                border: messageColor[state.currentColor].border,
              }"
            >
              <textarea class="input-text" v-model="state.content" placeholder="留言. . ." maxlength="60" />
              <input type="text" v-model="state.author" class="input-author" placeholder="签名" />
            </div>

            <div class="tag-box">
              <div class="title">选择标签</div>
              <div class="tag-box_list">
                <div
                  :class="['tag-box_item', state.currentTag === index ? 'tag-box_item__active' : '']"
                  v-for="(item, index) in props.tagList"
                  :key="index"
                  @click="state.currentTag = index"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="explain-box">
              <div class="title">声明</div>
              <p class="explainText">
                该留言墙大部分创意和样式来自于"一刻时光"，原作者为"<a
                  href="http://www.huohuo90.com"
                  target="_blank"
                  style="font-weight: bold"
                  >逸刻</a
                >"，欢迎来到这里的客官能够关注一下这位博主。

                <br />
                <br />
                希望各位看官手下留情，简单功能发布功能可以尝试，但不要在留言墙上做各种奇怪的测试。
                <br />
                <br />
                该博客项目仍有很多不足，有任何想法都可以直接留言或者联系博主，感谢反馈各种bug。
              </p>
            </div>
          </el-scrollbar>
        </div>
        <div class="drawer-container_operator">
          <button class="first-btn operator-btn" @click="setDrawerStatus(false)">放弃</button>
          <button class="second-btn operator-btn" @click="handleAddMessageContent">确定</button>
        </div>
      </template>
    </fs-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FsDrawer from "@/components/FsDrawer/FsDrawer.vue";
import { messageColor } from "@/config/color";
import type { IMessagePayload, IMessageTag } from "@/types/messageType";
const props = defineProps<{
  tagList: IMessageTag[];
}>();

const emit = defineEmits<{
  (e: "addMessage", item: IMessagePayload): void;
}>();

const isShow = ref(false);

const state = reactive({
  content: "",
  author: "",
  currentTag: 0,
  currentColor: 0,
});

const setDrawerStatus = (flag: boolean) => {
  isShow.value = flag;
};

const changeCurrentColor = (index: number) => {
  state.currentColor = index;
};

const handleAddMessageContent = () => {
  if (checkForm()) {
    emit("addMessage", {
      content: state.content,
      source: state.author,
      tagId: props.tagList[state.currentTag].id,
      color: state.currentColor,
    });
  }
};

const checkForm = () => {
  if (!state.content.length || state.content.trim().length > 60) {
    ElMessage.warning("内容过长或不能为空");
    return false;
  }
  return true;
};

const initForm = () => {
  state.content = "";
  state.author = "";
  state.currentColor = 0;
  state.currentTag = 0;
};

defineExpose({
  setDrawerStatus,
  initForm,
});
</script>

<style scoped lang="scss">
.drawer-container {
  .title {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 18px;
  }
  &_content {
    width: 100%;
    height: calc(100vh - 140px);

    .color-choose {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      .color-item {
        cursor: pointer;
        width: 25px;
        height: 25px;
        margin-right: 8px;
        &__active {
          border: 1px solid #3b73f0;
        }
      }
    }
    .content-box {
      width: 320px;
      height: 220px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 30px;
      input,
      textarea {
        outline: none;
        font-family: myFont;
      }
      .input-text {
        resize: none;
        height: 170px;
        border: none;
        font-size: 15px;
        line-height: 1.5;
        background: none;
      }
      .input-author {
        padding: 8px;
        height: 35px;
        border: 1px solid #fff;
        text-align: right;
        font-size: 16px;
        font-weight: 600;
        background: none;
      }
    }
    .tag-box {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      &_list {
        display: flex;
        flex-wrap: wrap;
      }
      &_item {
        padding: 3px 8px;
        color: #5b5b5b;
        line-height: 24px;
        margin: 8px 2px;
        cursor: pointer;
        &__active {
          font-weight: 700;
          color: #202020;
          border-radius: 14px;
          background: #dfd1d1;
        }
      }
    }

    .explain-box {
      display: flex;
      flex-direction: column;
      padding-right: 10px;
      p {
        line-height: 1.5;
        margin: 0;
        font-size: 14px;
        color: #949494;
      }
    }
  }
  &_operator {
    margin-top: 10px;
    height: 50px;
    display: flex;
    .operator-btn {
      border-radius: 24px;
      min-width: 100px;
      padding: 0 24px;
      cursor: pointer;
    }
    .first-btn {
      background: none;
      border: 1px solid #202020;
      color: #202020;
      margin-right: 20px;
    }
    .second-btn {
      width: 200px;
      background: #202020;
      color: #fff;
      &:active {
        opacity: 0.5;
      }
    }
  }
}
</style>
