<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    name: 'app',
    methods: {
      ...mapActions([
        'setConcurrentUsers'
      ])
    },
    sockets: {
      'updateConcurrentUsers': function (count) {
        this.setConcurrentUsers(count);
      }
    },
    mounted() {

    }
  }
</script>
