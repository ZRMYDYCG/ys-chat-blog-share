<template>
  <div class="check-drawer">
    <fs-drawer v-model:show="isShow" title="详情">
      <template #content>
        <div class="check-drawer_content">
          <el-scrollbar>
            <div class="user-operator">
              <span style="color: #3b73f0">要墙主撕下该便签</span>
              <span style="color: #ff9e55">举报</span>
            </div>
            <div class="content-box">
              <fs-message-card
                :message-detail="props.currentMessage"
                :card-color="messageColor[props.currentMessage.color].color"
                :card-border="messageColor[props.currentMessage.color].border"
                v-if="props.currentMessage"
              />
            </div>
            <div class="input-box">
              <textarea class="input-text" v-model="state.content" placeholder="请输入..." maxlength="50" />
              <div class="input-comment">
                <input type="text" v-model="state.author" placeholder="签名" class="input-author" />
                <button
                  :class="['input-cofirm', state.content.length ? '' : 'input-cofirm__disable']"
                  @click="handleSendComment"
                >
                  评论
                </button>
              </div>
            </div>
            <div class="comment-box" v-if="props.currentMessage">
              <div class="title">评论 {{ props.currentMessage.comment.count }}</div>
              <div class="comment-item" v-for="(item, index) in props.currentMessage.comment.rows" :key="item.id">
                <fs-comment-card :comment-detail="item" :avatar-color="avatarColor[item.color].color" />
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
    </fs-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FsDrawer from "@/components/FsDrawer/FsDrawer.vue";
import FsMessageCard from "@/components/FsMessageCard/FsMessageCard.vue";
import FsCommentCard from "@/components/FsCommentCard/FsCommentCard.vue";
import type { ICommentPayload, IMessage } from "@/types/messageType";
import { avatarColor, messageColor } from "@/config/color";
const isShow = ref(false);

const props = defineProps<{
  currentMessage: IMessage;
}>();

const emit = defineEmits<{
  (e: "addComment", item: ICommentPayload): void;
}>();

const state = reactive({
  content: "",
  author: "",
});
const setDrawerStatus = (flag: boolean) => {
  isShow.value = flag;
};

const handleSendComment = () => {
  if (state.content.trim().length) {
    emit("addComment", {
      messageId: props.currentMessage.id,
      content: state.content,
      author: state.author,
    });
  }
};

const initForm = () => {
  state.author = "";
  state.content = "";
};

defineExpose({
  setDrawerStatus,
  initForm,
});
</script>

<style scoped lang="less">
.check-drawer {
  .title {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 18px;
  }
  &_content {
    width: 100%;
    height: calc(100vh - 60px);
    .user-operator {
      span {
        margin-right: 30px;
        cursor: pointer;
      }
      margin-bottom: 20px;
    }
    .content-box {
      height: 214px;
      margin-bottom: 20px;
    }
    .input-box {
      margin-bottom: 20px;
      input,
      textarea {
        outline: none;
        font-family: myFont;
      }
      .input-text {
        resize: none;
        width: 100%;
        padding: 8px;
        height: 56px;
        border: 1px solid #949494;
        background: none;
        margin-bottom: 10px;
      }
      .input-comment {
        display: flex;
        justify-content: space-between;
        .input-author {
          width: 220px;
          padding: 8px;
          height: 36px;
          border: 1px solid #949494;
          background: none;
        }
        .input-cofirm {
          height: 36px;
          border-radius: 18px;
          min-width: 80px;
          padding: 0 20px;
          border: none;
          cursor: pointer;
          color: #fff;
          background: #202020;
          transition: all 0.3s;
          &__disable {
            opacity: 0.6;
            cursor: not-allowed;
          }
        }
      }
    }
    .comment-box {
      .comment-item {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
