<template>
  <section>
    <figure :data-iconID="icon"></figure>

    <div class="info-block">
      <p class="title">{{host}}</p>
      <p class="url">{{url}}</p>
      <p class="id">ID: {{id}}</p>
    </div>

    <button @click="sec_delete" class="icon-delete id_icon"></button>
  </section>
</template>

<script>
import Vue from "vue";
import EventHub from '../../plugin/EventHub'
Vue.use(EventHub);

const storage = require("electron-json-storage");

export default {
  props: {
    id: String,
    host: String,
    url: String,
    icon: String,
  },
  methods: {
    sec_delete() {
      const _that = this;

      storage.get("config", function(error, data) {
        data.filter(function(item, index){
          if (item.id == _that.id) {
            data.splice(index, 1);
          }
        });

        storage.set("config", data, function(error) {
          if (error) throw error;
          _that.$eventHub.$emit('delete_app', _that.id)
        });
      });
    }
  }
};
</script>