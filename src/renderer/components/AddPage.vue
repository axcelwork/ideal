<template>
  <div id="add-area" class="show">
    <p class="discription">アプリケーションを登録する</p>
    <div class="form-control-feedback" v-show="errors.has('app[title]')">
      <p class="alert alert-danger">{{ errors.first('app[title]') }}</p>
    </div>
    <input
      type="text"
      name="URL"
      id="init_url"
      placeholder="URLを入力してください"
      v-model="url"
      v-validate="'required|url:false'"
    >
    <button id="add_webview" @click="add">add</button>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate, { Validator } from "vee-validate";
import ja from "vee-validate/dist/locale/ja";

Validator.localize("ja", ja);
Vue.use(VeeValidate, { locale: "ja" });

const storage = require("electron-json-storage");
let confg_data = [];

export default {
  name: "landing-page",
  data() {
    return {
      url: null
    };
  },
  methods: {
    add() {
      let that = this;

      this.$validator.validateAll().then(result => {
        if (!result) {
          console.log(this.errors.all());
          return;
        }

        var parser = new URL(this.url);
        // console.log(parser);

        storage.has("config", function(error, hasKey) {
          if (error) throw error;

          if (hasKey) {
            // あるとき
            storage.get("config", function(error, data) {
              confg_data = data;
              confg_data.push({ id: parser.host, url: that.url });

              storage.set("config", confg_data, function(error) {
                if (error) throw error;

                that.$emit("event-init");
              });
            });
          } else {
            // ないとき
            confg_data = [];
            confg_data.push({ id: parser.host, url: that.url });

            storage.set("config", confg_data, function(error) {
              if (error) throw error;

              that.$emit("event-init");
            });
          }
        });
      });
    }
  }
};
</script>