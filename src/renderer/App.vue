<template>
  <div id="app">
    <nav id="navigate-area">
      <div id="title-bar-btns">
        <button id="close-btn" @click="close"></button>
        <button id="min-btn" @click="minimize"></button>
        <button id="max-btn" @click="maximize"></button>
      </div>

      <div id="tab-area">
        <navbutton v-for="nav in nav_elements" v-bind="nav" :key="nav.id" v-model="currentId"></navbutton>
      </div>

      <div id="controler-area">
        <button id="add-btn" @click="add"></button>
        <button id="clear-btn" @click="clear"></button>
      </div>
    </nav>

    <div id="browese-area">
      <landing @event-init="createMenu" v-show="landing_show"></landing>
      <div id="webview-area" v-show="state">
        <tab v-for="tab in tab_elements" v-bind="tab" :key="tab.id" v-model="currentId"></tab>
      </div>
    </div>

  </div>
</template>

<script>
import navbutton from "./components/ui/nav_button";
import tab from "./components/ui/WebView";
import landing from "./components/LandingPage";
import add from "./components/AddPage";

const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow;
const storage = require("electron-json-storage");

export default {
  name: "ideal",
  components: {
    navbutton,
    tab,
    landing,
    add
  },
  data() {
    return {
      currentId: null,
      nav_elements: [],
      tab_elements: [],
      landing_show: 0,
      add_show: 0,
      tab_show: 0,
      show: 0
    };
  },
  mounted: function() {
    this.createMenu();
  },
  created() {
    console.log('created');
    
    const unwatch = this.$store.watch(
      state => state.index,
      index => {
        console.log('index:', index)
      }
    )
  },
  computed: {
    state() {
      this.currentId === null ? this.landing_show = 1 : this.landing_show = 0
      return this.currentId === null ? 0 : 1
    }
  },
  methods: {
    createMenu() {
      let that = this;
      storage.has("config", function(error, hasKey) {
        if (error) throw error;

        // console.log(hasKey);

        if (hasKey) {
          storage.get("config", function(error, data) {
            // console.log(data);

            that.nav_elements = [];
            that.tab_elements = [];

            for (let value in data) {
              that.nav_elements.push({
                id: data[value].id,
                title: "サンプル",
                url: data[value].id
              });
              that.tab_elements.push({
                id: data[value].id,
                title: "サンプル",
                url: data[value].url,
                partition: 'persist:' + data[value].id,
              });
            }

            // このままやと作るたびにタブが1番目になるから初期値みてどうのこうのする
            console.log(that.$store.state.tab.index);
            

            that.currentId = data[0].id;
          });

          that.landing_show = 0;
          that.tab_show = 1;

        }
        else {
          that.tab_show = 0;
          that.landing_show = 1;
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
    
    add() {
      this.landing_show = 1;
      this.tab_show = 0;
      this.currentId = null;
    },
    clear() {
      let that = this;

      storage.remove("config", function(error) {
        if (error) throw error;

        that.nav_elements = [];
        that.tab_elements = [];

        that.landing_show = 1;

        that.currentId = null;

        that.$router.push('/');
      });
    }
  }
};
</script>

<style module>
@import "./assets/style.css";
</style>