"use strict"

export default {

  pointer: -1,

  put(data) {
    const cache = JSON.parse(sessionStorage.getItem("localcache") || "[]");
    if (this.pointer > -1) {
      cache.splice(this.pointer + 1);
    }
    cache.push(data);
    this.pointer++;
    sessionStorage.setItem("localcache", JSON.stringify(cache));
  },

  get(direction) {
    const cache = JSON.parse(sessionStorage.getItem("localcache") || "[]");
    if (direction === "back" && this.pointer > 0) {
      this.pointer--;
      return cache[this.pointer];
    }
    if (direction === "forth" && this.pointer < cache.length - 1) {
      this.pointer++;
      return cache[this.pointer];
    }
    if (!direction && cache.length > 0) {
      return cache[cache.length - 1];
    }
    return undefined;
  },

  clear() {
    sessionStorage.removeItem("localcache");
    this.pointer = -1;
  },

};
