/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 12:16:46
 * @FilePath: \blog-front-vue3\src\utils\tools.ts
 * @Description: 一些工具的封装
 */
import type { IImagePos } from "@/types/utils";


/**
 * 防抖函数
 * @param fn 需要防抖处理的函数
 * @param delay 延迟时间，单位为毫秒
 * @returns 返回一个新的函数，该函数会在指定延迟时间后执行传入的函数
 */
export function __debounce(fn: Function, delay: number) {
  let timer: number | null = null;
  return function (this: unknown, ...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

// 获取图片位置信息（过渡动画使用）
export function getImagePos(el: HTMLElement): IImagePos {
  const pos = el.getBoundingClientRect();
  return {
    width: pos.width,
    height: pos.height,
    left: Math.floor(pos.left),
    top: Math.floor(pos.top),
  };
}

// 图片预加载
export function imageIsLoading(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
}

// 观察dom是否进入视口，懒加载
export function domObserver(el: HTMLElement, cb: () => void) {
  const observer = new IntersectionObserver((entries) => {
    const isShow = entries.some((entry) => entry.intersectionRatio > 0);
    if (isShow) {
      observer.unobserve(el);
      cb();
    }
  });

  observer.observe(el);
}

// 判断是否为移动端用户
export function judgeDevice() {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}
