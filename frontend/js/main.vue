<template>
  <BlHeader v-if="isShowHeader"></BlHeader>
  <div class="main">
    {{msg}}
  </div>
</template>

<script>
// import BlHeader from './components/bl-header.vue'
import {defineAsyncComponent} from "/lib/vue.js";

export default {
  components:{
    "BlHeader": defineAsyncComponent(() =>
      import('./components/bl-header.vue')
    ),
  },
  data() {
    return {
      msg: 'Hello Vue!',
      isShowHeader:false,
    }
  },
  async mounted(){
    setTimeout(() => {
      this.isShowHeader = true;
    }, 1000);
    console.log(await this.$api("api/info"))
  },
  methods:{

  }
}
</script>

<style lang="less">

.main{
  width: 100%;
  background-color: #999999;
}

</style>