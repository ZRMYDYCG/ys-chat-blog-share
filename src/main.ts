/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 18:28:43
 * @FilePath: \blog-front-vue3\src\main.ts
 * @Description: main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "./style/style.scss";
import "nprogress/nprogress.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
