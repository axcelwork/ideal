<template>
  <webview :id="id" :src="href" :partition="partition" v-show="active" useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36" v-model="id"></webview>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    value: String,
    href: String,
    partition: String
  },
  computed: {
    active() {
      return this.value === this.id ? '1' : 0
    }
  }
};
</script>