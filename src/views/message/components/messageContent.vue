<template>
  <div class="message-content" ref="messageContentRef" @scroll="handleScroll">
    <div class="message-content_title">
      <p>留言墙</p>
      <span>很多事情值得记录，当然也值得回味。</span>
    </div>
    <div class="message-content_tag">
      <div
        :class="['tag-item', currentTag === index ? 'tag-item_active' : '']"
        v-for="(item, index) in state.tagList"
        :key="index"
        @click="handleChangeTag(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="message-content_list">
      <div
        class="message-content_card"
        v-for="(item, index) in state.messageList"
        :key="item.id"
        @click="showCheckDrawer(index)"
      >
        <fs-message-card
          :message-detail="item"
          :card-color="messageColor[item.color].color"
          :card-border="messageColor[item.color].border"
          @like-message="handleLikeMessage"
        />
      </div>
    </div>
    <message-drawer ref="messageDrawerRef" :tag-list="state.tagList.slice(1)" @add-message="handleAddMessage" />
    <check-drawer
      ref="checkDrawerRef"
      :current-message="state.messageList[currentMessage]"
      @add-comment="handleAddMessageComment"
    />
    <div class="message-content_addbtn" @click="showAddDrawer">+</div>
    <div class="message_content-empty" v-if="!state.messageList.length">
      <img src="@/assets/image/empty.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import FsMessageCard from "@/components/FsMessageCard/FsMessageCard.vue";
import messageDrawer from "./messageDrawer.vue";
import checkDrawer from "./checkDrawer.vue";
import type { IMessageTag, IMessage, IMessagePayload, ICommentPayload, IMessageComment } from "@/types/messageType";
import { messageColor } from "@/config/color";
import {
  addMessage,
  addMessageComment,
  getCurrentComment,
  getMessageList,
  getMessageTagList,
  likeMessage,
} from "@/service/api/message_request";
import { __debounce } from "@/utils/tools";

const messageDrawerRef = ref<InstanceType<typeof messageDrawer>>();
const checkDrawerRef = ref<InstanceType<typeof checkDrawer>>();
const messageContentRef = ref<HTMLElement>();
const currentTag = ref(0),
  currentMessage = ref(0);

const state = reactive({
  tagList: [] as IMessageTag[],
  messageList: [] as IMessage[],
  limit: 12,
  offset: 0,
  isLike: true,
  isFinish: false,
  currentTag: "",
  timer: null as null | number,
});

onMounted(() => {
  getMessageData();
});

// 获取页面数据
const getMessageData = () => {
  getMessageTagList().then((res) => {
    state.tagList = [{ id: "first", name: "全部", createdAt: "null", updatedAt: "null" }, ...res.data.rows];
  });
  getMessageListData();
};

// 添加留言
const handleAddMessage = (item: IMessagePayload) => {
  addMessage(item).then((res) => {
    ElMessage.success(res.message);
    messageDrawerRef.value!.initForm();
    messageDrawerRef.value!.setDrawerStatus(false);
    getMessageListData();
  });
};

// 添加留言评论
const handleAddMessageComment = (item: ICommentPayload) => {
  addMessageComment(item).then((res) => {
    ElMessage.success(res.message);
    getCurrentComment(item.messageId).then((res) => {
      state.messageList.find((message: IMessage) => message.id === item.messageId)!.comment = res.data;
      checkDrawerRef.value!.initForm();
    });
  });
};

// 点赞留言
const handleLikeMessage = (id: string) => {
  state.timer && clearTimeout(state.timer);
  state.isLike
    ? likeMessage(id).then((res) => {
        state.messageList.find((item) => item.id === id)!.liked++;
        ElMessage.success(res.message);
      })
    : ElMessage.warning("点赞过于频繁");
  state.isLike = false;
  state.timer = setTimeout(() => {
    state.isLike = true;
  }, 5000);
};

// 选择标签
const handleChangeTag = (index: number) => {
  currentTag.value = index;
  state.offset = 0;
  state.currentTag = state.tagList[index].id === "first" ? "" : state.tagList[index].id;
  state.messageList = [];
  state.isFinish = false;
  getMessageListData();
};

const getMessageListData = () => {
  if (!state.isFinish) {
    getMessageList({ limit: state.limit, offset: state.offset, tagId: state.currentTag }).then((res) => {
      if (!res.data.rows.length) {
        state.isFinish = true;
        ElMessage.success("已加载全部留言");
      } else {
        state.messageList = [...state.messageList, ...res.data.rows];
        state.offset += state.limit;
      }
    });
  }
};

const handleScroll = __debounce((e: any) => {
  if (messageContentRef.value) {
    const scrollHeight = messageContentRef.value.scrollHeight;
    const scrollTop = messageContentRef.value.scrollTop;
    const clientHeight = messageContentRef.value.clientHeight;
    if (clientHeight + scrollTop >= scrollHeight - 100) {
      getMessageListData();
    }
  }
}, 300);

const showCheckDrawer = (index: number) => {
  currentMessage.value = index;
  messageDrawerRef.value!.setDrawerStatus(false);
  checkDrawerRef.value!.setDrawerStatus(true);
};

const showAddDrawer = () => {
  checkDrawerRef.value!.setDrawerStatus(false);
  messageDrawerRef.value!.setDrawerStatus(true);
};
</script>

<style scoped lang="scss">
.message-content {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

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
  &_tag {
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 25px;
    .tag-item {
      font-size: 20px;
      border-radius: 20px;
      padding: 5px 10px;
      cursor: pointer;

      &_active {
        border: 1px solid #000;
        font-weight: 700;
      }
    }
  }
  &_list {
    width: 100%;
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 15px;
  }
  &_card {
    width: 300px;
    height: 214px;
    cursor: pointer;
    transition: all 0.3s;
    animation: card-in 0.6s ease-in-out;
    &:hover {
      transform: translateY(-5px);
    }
  }
  &_addbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    cursor: pointer;
    position: fixed;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    bottom: 20px;
    right: 15px;
    box-shadow: 0 0 15px #fff;
  }
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(-120px) scale(1.5);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
