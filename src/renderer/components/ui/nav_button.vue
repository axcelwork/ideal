<template>
  <div class="button-block" :class="active">
    <button class="router-button" :data-iconID="icon" @click="link" v-model="id"></button>
  </div>
</template>

<script>
import Vue from "vue";
import EventHub from '../../plugin/EventHub'
Vue.use(EventHub);

const storage = require("electron-json-storage");
let confg_data = [];

export default {
  props: {
    id: String,
    title: String,
    value: String,
    url: String,
    icon: String,
  },
  computed: {
    active() {
      return this.value === this.id ? 'active' : false
    }
  },
  methods: {
    link() {
      // console.log(this.id);
      // console.log(this.url);

      this.$eventHub.$emit('change_nav', this.id)
      this.$router.push('/web/');

      // this.$store.dispatch("set_tab_index", { index: this.id });
      // this.$emit('input', this.id)

      // console.log(this.$store.state.tab.index);
      
    }
  }
};
</script>