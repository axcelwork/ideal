<template>
  <div id="setting-area">
    <p class="discription">アプリケーション一覧</p>

    <div v-if="isData">
      <app_section v-for="app in app_elements" v-bind="app"></app_section>
    </div>
    <div v-else>
      <p class="id_message">登録されているアプリケーションがありません。</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import EventHub from "../plugin/EventHub";
import app_section from "../components/ui/app_section";

Vue.use(EventHub);

const storage = require("electron-json-storage");

export default {
  name: "landing-page",
  components: {
    app_section
  },
  data() {
    return {
      app_elements: [],
      isData: false
    };
  },
  mounted: function() {
    const _that = this;

    storage.get("config", function(error, data) {
      if( data.length != 0 ) {
         _that.isData = true;
      }
      else {
        _that.isData = false;
      }
    });

    this.$eventHub.$on("delete_app", this.listed);
  },
  created: function() {
    this.listed();
  },
  methods: {
    listed: function() {
      const _that = this;

      storage.get("config", function(error, data) {
        console.log(data);
        
        _that.app_elements = [];

        if( data.length != 0 ) {
          for (let value in data) {
            _that.app_elements.push({
              id: data[value].id,
              title: "サンプル",
              host: data[value].host,
              url: data[value].url,
              icon: data[value].icon
            });
          }

           _that.isData = true;
        }
        else {
           _that.isData = false;
        }

        
      });
    },
  }
};
</script>