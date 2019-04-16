<template>
  <div id="browese-area">
    <div id="init-area">
      <p class="discription">アプリケーションを登録してみましょう</p>
      <input
        type="text"
        name="アプリケーションURL"
        id="init_url"
        placeholder="URLを入力してください"
        v-model="url"
        v-validate="'required|url:false'"
      >
      <div class="icon-area">
        <p class="icon_title">{{iconTitle}}</p>
        <ul>
          <li v-for="icon in icon_elements">
            <iconButton v-bind="icon" :key="icon.id" v-model="selectId"></iconButton>
          </li>
        </ul>
      </div>

      <div class="form-control-feedback" v-show="errors.has('アプリケーションURL')">
        <p class="alert alert-danger">{{ errors.first('アプリケーションURL') }}</p>
      </div>

      <button id="add_webview" @click="add" class="id_button is-primary">Webアプリを追加する</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import ja from "vee-validate/dist/locale/ja";
import EventHub from "../plugin/EventHub";

import iconButton from "../components/ui/icon_button";

Validator.localize("ja", ja);
Vue.use(VeeValidate, { locale: "ja" });
Vue.use(EventHub);

const storage = require("electron-json-storage");
let confg_data = [];

export default {
  name: "landing-page",
  components: {
    iconButton
  },
  data() {
    return {
      selectId: "ico_default",
      iconTitle: "Default Icon",
      url: null,
      value: null,
      icon_elements: []
    };
  },
  mounted: function() {
    this.$eventHub.$on("init_selected_icon", this.selected);
  },
  created: function() {
    this.icon_elements = [
      {
        id: "ico_default",
        title: "Default Icon"
      },
      {
        id: "ico_facebook",
        title: "facebook Icon"
      },
      {
        id: "ico_instagram",
        title: "instagram Icon"
      },
      {
        id: "ico_twitter",
        title: "twitter Icon"
      },
      {
        id: "ico_chatwork",
        title: "chatwork Icon"
      },
      {
        id: "ico_slack",
        title: "slack Icon"
      },
      {
        id: "ico_skype",
        title: "skype Icon"
      },
      {
        id: "ico_dropbox",
        title: "dropbox Icon"
      },
      {
        id: "ico_evernote",
        title: "evernote Icon"
      },
      {
        id: "ico_gmail",
        title: "Gmail Icon"
      },
      {
        id: "ico_goolgecalendar",
        title: "Goolge calendar Icon"
      },
      {
        id: "ico_googlekeep",
        title: "Google keep Icon"
      },
      {
        id: "ico_googletranslate",
        title: "Google translate Icon"
      },
      {
        id: "ico_office365",
        title: "office365 Icon"
      },
      {
        id: "ico_sharepoint",
        title: "sharepoint Icon"
      },
      {
        id: "ico_word",
        title: "word Icon"
      },
      {
        id: "ico_excel",
        title: "excel Icon"
      },
      {
        id: "ico_powerpoint",
        title: "powerpoint Icon"
      },
      {
        id: "ico_outlook",
        title: "outlook Icon"
      },
      {
        id: "ico_onenote",
        title: "onenote Icon"
      },
      {
        id: "ico_ifttt",
        title: "ifttt Icon"
      },
      {
        id: "ico_dribbble",
        title: "dribbble Icon"
      },
      {
        id: "ico_figma",
        title: "figma Icon"
      },
      {
        id: "ico_invision",
        title: "invision Icon"
      },
      {
        id: "ico_sketch",
        title: "sketch Icon"
      },
      {
        id: "ico_zeplin",
        title: "zeplin Icon"
      },
      {
        id: "ico_backlog",
        title: "backlog Icon"
      },
      {
        id: "ico_serveymonkey",
        title: "serveymonkey Icon"
      },
      {
        id: "ico_icloud",
        title: "icloud Icon"
      },
      {
        id: "ico_github",
        title: "github Icon"
      },
      {
        id: "ico_gitlab",
        title: "gitlab Icon"
      },
      {
        id: "ico_googledrive",
        title: "google drive Icon"
      },
      {
        id: "ico_heroku",
        title: "heroku Icon"
      },
      {
        id: "ico_wordpress",
        title: "wordpress Icon"
      },
      {
        id: "ico_tumblr",
        title: "tumblr Icon"
      },
      {
        id: "ico_cloud",
        title: "cloud Icon"
      },
      {
        id: "ico_chat",
        title: "chat Icon"
      }
    ];
  },
  methods: {
    selected: function(data) {
      this.selectId = data.id;
      this.iconTitle = data.title;
    },
    add() {
      let that = this;

      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        var parser = new URL(this.url);
        // console.log(parser);

        var tmp_id = Math.random().toString(32).substring(2);

        storage.has("config", function(error, hasKey) {
          if (error) throw error;

          if (hasKey) {
            // あるとき
            storage.get("config", function(error, data) {
              confg_data = data;
              confg_data.push({
                id: tmp_id,
                host: parser.host,
                url: that.url,
                icon: that.selectId
              });

              storage.set("config", confg_data, function(error) {
                if (error) throw error;

                that.$eventHub.$emit("save-addView", "保存したよ");
                that.$router.push("/web/");
              });
            });
          } else {
            // ないとき
            confg_data = [];
            confg_data.push({
              id: tmp_id,
              host: parser.host,
              url: that.url,
              icon: that.selectId
            });

            storage.set("config", confg_data, function(error) {
              if (error) throw error;

              that.$eventHub.$emit("save-addView", "保存したよ");
              that.$router.push("/web/");
            });
          }
        });
      });
    },
    beforeDestroy: function() {
      this.$eventHub.$off("init_selected_icon", this.selected);
    }
  }
};
</script>