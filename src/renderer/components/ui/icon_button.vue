<template>
  <a href="#" class="is-icon" :class="active" :data-iconId="id" @click="icon_select"></a>
</template>

<script>
import Vue from "vue";
import EventHub from '../../plugin/EventHub'
Vue.use(EventHub);

export default {
  props: {
    id: String,
    title:String,
    value: String,
  },
  computed: {
    active() {
      return this.value === this.id ? 'active' : false
    }
  },
  methods: {
    icon_select() {
      this.$eventHub.$emit('init_selected_icon', {id: this.id, title: this.title})
    }
  }
};
</script>