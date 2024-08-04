<template>
  <div class="fs-avatar-card">
    <div class="fs-avatar-card_cover">
      <fs-image :src="BASE_BG_COVER" />
    </div>
    <div class="fs-avatar-card_avatar">
      <img src="@/assets/image/avatar.jpg" alt="" />
    </div>
    <div class="fs-avatar-card_info">
      <div class="info-icon" title="qq">
        <i class="fa fa-qq"></i>
        <div class="info-img">
          <img src="@/assets/image/qqcode.jpg" alt="" />
        </div>
      </div>
      <div class="info-icon" title="微信">
        <i class="fa fa-wechat"></i>
        <div class="info-img">
          <img src="@/assets/image/wxcode.jpg" alt="" />
        </div>
      </div>
      <a class="info-icon" href="https://space.bilibili.com/18125345" target="_blank" title="bilibili">
        <i class="fa fa-television"></i>
      </a>
      <a class="info-icon" href="https://github.com/DrssXpro" target="_blank" title="github">
        <i class="fa fa-github"></i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BASE_BG_COVER } from "@/config/images";
import FsImage from "../FsImage/FsImage.vue";
</script>

<style scoped lang="scss">
.fs-avatar-card {
  position: relative;
  width: 100%;
  height: 170px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 0 6px #0000000a;
  &_cover {
    width: 100%;
    height: 50%;
    overflow: hidden;
  }
  &_avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  &_info {
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    margin-top: 50px;
    cursor: pointer;
    .info-icon {
      position: relative;
      color: #798791;
      .info-img {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: all 0.3s;
      }
      &:hover .info-img {
        transform: translate(-50%, -150%);
        opacity: 1;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
