const useLoading = (fn: Function) => {
  async function requestWithLoading<T, K>(payload: K): Promise<T> {
    const loadingInstance = ElLoading.service({
      background: "rgba(255,255,255,0.6)",
    });
    try {
      const res = await fn(payload);
      return res;
    } finally {
      loadingInstance.close();
    }
  }
  return { requestWithLoading };
};

export default useLoading;
