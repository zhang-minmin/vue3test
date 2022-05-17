export default {
  set(k, v) {
    window.localStorage.setItem(k, v)
  },
  get(k) {
    return window.localStorage.getItem(k)
  },
  cls() {
    window.localStorage.clear()
  }
}
