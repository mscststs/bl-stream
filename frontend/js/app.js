import api from "./utils/api.js"
import Main from "./main.vue"
import {createApp} from "/lib/vue.js";

const app = createApp({
  components: {
    Main,
  },
  template: '<Main/>'
});

app.use(api);
app.mount('#app');
