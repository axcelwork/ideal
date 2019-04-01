<template>
  <div id="app">
    <nav id="navigate-area">
      <div id="title-bar-btns">
        <button id="close-btn" @click="close"></button>
        <button id="min-btn" @click="minimize"></button>
        <button id="max-btn" @click="maximize"></button>
      </div>

      <div id="tab-area">
        <navbutton v-for="nav in nav_elements" v-bind="nav" v-model="currentId"></navbutton>
      </div>

      <div id="controler-area">
        <button id="reload-btn" @click="reload"></button>
        <button id="add-btn" @click="add"></button>
        <button id="clear-btn" @click="clear"></button>
        <button id="setting-btn" @click="setting"></button>
      </div>
    </nav>

    <div id="browese-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbutton from "./components/ui/nav_button";
import tab from "./components/ui/WebView";
import landing from "./components/LandingPage";

const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow;
const storage = require("electron-json-storage");

export default {
  name: "ideal",
  components: {
    navbutton,
    tab,
    landing
  },
  data() {
    return {
      currentId: null,
      nav_elements: []
    };
  },
  mounted: function() {
    this.createMenu();
    this.$eventHub.$on("save-addView", this.createMenu);
    this.$eventHub.$on("change_nav", this.changeNav);
  },
  computed: {
    state() {
      this.currentId === null
        ? (this.landing_show = 1)
        : (this.landing_show = 0);
      return this.currentId === null ? 0 : 1;
    }
  },
  methods: {
    changeNav: function(id) {
      // console.log(id);
      this.currentId = id;

      if (this.$router.currentRoute.fullPath != "/web/") {
        this.$router.push("/web/");
      }

      storage.set("tab_index", id, function(error) {
        if (error) throw error;
      });
    },
    createMenu() {
      let that = this;
      storage.has("config", function(error, hasKey) {
        if (error) throw error;

        // console.log(hasKey);

        if (hasKey) {
          storage.get("config", function(error, data) {
            // console.log(data);

            that.nav_elements = [];

            for (let value in data) {
              that.nav_elements.push({
                id: data[value].id,
                title: "サンプル",
                host: data[value].host,
                url: data[value].url,
                icon: data[value].icon
              });
            }

            // このままやと作るたびにタブが1番目になるから初期値みてどうのこうのする
            // console.log(that.$store.state.tab.index);

            that.currentId = data[0].id;
          });
        } else {
        }
      });
    },
    close() {
      const window = remote.getCurrentWindow();
      window.close();
    },
    minimize() {
      const window = remote.getCurrentWindow();
      window.minimize();
    },
    maximize() {
      const window = remote.getCurrentWindow();
      if (!window.isMaximized()) {
        window.maximize();
      } else {
        window.unmaximize();
      }
    },
    reload() {
      const window = remote.getCurrentWindow();
      window.reload();
    },
    add() {
      this.currentId = null;
      this.$router.push("/");
    },
    setting() {
      this.currentId = null;
      this.$router.push("/setting/");
    },
    clear() {
      let that = this;

      storage.remove("config", function(error) {
        if (error) throw error;

        that.nav_elements = null;

        that.currentId = null;
        that.$router.push("/");
      });
    }
  }
};
</script>

<style module>
@import "./assets/style.css";
</style>