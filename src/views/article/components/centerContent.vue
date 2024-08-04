<template>
  <div class="center-content">
    <div class="content-innner">
      <div class="content-title">
        <div class="title_text">{{ props.articleDetail?.title }}</div>
        <div class="title_tag" v-if="props.articleDetail?.tags">
          <span style="font-weight: 700">#</span>
          <span v-for="(item, index) in props.articleDetail?.tags" :key="index">{{ item }}</span>
        </div>
        <div class="title_info">
          <div class="title_info__item">
            <i class="fa fa-clock-o"></i>
            <span>{{time}}</span>
          </div>
          <div class="title_info__items">
            <i class="fa fa-eye"></i>
            <span>{{ props.articleDetail?.views }}次浏览</span>
          </div>
        </div>
        <i style="color: #f00">版权声明：本文为博主原创文章，转载请说明来源(好像没法转载)</i>
      </div>

      <div class="content-text">
        <div class="content-text__detail" ref="articleStructRef" v-html="props.articleDetail?.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IArticleStruct } from "@/types/utils";
import { computed, onUpdated, ref } from "vue";
import mitter from "@/utils/mitter";
import type { IArticleDetail } from "@/types/articleType";
const articleStructRef = ref<any>();
const props = defineProps<{
  articleDetail?: IArticleDetail;
}>();

// 生成目录结构
const parseDirectory = () => {
  const nodes = ["H1", "H2", "H3", "H4", "H5", "H6"];
  let titles: IArticleStruct[] = [];
  articleStructRef.value.childNodes.forEach((e: HTMLElement, index: number) => {
    if (nodes.includes(e.nodeName)) {
      const id = "header-" + index;
      e.setAttribute("id", id);
      titles.push({
        id: id,
        title: e.innerHTML,
        level: Number(e.nodeName.substring(1, 2)),
        nodeName: e.nodeName,
      });
    }
  });
  mitter.emit("getDirectoryData", titles);
};

const time = computed(() => {
  if (props.articleDetail) {
    const year: number | string = new Date(props.articleDetail?.createdAt).getFullYear();
    let month: number | string = new Date(props.articleDetail?.createdAt).getMonth() + 1;
    let day: number | string = new Date(props.articleDetail?.createdAt).getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    return `${year} 年 ${month} 月 ${day} 日`;
  } else {
    return "";
  }
});

onUpdated(() => {
  parseDirectory();
});

// watchEffect(() => {
//   nextTick(() => {});
// });
</script>

