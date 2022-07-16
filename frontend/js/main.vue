<template>
  <bl-header></bl-header>
  <div class="main">
    {{msg}}
  </div>
</template>

<script>
export default {
  components:{
    "bl-header": i("components/bl-header.vue"),
  },
  data() {
    return {
      msg: 'Hello Vue!'
    }
  },
  async mounted(){
    console.log(await $api("api/info"))
  },
  methods:{

  }
}
</script>

<style lang="less">
  html,body{
    padding: 0;
    margin: 0;
    .main{
      width: 100%;
      background-color: #999999;
    }
  }
</style>