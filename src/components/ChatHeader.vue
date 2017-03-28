<template>
  <div class="chat-header">
    <h1>vChat

      <small v-if="concurrentUsers && showCount">({{ concurrentUsers }})</small>
    </h1>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    props: {
      showCount: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    computed: {
      ...mapGetters([
        'concurrentUsers'
      ])
    }
  }
</script>

<style scoped>
  .chat-header {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid rgba(184, 197, 214, .2);
    background: #fff;
  }

  h1 {
    text-align: center;
    font-weight: 200;
    color: #313131;
    font-size: 24px;
    line-height: 50px;
  }

  h1 small {
    font-size: 14px;
    color: #5f5f5f;
    vertical-align: middle;
  }

  @media screen and (max-width: 640px) {
    h1 {
      font-size: 20px;
    }
  }
</style>