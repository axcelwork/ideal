<template>
  <div class="button-block" :class="active">
    <button class="router-button" @click="link" v-model="id"></button>
    <!-- <div class="tooltip">
      <p>{{id}}</p>
      <button class="btn_delete"></button>
    </div>-->
  </div>
</template>

<script>
const storage = require("electron-json-storage");
let confg_data = [];

export default {
  props: {
    id: String,
    title: String,
    value: String
  },
  computed: {
    active() {
      return this.value === this.id ? 'active' : false
    }
  },
  methods: {
    link() {
      this.$store.dispatch("set_tab_index", { index: this.id });
      this.$emit('input', this.id)

      console.log(this.$store.state.tab.index);
      
    }
  }
};
</script>