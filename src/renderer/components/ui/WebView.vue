<template>
  <webview :id="id" :src="href" :partition="partition" v-show="active" useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36" v-model="id"></webview>
</template>

<script>
const fs = require('fs');
const path = require('path');
const shell = require("electron");

export default {
  data() {
    return {
      target_id: String,
      target_webview: null
    };
  },
  props: {
    id: String,
    title: String,
    value: String,
    href: String,
    partition: String
  },
  mounted: function() {
    var that = this;
    this.target_id = this.id;
    this.target_webview = document.getElementById(this.target_id);

    this.target_webview.addEventListener("new-window", function(e) {
      shell.shell.openExternal(e.url);
    });
    this.target_webview.addEventListener("dom-ready", function() {
      
      that.target_webview.openDevTools();

      fs.readFile( path.resolve(path.resolve(__dirname, '../../assets/in_circle_ex_style.css')), "utf-8", function(error, data) {
        if(!error){
          that.target_webview.insertCSS(data);
        }
      });

    });
  },
  computed: {
    active() {
      return this.value === this.id ? "1" : 0;
    }
  }
};
</script>