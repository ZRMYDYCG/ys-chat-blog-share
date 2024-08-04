<template>
  <div class="fs-web-footer_container">
    <div class="top-content">
      <div class="left">
        <div class="title">友情链接</div>
        <ul>
          <li>
            <span> <i class="fa fa-chain"></i></span>
            <a href="http://www.huohuo90.com/" target="_blank">逸刻时光</a>
          </li>
          <li>
            <span> <i class="fa fa-chain"></i></span>
            <a href="http://www.fengfengzhidao.com/" target="_blank">枫枫知道</a>
          </li>
          <li>
            <span> <i class="fa fa-chain"></i></span>
            <a href="https://www.adicw.cn/" target="_blank">adicw Blog</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="title">相关联系</div>
        <ul>
          <li>
            <span>B站</span>
            <a href="https://space.bilibili.com/18125345" target="_blank">@_Async__</a>
          </li>
          <li>
            <span>邮箱</span>
            <a href="#" target="_blank" onclick="return false;">1827951482@qq.com</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="foot-content">
      <div class="foot-content_text">
        Copyrigth @2021 个人博客 <a href="https://beian.miit.gov.cn/" _target="_blank">豫ICP备2022015682号</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fs-web-footer_container {
  width: 100%;
  height: 240px;
  background-color: #263843;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .top-content {
    margin-top: 20px;
    width: 50%;
    display: flex;
    justify-content: space-around;
    .title {
      width: 100px;
      text-align: center;
      font-size: 22px;
      font-weight: 700;
      color: #c3ccd3;
      padding-bottom: 10px;
      border-bottom: 3px solid #c3ccd3;
    }
    li {
      margin-top: 20px;
      span {
        display: inline-block;
        width: 35px;
        margin-right: 5px;
        text-align: center;
        color: #5f8791;
      }
    }
  }
  .foot-content {
    width: 100%;
    height: 50px;
    background-color: #283c48;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eee;
  }
}
a {
  color: #fff;
}
</style>
