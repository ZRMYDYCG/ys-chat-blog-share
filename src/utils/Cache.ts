//缓存存储方法类
class MyCache {
  getItem<T>(item: string): T {
    const content = JSON.parse(localStorage.getItem(item) as string) as T;
    return content;
  }
  saveItem<T>(name: string, value: T) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }

  deleteItem(name: string) {
    localStorage.removeItem(name);
  }
}

export default new MyCache();
