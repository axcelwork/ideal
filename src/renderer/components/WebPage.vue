<template>
  <div id="webview-area" class="webview-area">
    <tab v-for="tab in tab_elements" v-bind="tab" v-model="currentId"></tab>
  </div>
</template>

<script>
import tab from "../components/ui/WebView";

const storage = require("electron-json-storage");

export default {
  name: "web-page",
  components: {
    tab
  },
  data() {
    return {
      currentId: null,
      tab_elements: []
    };
  },
  mounted: function() {
    let that = this;

    storage.has("tab_index", function(error, hasKey) {
      if (error) throw error;

      if (hasKey) {
        storage.get("tab_index", function(error, data) {
          that.currentId = data;
        });
      }
    });

    this.$eventHub.$on("change_nav", this.changeCurrent);


    storage.has("config", function(error, hasKey) {
      if (error) throw error;

      if (hasKey) {
        storage.get("config", function(error, data) {
          that.tab_elements = [];

          for (let value in data) {
            that.tab_elements.push({
              id: data[value].id,
              href: data[value].url,
              partition: "persist:" + data[value].id
            });
          }

          that.currentId = data[0].id;
        });
      }
    });
  },
  methods: {
    changeCurrent: function(id) {
      this.currentId = id;
      // console.log(this.currentId);
    }
  },
  beforeDestroy: function() {
    this.$eventHub.$off("change_nav", this.changeCurrent);
  }
};
</script>