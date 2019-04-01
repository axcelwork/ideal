<template>
  <div class="button-block" :class="active">
    <button class="router-button" :data-iconID="icon" @click="link" v-model="id"></button>
  </div>
</template>

<script>
import Vue from "vue";
import EventHub from '../../plugin/EventHub'
Vue.use(EventHub);

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
      this.$eventHub.$emit('change_nav', this.id)
    }
  }
};
</script>