import api from "./utils/api.js"
import Main from "./main.vue"
import {createApp} from "/lib/vue.js";

const app = createApp({
  components: {
    'Main': Main,
  },
  template: '<Main></Main>'
});

app.use(api);
app.mount('#app');
