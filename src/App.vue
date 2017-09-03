<template>
  <div id="video">
    <transition name="router-fd">
      <keep-alive>
	  	  <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
	  </transition>
    <transition name="router-fd">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" >
@import './src/style/reset.scss';
body{
  font-size: 12px;
}
.router-fd-enter-active, .router-fd-leave-active {
  	transition: all 0.3s;
}
.router-fd-enter, .router-fd-leave-active {
  	opacity: 0;
}
</style>
