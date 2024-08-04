/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 15:22:58
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
    // 如果 timer 存在，说明上一次延迟还未执行，清除上一次的 timer
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      // 将 timer 重置为 null，表示定时器已经执行完毕
      timer = null;
      // 当前的 this 调用 fn 函数, 并传入参数 => this.fn(args)
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 获取指定 HTML 元素（目前用于获取图片的位置信息）的位置信息，包括宽度、高度、左边界和上边界。
 * 这些信息结合过渡动画来使用，可以实现更加流畅的图片切换效果。
 * 
 * @param el - 目标 HTML 元素，类型为 HTMLElement。
 * @returns 返回一个包含元素位置信息的对象，类型为 IImagePos。
 */
export function getImagePos(el: HTMLElement): IImagePos {
  // 获取元素的位置信息 => { width 元素的宽度: number, height 元素的高度: number, left 元素左边界的水平坐标: number, top 元素上边界的垂直坐标: number }
  const pos: DOMRect = el.getBoundingClientRect();
  console.log(pos);
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
