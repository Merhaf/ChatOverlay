const app = Vue.createApp({
  data() {
    return {
      isPlayingOrWatching: false,
    };
  },
  mounted() {
    setInterval(() => {
      this.isPlayingOrWatching = window.isPlayingOrWatching || false;
    }, 100);
  },
});

app.mount('#overlay');