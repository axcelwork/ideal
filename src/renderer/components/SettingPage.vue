<template>
  <div id="init-area">
    <p class="discription">アプリケーション一覧</p>
    <!--
    <div class="icon-area">
      <ul>
        <li v-for="icon in icon_elements">
          <iconButton v-bind="icon" :key="icon.id" v-model="selectId"></iconButton>
        </li>
      </ul>
    </div>
    -->
  </div>
</template>

<script>
import Vue from "vue";
import EventHub from "../plugin/EventHub";
import iconButton from "../components/ui/icon_button";

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
      url: null,
      value: null,
      icon_elements: [],
      app_elements: []
    };
  },
  mounted: function() {
    this.$eventHub.$on("init_selected_icon", this.selected);
  },
  created: function() {
    let that = this;

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
        title: "gmail Icon"
      },
      {
        id: "ico_goolgecalendar",
        title: "goolge calendar Icon"
      },
      {
        id: "ico_googlekeep",
        title: "google keep Icon"
      },
      {
        id: "ico_googletranslate",
        title: "google translate Icon"
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

    storage.has("config", function(error, hasKey) {
      if (error) throw error;

      if (hasKey) {
        // あるとき
        storage.get("config", function(error, data) {
          that.app_elements = data;
          
          console.log(that.app_elements);
          
        });
      }
    });
  },
  methods: {
    selected: function(id) {
      this.selectId = id;
    },
  }
};
</script>