<style scoped lang="less">
.center-content {
  width: 100%;

  padding-bottom: 300px;

  .content-innner {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
  }

  .content-title {
    padding: 30px;
    .title_text {
      font-size: 35px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .title_tag {
      color: #a0a0a0;
      margin-bottom: 10px;
      span {
        margin-right: 5px;
      }
    }
    .title_info {
      color: #a0a0a0;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      span {
        margin-left: 5px;
      }
    }
  }
  .content-text {
    background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.1) 3%, transparent 0),
      linear-gradient(1turn, rgba(60, 10, 30, 0.1) 3%, transparent 0);
    background-size: 20px 20px;
    background-position: 10%;
    font-size: 18px;

    &__detail {
      padding: 10px 40px;
      list-style: decimal;
      :deep(pre::before) {
        content: "1\A 2\A 3\A 4\A 5\A 6\A 7\A 8\A 9\A 10\A 11\A 12\A 13\A 14\A 15\A 16\A 17\A 18\A 19\A 20\A 21\A 22\A 23\A 24\A 25\A 26\A 27\A 28\A 29\A 30\A 31\A 32\A 33\A 34\A 35\A 36\A 37\A 38\A 39\A 40\A 41\A 42\A 43\A 44\A 45\A 46\A 47\A 48\A 49\A 50\A 51\A 52\A 53\A 54\A 55\A 56\A 57\A 58\A 59\A 60\A 61\A 62\A 63\A 64\A 65\A 66\A 67\A 68\A 69\A 70\A 71\A 72\A 73\A 74\A 75\A 76\A 77\A 78\A 79\A 80\A 81\A 82\A 83\A 84\A 85\A 86\A 87\A 88\A 89\A 90\A 91\A 92\A 93\A 94\A 95\A 96\A 97\A 98\A 99\A 100\A 101\A 102\A 103\A 104\A 105\A 106\A 107\A 108\A 109\A 110\A 111\A 112\A 113\A 114\A 115\A 116\A 117\A 118\A 119\A 120\A 121\A 122\A 123\A 124\A 125\A 126\A 127\A 128\A 129\A 130\A 131\A 132\A 133\A 134\A 135\A 136\A 137\A 138\A 139\A 140\A 141\A 142\A 143\A 144\A 145\A 146\A 147\A 148\A 149\A 150\A 151\A 152\A 153\A 154\A 155\A 156\A 157\A 158\A 159\A 160\A 161\A 162\A 163\A 164\A 165\A 166\A 167\A 168\A 169\A 170\A 171\A 172\A 173\A 174\A 175\A 176\A 177\A 178\A 179\A 180\A 181\A 182\A 183\A 184\A 185\A 186\A 187\A 188\A 189\A 190\A 191\A 192\A 193\A 194\A 195\A 196\A 197\A 198\A 199\A 200\A 201\A 202\A 203\A 204\A 205\A 206\A 207\A 208\A 209\A 210\A 211\A 212\A 213\A 214\A 215\A 216\A 217\A 218\A 219\A 220\A 221\A 222\A 223\A 224\A 225\A 226\A 227\A 228\A 229\A 230\A 231\A 232\A 233\A 234\A 235\A 236\A 237\A 238\A 239\A 240\A 241\A 242\A 243\A 244\A 245\A 246\A 247\A 248\A 249\A 250\A 251\A 252\A 253\A 254\A 255\A 256\A 257\A 258\A 259\A 260\A 261\A 262\A 263\A 264\A 265\A 266\A 267\A 268\A 269\A 270\A 271\A 272\A 273\A 274\A 275\A 276\A 277\A 278\A 279\A 280\A 281\A 282\A 283\A 284\A 285\A 286\A 287\A 288\A 289\A 290\A 291\A 292\A 293\A 294\A 295\A 296\A 297\A 298\A 299\A 300\A 301\A 302\A 303\A 304\A 305\A 306\A 307\A 308\A 309\A 310\A 311\A 312\A 313\A 314\A 315\A 316\A 317\A 318\A 319\A 320\A 321\A 322\A 323\A 324\A 325\A 326\A 327\A 328\A 329\A 330\A 331\A 332\A 333\A 334\A 335\A 336\A 337\A 338\A 339\A 340\A 341\A 342\A 343\A 344\A 345\A 346\A 347\A 348\A 349\A 350\A 351\A 352\A 353\A 354\A 355\A 356\A 357\A 358\A 359\A 360\A 361\A 362\A 363\A 364\A 365\A 366\A 367\A 368\A 369\A 370\A 371\A 372\A 373\A 374\A 375\A 376\A 377\A 378\A 379\A 380\A 381\A 382\A 383\A 384\A 385\A 386\A 387\A 388\A 389\A 390\A 391\A 392\A 393\A 394\A 395\A 396\A 397\A 398\A 399\A 400\A 401\A 402\A 403\A 404\A 405\A 406\A 407\A 408\A 409\A 410\A 411\A 412\A 413\A 414\A 415\A 416\A 417\A 418\A 419\A 420\A 421\A 422\A 423\A 424\A 425\A 426\A 427\A 428\A 429\A 430\A 431\A 432\A 433\A 434\A 435\A 436\A 437\A 438\A 439\A 440\A 441\A 442\A 443\A 444\A 445\A 446\A 447\A 448\A 449\A 450\A 451\A 452\A 453\A 454\A 455\A 456\A 457\A 458\A 459\A 460\A 461\A 462\A 463\A 464\A 465\A 466\A 467\A 468\A 469\A 470\A 471\A 472\A 473\A 474\A 475\A 476\A 477\A 478\A 479\A 480\A 481\A 482\A 483\A 484\A 485\A 486\A 487\A 488\A 489\A 490\A 491\A 492\A 493\A 494\A 495\A 496\A 497\A 498\A 499\A";
        position: absolute;
        top: 0;
        left: 0;
        background: #4f4f50;
        color: #999;
        padding: 20px 15px;
        padding-right: 5px;
        font-size: 14px;
        line-height: 24px;
        user-select: none;
      }
      :deep(p) {
        line-height: 1.8;
        font-size: 16px;
        letter-spacing: 0.1em;
      }

      :deep(ol li) {
        margin: 10px 0;
        font-size: 14px;
        margin-top: 6px;
        line-height: 22px;
      }

      :deep(pre) {
        margin: 20px auto;
        position: relative;
        padding: 20px 24px;
        padding-bottom: 0;
        padding-left: 60px;
        background-color: #282c34;
        overflow-x: scroll;
        overflow-y: hidden;
        border-radius: 6px;
      }

      :deep(pre code) {
        border: none;
        font-size: 14px;
        line-height: 24px;
        overflow: unset;
        color: rgba(255, 255, 255, 0.9);
      }
      :deep(img) {
        max-width: 90%;
        box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.2);
        margin: 20px;
        border-radius: 10px;
      }
      :deep(a) {
        color: #1890ff;
        &:hover {
          color: #40a9ff;
        }
      }

      :deep(blockquote) {
        color: #fff;
        border-radius: 10px;
        background-color: #282c34;
        padding: 10px;
        margin-left: 0;
        width: 100%;
        box-shadow: 5px 5px 10px 5px rgb(0 0 0 / 50%);
        font-size: 14px;
      }
    }
  }
}
</style>
