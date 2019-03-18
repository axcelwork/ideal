<template>
  <webview :id="id" :src="url" :partition="partition" v-show="show" useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"></webview>
</template>

<script>
const storage = require("electron-json-storage");
let confg_data = [];

export default {
  props: {
    id: String,
    title: String,
    value: String,
    url: String,
    partition: String
  },
  computed: {
    show() {
      return this.value === this.id ? 1 : 0
    }
  }
};
</script>