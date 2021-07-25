<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  asyncData ({ store }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchData');
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    message () {
      return this.$store.state.message
    }
  }
}
</script>
