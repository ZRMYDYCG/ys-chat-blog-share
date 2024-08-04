/**
 * 创建一个带有加载指示器的异步函数包装器。
 * 在执行传入的异步函数期间显示加载指示器，并在函数执行完成后关闭加载指示器。
 * 
 * @param fn - 需要包装的异步函数，类型为 Function。
 * @returns 返回一个对象，包含一个名为 requestWithLoading 的函数，用于执行带有加载指示器的异步操作。
 */
const useLoading = (fn: Function) => {
  /**
   * 带有加载指示器的异步请求函数。
   * 在执行传入的异步函数期间显示加载指示器，并在函数执行完成后关闭加载指示器。
   * 
   * @template T - 异步函数返回值的类型。
   * @template K - 异步函数参数的类型。
   * @param payload - 传递给异步函数的参数，类型为 K。
   * @returns 返回一个 Promise，包含异步函数的执行结果，类型为 T。
   */
  async function requestWithLoading<T, K>(payload: K): Promise<T> {
    // 创建并显示加载指示器
    const loadingInstance = ElLoading.service({
      background: "rgba(255,255,255,0.6)",
    });
    try {
      // 执行传入的异步函数，并等待其完成
      const res = await fn(payload);
      return res;
    } finally {
      // 无论异步函数执行成功还是失败，都关闭加载指示器
      loadingInstance.close();
    }
  }
  // 返回包含 requestWithLoading 函数的对象
  return { requestWithLoading };
};

export default useLoading;