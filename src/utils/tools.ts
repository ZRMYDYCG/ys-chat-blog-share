/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-03 23:30:06
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-04 16:33:52
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
  return {
    width: pos.width,
    height: pos.height,
    left: Math.floor(pos.left),
    top: Math.floor(pos.top),
  };
}

/**
 * 图片预加载函数。
 * 通过创建一个新的 Image 对象并设置其 src 属性来加载指定的图片。
 * 当图片加载成功时，返回一个 resolved 的 Promise，否则返回一个 rejected 的 Promise。
 * 
 * @param src - 图片的 URL 地址，类型为 string。
 * @returns 返回一个 Promise，当图片加载成功时 resolved，否则 rejected。
 */
export function imageIsLoading(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 创建一个新的 Image 对象
    const img = new Image();
    img.src = src;
    // 当图片加载成功时，调用 resolve 并传递图片的 URL。
    img.onload = () => resolve(src);
    // 当图片加载失败时，调用 reject。
    img.onerror = reject;
  });
}


/**
 * 实现懒加载图片。
 * 观察指定的 HTML 元素是否进入视口。
 * 当元素进入视口时，执行回调函数，并停止观察该元素。
 * 
 * @param el - 目标 HTML 元素，类型为 HTMLElement。
 * @param cb - 当元素进入视口时执行的回调函数，类型为 () => void。
 */
export function domObserver(el: HTMLElement, cb: () => void) {
  // 创建一个新的 IntersectionObserver 实例
  const observer = new IntersectionObserver((entries) => {
    // 检查是否有任何一个观察的元素进入了视口
    const isShow = entries.some((entry) => entry.intersectionRatio > 0);
    if (isShow) {
      // 如果元素进入了视口，停止观察该元素
      observer.unobserve(el);
      // 执行回调函数
      cb();
    }
  });

  // 开始观察指定的元素
  observer.observe(el);
}

/**
 * 判断当前设备是否为移动设备。
 * 通过检查 navigator.userAgent 字符串中是否包含特定的移动设备标识符来实现。
 * 
 * @returns 如果当前设备是移动设备，则返回一个包含匹配结果的数组；否则返回 null。
 */
export function judgeDevice() {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
}
