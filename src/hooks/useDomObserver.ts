import type { Ref } from "vue";
import { onMounted, isRef} from "vue";
import { domObserver } from "@/utils/tools";

/**
 * 在组件挂载时观察指定的 DOM 元素是否进入视口。
 * 当元素进入视口时，执行回调函数。
 * 
 * @param el - 目标 DOM 元素，可以是 Ref<HTMLElement | undefined> 或 HTMLElement。
 * @param cb - 当元素进入视口时执行的回调函数，类型为 () => void。
 */
export default function useDomObserver(el: Ref<HTMLElement | undefined> | HTMLElement, cb: () => void) {
  onMounted(() => {
    const isElement = isRef(el);
    // 不是 DOM 元素或者传递不存在
    if (!el || (isElement && !el.value)) return;
    domObserver(isElement ? el.value! : el, cb);
  });
}