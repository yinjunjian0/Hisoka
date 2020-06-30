interface storageType {
  expireTime: number, value: any, createTime: number
}

function useCache() {
  const set = (key: string, value: Object, expireTime = 10000000) => {
    const obj: storageType = { expireTime, createTime: +new Date(), value }
    localStorage.setItem(key, JSON.stringify(obj))
  }

  const get = (key: string) => {
    const str = localStorage.getItem(key)
    if (!str) return null
    let cache = JSON.parse(str)
    const { expireTime, createTime } = cache
    if (+new Date() < (expireTime * 1000 + createTime)) {
      console.log(`${key}未过期，使用缓存`);
      return cache.value
    }
    return null
  }

  const del = (key: string) => localStorage.removeItem(key)

  return { get, set, del }
}

export default useCache