<template>
  <div id="video">
    <transition :name="transitionName">
      <keep-alive include="home">
        <router-view class="child-view" :class="[isReady ? 'transition' : '']">
        </router-view>
      </keep-alive>
    </transition>
    <vfooter v-if="isShow" />
  </div>
</template>

<script>
import vfooter from './components/common/vfooter.vue';

export default {
  name: 'app',
  components: {
    vfooter
  },
  data() {
    return {
      transitionName: 'slide-left',
      isShow: true,
      isReady: false
    };
  },
  mounted() {
    if (this.$route.name === 'video') {
      this.isShow = false;
    }
    setTimeout(() => {
      this.isReady = true;
    }, 0);
  },
  created() {},
  watch: {
    $route(to, from) {
      if (this.$route.name == 'video') {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  }
};
</script>

<style lang="scss" >
@import './src/style/reset.scss';
.child-view {
  position: absolute;
  width: 7.5rem;
  transform: translateX(-50%);
  left: 50%;
}
.child-view.transition {
  transition: all 0.4s;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
