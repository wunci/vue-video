<template>
  <section class="footer">
    <router-link to="/home">img</router-link>
    <ul>
      <li><router-link to="/movie">电影</router-link></li>
      <li><router-link to="/tv">电视剧</router-link></li>
      <li><router-link to="/zy">综艺</router-link></li>
      <li><router-link to="/me">个人中心</router-link></li>
    </ul>
    
  </section>
</template>

<script>

export default {
  name: 'vfooter',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'src/style/mixin';
  .footer{
    width: 100%;
    position:fixed;
    top: 0;
    left: 0;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: space-between;
    text-align: center;
    a{
     
      text-decoration: none;
      color: #000
    }
    ul{
     display: -webkit-flex;
     display: -moz-flex;
     display: -ms-flex;
     display: -o-flex;
     display: flex;

      li{
        float: left;
        list-style:none;
        padding:0 0.25rem;
      }
    }

  } 

</style>
